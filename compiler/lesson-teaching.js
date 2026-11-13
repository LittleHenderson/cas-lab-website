/* Teaching interactions only. All loading is delegated to the integration owner. */
import { getLessonContext, LESSON_CONTEXTS } from './lesson-data.js';
import { renderProfessionalContext } from './professional-lesson-view.js';
export { getLessonContext } from './lesson-data.js';
const bindings = new WeakMap();
let instanceNumber = 0;
export function bindLessonHighlights(root) {
  'use strict';
  if (!root) return { destroy() {} };
  if (bindings.has(root)) return bindings.get(root);
  const events = new AbortController();
  const options = { signal: events.signal };
  root.dataset.teachingReady = 'true';
  const members = new Map();
  for (const element of root.querySelectorAll('[data-teach-key]')) {
    const key = element.dataset.teachKey;
    if (!members.has(key)) members.set(key, []);
    members.get(key).push(element);
  }
  let current = null;
  let currentStatus = null;
  let pointerPreview = false;
  const control = target => target instanceof Element
    ? target.closest('[data-teach-target]') : null;
  const focused = () => {
    const element = control(document.activeElement);
    return element && root.contains(element) ? element : null;
  };
  function show(element) {
    const key = element?.dataset.teachKey || null;
    if (key === current) return;
    for (const member of members.get(current) || []) member.classList.remove('teaching-match');
    if (currentStatus) currentStatus.textContent = 'No phrase selected.';
    current = key;
    currentStatus = null;
    if (!key) return;
    for (const member of members.get(key) || []) member.classList.add('teaching-match');
    const scenario = element.closest('.worked-scenario');
    currentStatus = scenario?.querySelector('[data-teach-status]');
    if (currentStatus) currentStatus.textContent = element.dataset.teachMessage;
  }
  function focusTarget(target) {
    for (let ancestor = target.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
    }
    target.focus({ preventScroll: true });
    // No animation: also respects a reduced-motion preference.
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
    show(target);
  }
  root.addEventListener('focusin', event => { pointerPreview = false; show(control(event.target)); }, options);
  root.addEventListener('focusout', () => queueMicrotask(() => { pointerPreview = false; show(focused()); }), options);
  // Pointer movement is deliberate. Pointer-over alone also fires when focus
  // scrolls a different phrase under a stationary pointer, overriding focus.
  root.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const element = control(event.target);
    if (element && root.contains(element)) { pointerPreview = true; show(element); }
  }, options);
  root.addEventListener('pointerout', event => {
    if (event.pointerType === 'touch' || !pointerPreview) return;
    pointerPreview = false;
    show(focused());
  }, options);
  root.addEventListener('click', event => {
    const element = control(event.target);
    if (!element || !root.contains(element)) return;
    // Keep browser link behavior for modified clicks and middle clicks.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById(element.dataset.teachTarget);
    if (!target || !root.contains(target)) return;
    event.preventDefault();
    focusTarget(target);
  }, options);
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && current) {
      show(null);
      event.stopPropagation();
    }
  }, options);
  // Fragment links from mapping cards or another page also expose the match.
  function followFragment() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (target?.hasAttribute('data-teach-target') && root.contains(target)) focusTarget(target);
  }
  window.addEventListener('hashchange', followFragment, options);
  followFragment();
  const controller = { destroy() {
    events.abort();
    show(null);
    delete root.dataset.teachingReady;
    bindings.delete(root);
  } };
  bindings.set(root, controller);
  return controller;
}

const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const labels = { operator: 'Operator / Noetic', domain: 'Domain', drive: 'Drive', register: 'Register' };
const editLabels = {...labels, source:'Source', language:'Language', mode:'Action', modules:'Module files', inputs:'Simulation inputs', steps:'Simulation steps'};
const help = 'Focus or point to a story phrase or notation token to highlight its matches. Press Enter or Space on a button, or tap it, to move between the phrase and notation. Story links use Enter. Press Escape to clear the highlight.';

function partAttributes(record, part, prefix, helpId, direction) {
  const key = `${prefix}-${record.id}-${part.key}`;
  const side = record.variant === 'original' ? 'Original' : 'Variation';
  const message = `${side} ${part.name} (${part.token}) matches “${part.phrase}”.`;
  const label = direction === 'notation'
    ? `${part.token} “${part.phrase}”. ${side} ${part.name}. Go to notation.`
    : `${part.token}. ${side} ${part.name}. Go to story phrase: “${part.phrase}”.`;
  const target = direction === 'notation' ? `${key}-notation` : key;
  return ` data-teach-key="${key}" data-teach-target="${target}" aria-label="${escape(label)}" aria-describedby="${helpId}" data-teach-message="${escape(message)}"`;
}

