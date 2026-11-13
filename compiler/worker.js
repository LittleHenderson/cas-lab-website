import { loadPyodide } from './vendor/pyodide/pyodide.mjs';

let python;
async function boot() {
  self.postMessage({type: 'loading', message: 'Loading the Python runtime…'});
  python = await loadPyodide({indexURL: new URL('./vendor/pyodide/', import.meta.url).href,
    stdout: () => {}, stderr: () => {}, stdin: () => null});
  const manifest = await fetch('./compiler-manifest.json').then(r => {if (!r.ok) throw Error('Compiler manifest unavailable.'); return r.json();});
  for (const file of manifest.files) {
    const response = await fetch('./compiler/' + file.path + '.txt');
    if (!response.ok) throw Error('Compiler file unavailable: ' + file.path);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), x => x.toString(16).padStart(2, '0')).join('');
    if (digest !== file.sha256) throw Error('Compiler integrity check failed: ' + file.path);
    const destination = '/compiler/' + file.path;
    python.FS.mkdirTree(destination.slice(0, destination.lastIndexOf('/')));
    python.FS.writeFile(destination, bytes);
  }
  const bridge = await fetch('./bridge.py.txt').then(r => {if (!r.ok) throw Error('Browser adapter unavailable.'); return r.text();});
  python.runPython("import sys\nsys.path.insert(0, '/compiler')");
  python.runPython(bridge);
  self.postMessage({type: 'ready', runtime: python.version});
}
const ready = boot().catch(error => {self.postMessage({type:'fatal', message:String(error.message || error)}); throw error;});
self.onmessage = async ({data}) => {
  if(data.type === 'highlight') {
    try {await ready;python.globals.set('highlight_source',data.source);const highlighted=JSON.parse(python.runPython('highlight_browser(highlight_source)'));python.globals.delete('highlight_source');self.postMessage({type:'highlight',revision:data.revision,...highlighted});}
    catch {self.postMessage({type:'highlight',revision:data.revision,parts:[],limited:true});}
    return;
  }
  if (data.type !== 'run') return;
  try {
    await ready;
    python.globals.set('browser_request', JSON.stringify(data.request));
    // User text is a JSON value passed to the real DSL compiler. It is never Python code.
    const result = python.runPython('run_browser(browser_request)');
    python.globals.delete('browser_request');
    self.postMessage({type:'result', id:data.id, result:JSON.parse(result)});
  } catch (error) {
    self.postMessage({type:'error', id:data.id, message:String(error.message || error).slice(0,12000)});
  }
};
