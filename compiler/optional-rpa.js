import {bindRpaStory} from './rpa-story.js';
import {mountRpaInspector} from './rpa-inspector/rpa-inspector.js';
import {importRetainedNative,importCompilerState,FIXTURE,COMPILER_BASE,COMPILER_RECORD_SCHEMA,LIMITS,sha256,stableJSON} from './rpa-inspector/rpa-records.js';
import {verifyInversionCompiler} from './optional-inversion.js';

// Trusted owner controls choose a fixed fixture or the current accepted result.
// There is no imported callback, arbitrary URL, native replay or execution hook.
export function createOptionalRpa({host,nativeButton,compilerButton,status,workspace,getResult}) {
  let panel = null, pending = false, attempt = 0, mode = null, boundArtifact = null, boundRevision = null;
  const current = () => getResult();
  const stillCurrent = () => { const result=current(); return result?.artifact === boundArtifact && String(workspace.getRevision())+':'+result.generation === boundRevision; };
  function controls() { nativeButton.disabled = pending; compilerButton.disabled = pending || !current(); }
  function refresh() {
    controls();
    if (mode === 'compiler' && panel && !stillCurrent()) {
      panel.invalidate('The compiler workspace or result changed. This is an old inspection record. Run and load a fresh supported state.');
      mode = 'stale-compiler'; status.textContent = 'Previous compiler record is stale. Load a fresh result to inspect it.';
    }
  }
  async function load(kind) {
    if (pending) return;
    const ticket = ++attempt;
    pending = true; panel?.destroy(); host.replaceChildren(); panel = null; mode = null; boundArtifact = null; boundRevision = null;
    status.textContent = kind === 'native' ? 'Loading the retained example…' : 'Checking the current compiler record…'; controls();
    try {
      let record, revisionGetter, story = null;
      if (kind === 'native') {
        const response = await fetch(new URL('./rpa-inspector/fixtures/missing-procedure.public.json',import.meta.url),
          {credentials:'omit',signal:AbortSignal.timeout(15000)});
        if (!response.ok) throw new Error('The retained example could not be loaded. Select its button to retry.');
        const bytes = new Uint8Array(await response.arrayBuffer());
        if (bytes.byteLength > LIMITS.bytes) throw new Error('The retained example exceeds the supported size.');
        record = await importRetainedNative({bytes,expectedSha256:FIXTURE.sha256,sourceId:FIXTURE.id,revision:FIXTURE.revision});
        revisionGetter = () => FIXTURE.revision;
      } else {
        const result = current();
        if (!result) throw new Error('Compile an unchanged CAS compound state first.');
        boundArtifact = result.artifact; boundRevision = String(workspace.getRevision())+':'+result.generation;
        const fields = result.fields;
        const request = {source:fields.source,language:fields.language,mode:fields.mode,modules:JSON.parse(fields.modules)};
        await verifyInversionCompiler();
        if (!stillCurrent()) throw new Error('The workspace changed during import. Run and load a fresh result.');
        const bytes = new TextEncoder().encode(JSON.stringify({schema_version:COMPILER_RECORD_SCHEMA,compiler_commit:COMPILER_BASE,request,artifact:result.artifact}));
        if (bytes.byteLength > LIMITS.bytes) throw new Error('This compiler record exceeds the 256 KiB inspection limit.');
        const expectedSha256 = await sha256(bytes), expectedRequestSha256 = await sha256(new TextEncoder().encode(stableJSON(request)));
        record = await importCompilerState({bytes,expectedSha256,expectedRequestSha256,sourceId:'current-workspace',revision:boundRevision});
        story = bindRpaStory(record,result.lessonContext);
        revisionGetter = () => stillCurrent() ? boundRevision : 'changed';
        if (!stillCurrent()) throw new Error('The workspace changed during import. Run and load a fresh result.');
      }
      if (ticket !== attempt) return;
      panel = mountRpaInspector({host,record,getSourceRevision:revisionGetter,story}); mode = kind === 'native' ? 'native' : 'compiler';
      status.textContent = kind === 'native'
        ? 'Retained missing-procedure example loaded. This is separate from the editor and is not a live machine.'
        : 'Current compiler structure loaded. No actual current machine state, history or proposal is supplied by this record.';
    } catch (error) { if (ticket === attempt) status.textContent = error.message || 'The record could not be inspected.'; }
    finally { if (ticket === attempt) { pending = false; controls(); } }
  }
  const native = () => load('native'), compiler = () => load('compiler');
  nativeButton.addEventListener('click',native); compilerButton.addEventListener('click',compiler); controls();
  return Object.freeze({refresh,destroy(){attempt++;panel?.destroy();nativeButton.removeEventListener('click',native);compilerButton.removeEventListener('click',compiler);}});
}