function renderStory(record, prefix, helpId, selectedId) {
  if (record.kind === 'mapped-program') return renderMappedStory(record,prefix,helpId,selectedId);
  if (record.kind === 'exercise') return `<details class="lesson-story"${record.id===selectedId?' open':''}><summary>${record.variant==='original'?'Original':'Variation'}: runnable exercise</summary><p>${escape(record.context)}</p><pre class="professional-program"><code>${escape(record.source)}</code></pre><h3>How the declared model maps to the task</h3><p>This key explains the pair. Added names or changed values appear only in the applicable version.</p><div class="story-mapping">${record.exerciseMapping.map(m=>`<article class="story-map-card"><h4><code>${escape(m.notation)}</code></h4><p>${escape(m.meaning)}</p></article>`).join('')}</div></details>`;
  const side = record.variant === 'original' ? 'Original' : 'Variation';
  const phrase = part => `<button type="button" id="${prefix}-${record.id}-${part.key}" class="story-phrase teaching-control syntax-${part.color}"${partAttributes(record,part,prefix,helpId,'notation')}><span class="story-tag">${escape(part.token)}</span> “${escape(part.phrase)}”</button>`;
  const steps = record.steps.map(step => {
    let body = escape(step.text);
    for (const part of record.parts) body = body.replace(`[[${part.key}]]`, () => phrase(part));
    return `<li><strong>${escape(step.title)}</strong><p>${body}</p></li>`;
  }).join('');
  const expression = record.parts.map(part => `<button type="button" id="${prefix}-${record.id}-${part.key}-notation" class="teaching-control syntax-${part.color}"${partAttributes(record,part,prefix,helpId,'story')}>${escape(part.token)}</button>`).join('');
  const mapping = record.parts.map(part => `<article class="story-map-card"><h4><code class="syntax-${part.color}" data-teach-key="${prefix}-${record.id}-${part.key}">${escape(part.token)}</code> ${escape(part.name)}</h4><a class="story-quote syntax-${part.color}" href="#${prefix}-${record.id}-${part.key}"${partAttributes(record,part,prefix,helpId,'story')}>“${escape(part.phrase)}”</a><p>${escape(part.explanation)}</p></article>`).join('');
  return `<details class="lesson-story"${record.id===selectedId?' open':''}><summary>${side}: ${escape(record.source)}</summary><p>${escape(record.context)}</p><ol class="story-steps">${steps}</ol><pre class="guide-expression" aria-label="${side} CAS expression"><code>${expression}</code></pre><p>${escape(record.state.reading)}</p><div class="story-mapping">${mapping}</div></details>`;
}

function renderComparison(original, variation, prefix, helpId) {
  if (original.kind || variation.kind) return `<section class="teaching-comparison"><h3>What changes in the comparison?</h3><p>${escape(original.changes)}</p><p>${escape(original.question)}</p><p>Each version below retains its source and scenario. Source and target labels distinguish repeated tokens in the story mappings.</p></section>`;
  let changed = 0;
  const rows = original.parts.map((part,index) => {
    const other = variation.parts[index];
    const same = part.token === other.token;
    if (!same) changed++;
    const cells = [[original,part],[variation,other]].map(([record,component]) => `<td role="cell"><span class="teaching-side" aria-hidden="true">${record.variant==='original'?'Original':'Variation'}</span><button type="button" class="teaching-control"${partAttributes(record,component,prefix,helpId,'story')}><code class="syntax-${component.color}">${escape(component.token)}</code><span class="teaching-part-name">${escape(component.name)}</span><q>${escape(component.phrase)}</q></button></td>`).join('');
    return `<tr role="row"><th scope="row" role="rowheader">${labels[part.key]}<span class="teaching-change">${same?'Unchanged':'Changed'}</span></th>${cells}</tr>`;
  }).join('');
  return `<section class="teaching-comparison" aria-labelledby="${prefix}-comparison"><h3 id="${prefix}-comparison">Original and variation: all four components</h3><div class="guide-table-wrap"><table role="table"><caption>${changed} components change; ${4-changed} ${changed===3?'stays':'stay'} the same. “Unchanged” means the token and canonical meaning stay the same; both exact story phrases are shown.</caption><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Component</th><th scope="col" role="columnheader">Original</th><th scope="col" role="columnheader">Variation</th></tr></thead><tbody role="rowgroup">${rows}</tbody></table></div></section>`;
}

