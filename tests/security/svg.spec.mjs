// Definitions only. Run exclusively on an approved AWS test host.
import {test, expect} from '@playwright/test';

const NS = 'http://www.w3.org/2000/svg';
const svg = contents => `<svg xmlns="${NS}" viewBox="0 0 1100 760">${contents}</svg>`;

async function sanitize(page, input) {
  return page.evaluate(text => {
    const clean = CASDiagramSanitizer.sanitize(text);
    return clean ? new XMLSerializer().serializeToString(clean) : null;
  }, input);
}

test.beforeEach(async ({page}) => {
  await page.goto('/compiler/diagram.html');
  await page.waitForFunction(() => typeof CASDiagramSanitizer !== 'undefined');
});

test('root and descendants discard executable attributes, namespaces and foreign nodes', async ({page}) => {
  const output = await sanitize(page, `<svg xmlns="${NS}" xmlns:xlink="http://www.w3.org/1999/xlink" onload="alert(1)" href="https://evil.invalid" xlink:href="javascript:alert(1)" xml:base="https://evil.invalid" style="background:url(https://evil.invalid/root)">
    <g onclick="alert(2)" href="https://evil.invalid" style="fill:url(https://evil.invalid/child)"><rect width="10" height="20"/></g>
    <script>alert(3)</script><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">foreign</div></foreignObject>
    <g xmlns="http://www.w3.org/1999/xhtml"><svg xmlns="${NS}"><text>hidden foreign descendant</text></svg></g>
    <a href="https://evil.invalid"><text>navigation</text></a><image href="https://evil.invalid/image"/>
    <animate attributeName="href" values="javascript:alert(4)"/><set attributeName="onload" to="alert(5)"/>
    <text data-label="&lt;script&gt;literal&lt;/script&gt;">Safe &amp; readable</text></svg>`);
  expect(output).not.toMatch(/onload|onclick|xlink|xml:base|href|style=|evil\.invalid|foreignObject|<script|<animate|<set|navigation|hidden foreign descendant/);
  expect(output).toContain('width="10"');
  expect(output).toContain('Safe &amp; readable');
  expect(output).toContain('data-label="&lt;script&gt;literal&lt;/script&gt;"');
  expect(await sanitize(page, '<svg xmlns="http://www.w3.org/1999/xhtml"/>')).toBeNull();
  expect(await sanitize(page, '<svg/>')).toBeNull();
  expect(await sanitize(page, `<!DOCTYPE svg [<!ENTITY x "bad">]><svg xmlns="${NS}"><text>&x;</text></svg>`)).toBeNull();
  expect(await sanitize(page, `<svg xmlns="${NS}"><g></svg>`)).toBeNull();
});

test('all untrusted CSS is discarded including escapes, imports, and root presentation URLs', async ({page}) => {
  const output = await sanitize(page, `<svg xmlns="${NS}" filter="url(https://evil.invalid/root)" fill="url(#external)" stroke="u\\72l(https://evil.invalid/stroke)">
    <style>@import 'https://evil.invalid/import'; text{fill:u\\72l(https://evil.invalid/escape)} @font-face{font-family:evil;src:url(https://evil.invalid/font)}</style>
    <g filter="url(&#x68;ttps://evil.invalid/filter)" style="--bad:url(https://evil.invalid/custom);fill:var(--bad)">
      <rect fill="url('https://evil.invalid/paint')" data-stroke="url(https://evil.invalid/later)" data-fill="url(https://evil.invalid/later)" cursor="url(https://evil.invalid/cursor), auto"/>
      <text style="fill:u/**/rl(https://evil.invalid/comment)">plain</text>
    </g></svg>`);
  expect(output).not.toMatch(/evil|style|url|cursor|filter=|fill=|stroke=/);
  expect(output).toContain('plain');
});

