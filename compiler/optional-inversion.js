import {mountInversionPreview} from './inversion-preview/inversion-panel.js';

// Owner-verified v17 compiler identity. Fetch only this fixed same-origin asset;
// no editor text, imported URL or record controls the request.
const COMPILER_PATH = './compiler/api/notation/compiler.py.txt';
const COMPILER_SHA256 = '464fd4adfae90a35ba54aa794829da1fe713b9b9cccd68b630ecccfdfbca2f56';
const COMPILER_BYTES = 286318;
export async function verifyInversionCompiler({fetchFile = fetch, digest = bytes => crypto.subtle.digest('SHA-256', bytes)} = {}) {
  const response = await fetchFile(new URL(COMPILER_PATH, import.meta.url), {cache:'no-store', credentials:'omit', signal:AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error('Compiler identity could not be read. Close and reopen to retry.');
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength !== COMPILER_BYTES) throw new Error('Compiler size differs from the reviewed inversion binding.');
  const actual = [...new Uint8Array(await digest(bytes))].map(byte => byte.toString(16).padStart(2,'0')).join('');
  if (actual !== COMPILER_SHA256) throw new Error('Compiler identity differs from the reviewed inversion binding.');
  return actual;
}

export function createOptionalInversion({details, host, workspace}) {
  let panel = null, attempt = 0, pending = false, generation = workspace.getRuntimeGeneration();
  function message(text) {
    const p = host.ownerDocument.createElement('p'); p.setAttribute('role','status'); p.textContent = text;
    host.replaceChildren(p);
  }
  async function mount() {
    if (!details.open || panel || pending) return;
    pending = true; const ticket = ++attempt, startedGeneration = workspace.getRuntimeGeneration();
    message('Checking the bundled compiler identity for this optional preview…');
    try {
      const actual = await verifyInversionCompiler();
      if (ticket !== attempt || !details.open || startedGeneration !== workspace.getRuntimeGeneration()) return;
      host.replaceChildren();
      panel = mountInversionPreview({root:host,compilerSha256:actual,getSnapshot:workspace.read,subscribe:workspace.subscribe});
    } catch (error) { if (ticket === attempt) message(error.message); }
    finally { if (ticket === attempt) pending = false; }
  }
  function toggle() {
    if (details.open) mount();
    else { attempt++; pending = false; panel?.destroy(); panel = null; message('Open to preview one selected state.'); }
  }
  function refresh() {
    const next = workspace.getRuntimeGeneration();
    if (next !== generation) {
      generation = next; attempt++; pending = false; panel?.destroy(); panel = null;
      message('Compiler runtime changed. The previous preview was cleared.'); mount();
    } else panel?.refresh();
  }
  details.addEventListener('toggle', toggle);
  return Object.freeze({refresh, destroy(){attempt++;panel?.destroy();details.removeEventListener('toggle',toggle);}});
}