function renderMappedStory(record,prefix,helpId,selectedId) {
  const side=record.variant==='original'?'Original':'Variation';
  let end=0,expression='';
  for(const part of [...record.mappings].sort((a,b)=>a.start-b.start)) {
    expression+=escape(record.source.slice(end,part.start));
    expression+=`<button type="button" id="${prefix}-${record.id}-${part.key}-notation" class="teaching-control syntax-${part.color}"${partAttributes(record,part,prefix,helpId,'story')}>${escape(part.token)}</button>`;
    end=part.end;
  }
  expression+=escape(record.source.slice(end));
  const cards=record.mappings.map(part=>`<article class="story-map-card"><h4>${escape(part.name)} <code class="syntax-${part.color}">${escape(part.token)}</code></h4><button type="button" id="${prefix}-${record.id}-${part.key}" class="story-phrase teaching-control syntax-${part.color}"${partAttributes(record,part,prefix,helpId,'notation')}>${escape(part.phrase)}</button><p>${escape(part.explanation)}</p></article>`).join('');
  return `<details class="lesson-story"${record.id===selectedId?' open':''}><summary>${side}: ${escape(record.source)}</summary><p>${escape(record.context)}</p><p class="professional-story">${escape(record.story)}</p><pre class="guide-expression" aria-label="${side} CAS expression"><code>${expression}</code></pre><h3>Exact story phrases and notation</h3><p>Quoted phrases below come from this story. One phrase can support more than one authored interpretation.</p><div class="story-mapping">${cards}</div></details>`;
}

/**
 * Owner integration: mount into an otherwise empty container, then call update.
 * No source edits, compiler runs, result changes, iframe messages, or storage.
 * `pristine` must be true before saved story correspondences are displayed.
 * `changedFields` accepts known component keys as an array or object keys.
 */
export function createLessonTeaching({ container, onLoadLesson }) {
  if (!(container instanceof Element)) throw new TypeError('A lesson container is required.');
  if (typeof onLoadLesson !== 'function') throw new TypeError('Owner onLoadLesson(id) callback is required.');
  const prefix = `lesson-teaching-${++instanceNumber}`;
  const helpId = `${prefix}-help`;
  const events = new AbortController();
  let highlights = null;
  let previous = null;
  let destroyed = false;
  let loading = false;
  container.classList.add('lesson-teaching');
  container.hidden = true;
  container.addEventListener('click', async event => {
    const button = event.target.closest('[data-lesson-load]');
    if (!button || !container.contains(button) || loading) return;
    const id = button.dataset.lessonLoad;
    if (!getLessonContext(id)) return;
    loading = true;
    button.disabled = true;
    try { await onLoadLesson(id); }
    catch {
      const status = container.querySelector('[data-load-status]');
      if (status) status.textContent = 'The lesson could not be loaded. Your editor is controlled by the main application.';
    } finally { loading = false; button.disabled = false; }
  }, { signal: events.signal });
  function update({ lessonId = null, pristine = false, changedFields = [] } = {}) {
    if (destroyed) return;
    const lesson = getLessonContext(lessonId);
    const keys = Array.isArray(changedFields) ? changedFields : Object.keys(changedFields || {}).filter(key=>changedFields[key]);
    const fields = [...new Set(keys.filter(key=>Object.hasOwn(editLabels,key)))].sort();
    const next = JSON.stringify([lesson?.id,pristine===true,fields]);
    if (next === previous) return;
    previous = next;
    highlights?.destroy();
    highlights = null;
    container.replaceChildren();
    container.hidden = !lesson;
    if (!lesson) return;
    const pair = LESSON_CONTEXTS.filter(record=>record.pairId===lesson.pairId);
    const original = pair.find(record=>record.variant==='original');
    const variation = pair.find(record=>record.variant==='variation');
    const actions = `<div class="lesson-load-actions"><button type="button" data-lesson-load="${original.id}">Load original</button><button type="button" data-lesson-load="${variation.id}">Load variation</button></div><p role="status" data-load-status></p>`;
    const heading = `<h2>${escape(lesson.title)}</h2>`;
    if (pristine !== true) {
      container.innerHTML = `<article class="lesson-panel">${heading}<p role="status">Input edited${fields.length?`: ${fields.map(key=>editLabels[key]).join(', ')}`:''}. The saved story mapping is paused. Load an original or variation to restore its exact story and notation.</p>${actions}${renderProfessionalContext(lesson,{referenceOnly:true})}</article>`;
      return;
    }
    container.innerHTML = `<article class="lesson-panel worked-scenario">${heading}${renderProfessionalContext(lesson)}<p class="teaching-help" id="${helpId}">${lesson.kind==='exercise'?'Load either version to put its full program and supplied inputs in the editor. The mapping below explains the declared model.':help}</p><p class="teaching-status" data-teach-status role="status" aria-live="polite" aria-atomic="true">No phrase selected.</p>${actions}${renderComparison(original,variation,prefix,helpId)}${pair.map(record=>renderStory(record,prefix,helpId,lesson.id)).join('')}</article>`;
    highlights = bindLessonHighlights(container);
  }
  return { update, destroy() {
    destroyed = true;
    events.abort();
    highlights?.destroy();
    container.replaceChildren();
    container.classList.remove('lesson-teaching');
    container.hidden = true;
  } };
}

// The standalone guide has no editor; its existing Load links remain unchanged.
if (typeof document !== 'undefined') bindLessonHighlights(document.getElementById('worked'));