test('2D geometry, shadow filter and local arrow references survive unchanged', async ({page}) => {
  // Representative exact forms emitted by cas_svg.py.txt:356-429.
  const output = await sanitize(page, svg('<defs><filter id="soft"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#020617" flood-opacity="0.35"/></filter><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#94a3b8"/></marker></defs><g filter="url(#soft)"><circle cx="100" cy="80" r="17" fill="#38bdf830"/><text x="100" y="84" font-family="ui-monospace, Consolas, monospace" font-size="10" text-anchor="middle">A &amp; B</text></g><line x1="100" y1="80" x2="300" y2="180" marker-end="url(#arrow)"/>'));
  for (const fragment of ['<feDropShadow', 'stdDeviation="7"', 'flood-opacity="0.35"', 'filter="url(#soft)"', 'marker-end="url(#arrow)"', 'fill="#38bdf830"', 'A &amp; B', 'viewBox="0 0 1100 760"']) expect(output).toContain(fragment);
});

test('3D data, matrices, gaussian glow and fixed renderer CSS survive', async ({page}) => {
  // Representative cas_cubes.py.txt:154-199. No user CSS is retained.
  const input = `<svg xmlns="${NS}" data-cas-cubes="1"><style>body{display:none}@import 'https://evil.invalid';</style><defs><filter id="cube-glow"><feGaussianBlur stdDeviation="4"/></filter></defs><g class="cas-cube" data-node-id="n1" data-label="Example" data-size="30" transform="translate(550.000000 305.000000)" tabindex="0" role="button" aria-pressed="false"><g data-face="front" data-title="Meaning" data-lines="[&quot;A &amp; B&quot;]" transform="matrix(1 0 0 1 -15 -15)" visibility="visible"><rect class="cube-glow" width="110" height="110" filter="url(#cube-glow)" opacity=".08"/><text font-size="5.4">MEANING</text></g></g></svg>`;
  const output = await sanitize(page, input);
  expect(output).not.toContain('evil.invalid');
  expect(output).not.toContain('body{');
  for (const fragment of ['<feGaussianBlur', 'stdDeviation="4"', 'filter="url(#cube-glow)"', 'data-node-id="n1"', 'data-lines="[&quot;A &amp; B&quot;]"', 'matrix(1 0 0 1 -15 -15)', '.cas-cube{cursor:grab;touch-action:none;outline:none}', '.cube-label{pointer-events:none}']) expect(output).toContain(fragment);
});

async function frameHost(page, baseURL, foreign = false) {
  const diagram = new URL('/compiler/diagram.html', baseURL).href;
  const hostURL = new URL('/security-host', baseURL);
  if (foreign) {
    // A public-looking parent cannot navigate into loopback under Chromium's
    // private-network checks. Change only the port: genuinely cross-origin,
    // but the same address space. Playwright fulfills this parent document;
    // no second server or weakened browser security settings are needed.
    hostURL.port = hostURL.port === '4174' ? '4175' : '4174';
    expect(hostURL.origin).not.toBe(new URL(diagram).origin);
  }
  const host = hostURL.href;
  await page.route(host, route => route.fulfill({contentType:'text/html', body:`<!doctype html><iframe id="diagram" sandbox="allow-scripts" src="${diagram}"></iframe>`}));
  await page.goto(host);
  const iframe = page.locator('#diagram');
  await expect(iframe).toHaveAttribute('sandbox', 'allow-scripts');
  const frame = await (await iframe.elementHandle()).contentFrame();
  expect(frame).toBeTruthy();
  // Wait for the actual iframe document, not an immediate frames() URL lookup.
  await frame.waitForURL(diagram);
  await frame.waitForLoadState('load');
  await frame.waitForFunction(() => typeof CASDiagramSanitizer !== 'undefined');
  return frame;
}

