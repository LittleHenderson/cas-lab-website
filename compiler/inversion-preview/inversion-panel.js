import { AXES, BINDING, previewInversion, sameSnapshot, validateSnapshot, verifyCopy } from './inversion-core.js';

let instance = 0;
const AXIS_LABELS = { N: 'N — Noetic', W: 'W — Domain', F: 'F — Drive', P: 'P — Compound: N + W + F' };
const EXPLANATION = {
  N: 'Pairs: 2 ↔ 3, 5 ↔ 6, 8 ↔ 9. Self-dual: 0, 1, 4, 7.',
  W: 'Domain pairs: P ↔ O, C ↔ E. Other states and relation arrows are outside this preview.',
  F: 'Drive pairs: F1 ↔ F7, F2 ↔ F6, F3 ↔ F5. F4 is self-dual.',
  P: 'Applies the Noetic, Domain and Drive maps to this state. Every register is preserved.',
};

/** Integration seam: read snapshots; subscribe to edits/selection/document changes.
 * No access to a setter, run command, save API, story data or full editor DOM.
 * writeClipboard is optional and must only write the exact provided string.
 */
export function mountInversionPreview({ root, getSnapshot, subscribe, writeClipboard, compilerSha256 } = {}) {
  if (compilerSha256 !== BINDING.compilerSha256) throw new TypeError('The owner compiler SHA-256 must match the pinned preview binding before mounting.');
  if (!root || typeof root.append !== 'function' || typeof getSnapshot !== 'function' || typeof subscribe !== 'function')
    throw new TypeError('root, getSnapshot and subscribe are required.');
  const doc = root.ownerDocument, id = `cas-inversion-${++instance}`;
  const el = (tag, className, text) => {
    const node = doc.createElement(tag); if (className) node.className = className;
    if (text !== undefined) node.textContent = text; return node;
  };
  const section = el('section', 'cas-inversion'); section.setAttribute('aria-labelledby', `${id}-title`);
  section.dataset.state = 'idle'; section.dataset.subsetVersion = BINDING.subsetVersion;
  const title = el('h2', '', 'Preview inversion'); title.id = `${id}-title`;
  const instructions = el('p', 'cas-inversion-help', 'Select one complete explicit state in the editor, then choose an axis and Preview. The candidate is a structural comparison.');
  const controls = el('div', 'cas-inversion-controls');
  const label = el('label', '', 'Inversion axis'); label.htmlFor = `${id}-axis`;
  const axis = el('select'); axis.id = `${id}-axis`;
  AXES.forEach(key => { const option = el('option', '', AXIS_LABELS[key]); option.value = key; axis.append(option); });
  const previewButton = el('button', '', 'Preview selected state'); previewButton.type = 'button';
  controls.append(label, axis, previewButton);
  const explanation = el('p', 'cas-inversion-help', EXPLANATION.N); explanation.id = `${id}-axis-help`; axis.setAttribute('aria-describedby', explanation.id);
  const unsupported = el('p', 'cas-inversion-help', 'E (entropy), S (sub-drive variance) and A (RPM pathway) are unsupported. Compact states, constructors, implicit domains and register sets are outside this first tool.');
  const scope = el('p', 'cas-inversion-scope', 'Scope: no state selected for preview.');
  const validity = el('p', 'cas-inversion-boundary', 'Workspace validity: NOT CHECKED. A limited source grammar identifies the selected state; the candidate is parsed locally. This tool does not compile, run or simulate the workspace. A W change can break an existing arrow.');
  const comparison = el('div', 'cas-inversion-comparison'); comparison.hidden = true;
  const originalFigure = el('figure'), candidateFigure = el('figure');
  originalFigure.append(el('figcaption', '', 'Original selected state'));
  candidateFigure.append(el('figcaption', '', 'Candidate — exact text to copy'));
  const originalPre = el('pre'), candidatePre = el('pre'), original = el('code'), candidate = el('code');
  original.dataset.role = 'original'; candidate.dataset.role = 'candidate';
  originalPre.append(original); candidatePre.append(candidate); originalFigure.append(originalPre); candidateFigure.append(candidatePre);
  comparison.append(originalFigure, candidateFigure);
  const copyButton = el('button', 'cas-inversion-copy', 'Copy candidate'); copyButton.type = 'button'; copyButton.disabled = true;
  const copyHelp = el('p', 'cas-inversion-help', 'Copy writes only the displayed state when you press this button. Source, revision, document and selection must still match. Nothing is applied, run or saved.');
  copyHelp.id = `${id}-copy-help`; copyButton.setAttribute('aria-describedby', copyHelp.id);
  const table = el('table', 'cas-inversion-components'); table.hidden = true; table.setAttribute('role', 'table');
  table.append(el('caption', '', 'Every component: original, candidate and status'));
  const head = el('thead'), headerRow = el('tr'); head.setAttribute('role', 'rowgroup'); headerRow.setAttribute('role', 'row');
  ['Component', 'Original', 'Candidate', 'Status'].forEach(text => { const th = el('th', '', text); th.scope = 'col'; th.setAttribute('role', 'columnheader'); headerRow.append(th); });
  head.append(headerRow); const body = el('tbody'); body.setAttribute('role', 'rowgroup'); table.append(head, body);
  const status = el('p', 'cas-inversion-status', 'Ready. Select a full state to begin.'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true');
  const sourceNote = el('p', 'cas-inversion-provenance', `Source contract: ${BINDING.subsetVersion}; compiler ${BINDING.commit.slice(0, 12)}. Local syntax checks do not establish contextual or clinical validity.`);
  section.append(title, instructions, controls, explanation, unsupported, scope, validity, comparison, copyButton, copyHelp, table, status, sourceNote);
  root.append(section);
  let current = null, pending = false, destroyed = false;

  function invalidate(message) {
    current = null; copyButton.disabled = true; section.dataset.state = 'stale'; status.textContent = message;
  }
  function refresh() {
    if (destroyed || !current) return;
    try {
      if (!sameSnapshot(current.snapshot, validateSnapshot(getSnapshot()))) invalidate('Source, revision, document or selection changed. The displayed preview is stale. Preview again before copying.');
    } catch { invalidate('The editor snapshot is unavailable. The displayed preview is stale.'); }
  }
  function showError(error) {
    current = null; copyButton.disabled = true; comparison.hidden = true; table.hidden = true;
    original.textContent = ''; candidate.textContent = ''; section.dataset.state = 'error';
    scope.textContent = 'Scope: no verified state preview.';
    status.textContent = error?.message || 'The selected state could not be verified.';
  }
  function onPreview() {
    if (pending || destroyed) return;
    try {
      current = previewInversion(getSnapshot(), axis.value);
      original.textContent = current.original; candidate.textContent = current.candidate;
      comparison.hidden = false; table.hidden = false; body.replaceChildren();
      for (const part of current.components) {
        const row = el('tr', `cas-inversion-${part.key}`), th = el('th', '', part.label); th.scope = 'row'; th.setAttribute('role', 'rowheader'); row.setAttribute('role', 'row'); row.append(th);
        for (const [label, value] of [['Original', part.original], ['Candidate', part.candidate], ['Status', part.status]]) {
          const cell = el('td', label === 'Status' ? 'cas-inversion-component-status' : '', value);
          cell.dataset.label = label; cell.setAttribute('role', 'cell'); row.append(cell);
        }
        body.append(row);
      }
      scope.textContent = `Scope: one parsed state in ${current.scope.documentId}, UTF-16 range [${current.scope.start}, ${current.scope.end}). Only this literal has a candidate.`;
      section.dataset.state = 'ready'; copyButton.disabled = false;
      status.textContent = current.changed ? 'Candidate ready. Selection and candidate parsed locally; workspace validity is not checked.' : 'Candidate is unchanged. See self-dual, preserved and unspecified components below. Workspace validity is not checked.';
    } catch (error) { showError(error); }
  }
  async function onCopy() {
    if (pending || destroyed || !current) return;
    let copiedFrom;
    try {
      const text = verifyCopy(current, getSnapshot(), candidate.textContent, axis.value);
      const nativeClipboard = doc.defaultView?.navigator?.clipboard;
      const writer = writeClipboard || (nativeClipboard?.writeText ? value => nativeClipboard.writeText(value) : null);
      if (!writer) throw new Error('Clipboard access is unavailable. Nothing was copied. Select the displayed text and use your own Copy command if needed.');
      copiedFrom = current; pending = true; copyButton.disabled = true; previewButton.disabled = true; axis.disabled = true;
      status.textContent = 'Copy requested for the exact displayed candidate…';
      await writer(text);
      if (destroyed) return;
      let unchanged = false;
      try { unchanged = sameSnapshot(copiedFrom.snapshot, validateSnapshot(getSnapshot())) && current === copiedFrom; } catch {}
      if (unchanged) status.textContent = 'Copied the exact displayed candidate. The editor source was not changed.';
      else invalidate('Copy completed for the candidate selected when you pressed Copy. The editor changed while the clipboard request was pending. Preview again.');
    } catch (error) {
      if (!destroyed) invalidate(`${error?.message || 'Copy failed.'} Nothing was applied to the editor.`);
    } finally {
      pending = false;
      if (!destroyed) { previewButton.disabled = false; axis.disabled = false; copyButton.disabled = !current; }
    }
  }
  function onAxis() { explanation.textContent = EXPLANATION[axis.value]; invalidate('Axis changed. Preview the selected state again.'); }
  previewButton.addEventListener('click', onPreview); copyButton.addEventListener('click', onCopy); axis.addEventListener('change', onAxis);
  const unsubscribe = subscribe(refresh);
  if (typeof unsubscribe !== 'function') { section.remove(); throw new TypeError('subscribe must return an unsubscribe function.'); }
  return Object.freeze({
    refresh,
    destroy() {
      if (destroyed) return; destroyed = true; unsubscribe(); current = null;
      previewButton.removeEventListener('click', onPreview); copyButton.removeEventListener('click', onCopy); axis.removeEventListener('change', onAxis); section.remove();
    },
  });
}
