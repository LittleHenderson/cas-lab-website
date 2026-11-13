import {WORKSPACE_FIELDS} from './workspace-state.js';

// A read-only view of the complete owner workspace. Imported records never supply
// callbacks. Re-read all fields at dispatch, including when no input event fired.
export function createInspectionWorkspace(readContext) {
  let revision = 0, fingerprint = null, runtime, runtimeGeneration = 0;
  const listeners = new Set();
  function read() {
    const context = readContext();
    if (context.runtime !== runtime) { runtime = context.runtime; runtimeGeneration++; }
    const key = JSON.stringify([
      WORKSPACE_FIELDS.map(field => context.fields[field]), context.ownerRevision,
      context.originKey, context.pristine, runtimeGeneration,
    ]);
    if (key !== fingerprint) { fingerprint = key; revision++; }
    return Object.freeze({language:context.fields.language, source:context.fields.source,
      documentId:'main.' + (context.fields.language === 'ccdl' ? 'ccdl' : 'cas'), revision,
      selectionStart:context.selectionStart, selectionEnd:context.selectionEnd});
  }
  return Object.freeze({
    read,
    getRevision() { return read().revision; },
    getRuntimeGeneration() { read(); return runtimeGeneration; },
    refresh() { read(); for (const listener of [...listeners]) listener(); },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
  });
}
