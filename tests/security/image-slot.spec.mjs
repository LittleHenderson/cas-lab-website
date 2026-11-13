// Definitions only: execute exclusively in the separately approved AWS environment.
import { test, expect } from '@playwright/test';

async function fixture(page, editable = false, state = {}) {
  await page.route('**/.image-slots.state.json', route => route.fulfill({ json: state }));
  const sidecar = page.waitForResponse(response => response.url().endsWith('/.image-slots.state.json'));
  await page.goto('/');
  await (await sidecar).finished();
  await page.evaluate(async enabled => {
    await customElements.whenDefined('image-slot');
    window.__writes = [];
    window.omelette = enabled ? { writeFile: async (...args) => window.__writes.push(args) } : undefined;
    document.querySelector('#security-image-slot')?.remove();
    const slot = document.createElement('image-slot');
    slot.id = 'security-image-slot';
    slot.style.cssText = 'display:block;width:100px;height:100px';
    document.body.append(slot);
    window.__slot = slot;
  }, editable);
}

test('read-only methods and forged editable attribute cannot mutate or open picker', async ({ page }) => {
  await fixture(page);
  const result = await page.evaluate(async () => {
    const slot = window.__slot;
    let browsed = 0, decoded = 0;
    slot._input.click = () => browsed++;
    window.createImageBitmap = async () => { decoded++; throw Error('unexpected decode'); };
    slot.setAttribute('data-editable', '');
    slot.openFilePicker();
    slot.shadowRoot.querySelector('.empty').click();
    slot._enterReframe();
    slot._commitView();
    const file = new File(['<svg onload="alert(1)"/>'], 'bad.png', { type: 'image/png' });
    await slot._ingest(file);
    const transfer = new DataTransfer(); transfer.items.add(file);
    slot.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: transfer }));
    const cloned = customElements.get('image-slot').cloneSlot(slot.id);
    return { browsed, decoded, writes: window.__writes.length, cloned,
      reframe: slot.hasAttribute('data-reframe'), local: !!slot._local };
  });
  expect(result).toEqual({ browsed: 0, decoded: 0, writes: 0, cloned: null, reframe: false, local: false });
});

test('SVG, spoofed MIME, oversized bytes and unsafe dimensions fail before decode', async ({ page }) => {
  await fixture(page, true);
  const result = await page.evaluate(async () => {
    let decoded = 0;
    window.createImageBitmap = async () => { decoded++; throw Error('unexpected decode'); };
    const pngHeader = (w, h) => {
      const b = new Uint8Array(33);
      b.set([137, 80, 78, 71, 13, 10, 26, 10]);
      const v = new DataView(b.buffer); v.setUint32(8, 13);
      b.set([73, 72, 68, 82], 12); v.setUint32(16, w); v.setUint32(20, h);
      return b;
    };
    const files = [
      new File(['<svg/>'], 'bad.svg', { type: 'image/svg+xml' }),
      new File(['<svg/>'], 'spoof.png', { type: 'image/png' }),
      new File([pngHeader(1, 1)], 'spoof.jpg', { type: 'image/jpeg' }),
      new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.png', { type: 'image/png' }),
      ...[[0, 1], [9000, 1], [8192, 8192]].map(([w, h]) =>
        new File([pngHeader(w, h)], 'bomb.png', { type: 'image/png' })),
    ];
    for (const file of files) await window.__slot._ingest(file);
    return { decoded, writes: window.__writes.length, filled: window.__slot.hasAttribute('data-filled') };
  });
  expect(result).toEqual({ decoded: 0, writes: 0, filled: false });
});

for (const url of [
  'data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9ImFsZXJ0KDEpIi8+',
  'data:image/png;base64,PHN2Zy8+',
  'data:image/png;base64,%%%%',
  'https://example.invalid/untrusted.png',
]) {
  test(`reject untrusted sidecar image: ${url.slice(0, 45)}`, async ({ page }) => {
    await fixture(page, false, { 'security-image-slot': { u: url } });
    await expect(page.locator('#security-image-slot')).not.toHaveAttribute('data-filled', '');
    expect(await page.evaluate(() => window.__slot._img.getAttribute('src'))).toBeNull();
  });
}

test('small raster import persists with a write bridge and retains canvas output', async ({ page }) => {
  await fixture(page, true);
  await page.evaluate(async () => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 2;
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    await window.__slot._ingest(new File([blob], 'small.png', { type: 'image/png' }));
  });
  await expect.poll(() => page.evaluate(() => window.__writes.length)).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.__slot._img.getAttribute('src'))).toMatch(/^data:image\/(webp|png);base64,/);
});

test('removing bridge during decode prevents persistence and closes bitmap', async ({ page }) => {
  await fixture(page, true);
  const result = await page.evaluate(async () => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 2;
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const decode = window.createImageBitmap.bind(window);
    let closed = 0;
    window.createImageBitmap = async file => {
      const bitmap = await decode(file);
      const close = bitmap.close.bind(bitmap);
      bitmap.close = () => { closed++; close(); };
      window.omelette = undefined;
      return bitmap;
    };
    await window.__slot._ingest(new File([blob], 'small.png', { type: 'image/png' }));
    return { closed, writes: window.__writes.length, filled: window.__slot.hasAttribute('data-filled') };
  });
  expect(result).toEqual({ closed: 1, writes: 0, filled: false });
});