test('opaque sandbox accepts the actual company parent, rejects other sources and origins', async ({page, baseURL}) => {
  const frame = await frameHost(page, baseURL);
  await page.evaluate(input => document.querySelector('iframe').contentWindow.postMessage({type:'diagram',generation:1,svg:input}, '*'), svg('<text id="accepted">company parent</text>'));
  await expect(frame.locator('#accepted')).toHaveText('company parent');
  await frame.evaluate(() => {
    // Exercise origin and source gates independently, not just an unrelated frame.
    dispatchEvent(new MessageEvent('message',{source:parent,origin:'https://evil.invalid',data:{type:'clear-diagram'}}));
    dispatchEvent(new MessageEvent('message',{source:window,origin:new URL(location.href).origin,data:{type:'clear-diagram'}}));
    dispatchEvent(new MessageEvent('message',{source:parent,origin:'null',data:{type:'clear-diagram'}}));
  });
  await expect(frame.locator('#accepted')).toHaveCount(1);
  await page.evaluate(() => document.querySelector('iframe').contentWindow.postMessage({type:'clear-diagram'}, '*'));
  await expect(frame.locator('#accepted')).toHaveCount(0);
});

test('a real cross-origin parent cannot render into the company sandbox', async ({page, baseURL}) => {
  const frame = await frameHost(page, baseURL, true);
  const parentOrigin = new URL(page.url()).origin;
  expect(parentOrigin).not.toBe(new URL(frame.url()).origin);
  await frame.evaluate(() => {
    window.__foreignDiagramMessage = null;
    // Registered after the product handler: observing this event proves the
    // real parent message reached the live diagram boundary before asserting.
    const observe = event => {
      if (event.data?.type !== 'diagram' || event.data.generation !== 1) return;
      window.__foreignDiagramMessage = {origin:event.origin, fromParent:event.source === parent};
      removeEventListener('message', observe);
    };
    addEventListener('message', observe);
  });
  await page.evaluate(input => document.querySelector('iframe').contentWindow.postMessage({type:'diagram',generation:1,svg:input}, '*'), svg('<text id="rejected">foreign parent</text>'));
  await expect.poll(() => frame.evaluate(() => window.__foreignDiagramMessage)).toEqual({origin:parentOrigin, fromParent:true});
  await expect(frame.locator('#canvas svg')).toHaveCount(0);
});

test('real compiler retains visible 3D cubes, 2D map, filters and control interaction', async ({page}) => {
  test.setTimeout(120000);
  await page.goto('/compiler/');
  await expect(page.locator('#run')).toBeEnabled({timeout:90000});
  await page.locator('#source').fill('^2^C_{F2}|T');
  await page.locator('#run').click();
  const diagram = page.frameLocator('#diagram');
  await expect(diagram.locator('svg[data-cas-cubes]')).toBeVisible({timeout:20000});
  await expect(diagram.locator('.cas-cube').first()).toBeVisible();
  await expect(diagram.locator('feGaussianBlur')).toHaveAttribute('stdDeviation','4');
  await expect(diagram.locator('feDropShadow')).toHaveAttribute('stdDeviation','7');
  const frame = page.frames().find(f => /\/compiler\/diagram\.html/.test(f.url()));
  const before = await diagram.locator('svg[data-cas-cubes]').getAttribute('data-scene-orbit');
  await frame.evaluate(() => document.querySelector('[data-command="left"]').click());
  await expect(diagram.locator('svg[data-cas-cubes]')).not.toHaveAttribute('data-scene-orbit',before);
  await frame.evaluate(() => document.querySelector('.cas-controls [data-view="map"]').click());
  await expect(diagram.locator('[data-map-viewport]')).toHaveAttribute('display','inline');
  await expect(diagram.locator('[data-cube-view="map"]')).toBeVisible();
  await expect(diagram.locator('[data-cube-view="map"] [filter="url(#soft)"]').first()).toBeVisible();
  await frame.evaluate(() => document.querySelector('.cas-controls [data-view="cubes"]').click());
  await expect(diagram.locator('.cas-cube').first()).toBeVisible();
});
