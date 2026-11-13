// Authored teaching context is supplied by the owner only for an unchanged,
// explicitly loaded, successfully run full workspace. This module never infers
// lesson identity from a source string, label, color, or the selected menu item.
const partRoles = Object.freeze({
  operator: {kind:'noetic', role:'atomic_noetic', edge:'instantiates', name:'Noetic'},
  domain: {kind:'domain', role:'processing_domain', edge:'locates', name:'Domain'},
  drive: {kind:'drive', role:'foundation_drive', edge:'modulates', name:'Drive'},
  register: {kind:'register', role:'phenomenological_register', edge:'register', name:'Register'}
});
const explanations = Object.freeze({
  front: 'This face describes the compiler node and its structural role.',
  right: 'Use this label and role to connect the node to the written notation.',
  back: 'This ID identifies a compiler graph record. It is not an observed event.',
  left: 'No external model evidence is attached to this static diagram.',
  top: 'No confidence score was measured for this node.',
  bottom: 'Layout depth and outgoing links describe the drawing. They are not elapsed time.'
});
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
function graphNodes(diagram) {
  const nodes = new Map();
  if (!Array.isArray(diagram?.nodes)) return nodes;
  for (const node of diagram.nodes) {
    if (!node || !nonempty(node.id) || nodes.has(node.id)) return new Map();
    nodes.set(node.id, {...node});
  }
  return nodes;
}
function verifiedPhrases(diagram, lesson, nodes) {
  const phrases = new Map();
  if (!lesson || !nonempty(lesson.id) || !nonempty(lesson.title) ||
      diagram?.kind !== 'cas_diagram' || diagram.schema_version !== '1.0' ||
      nodes.size !== 5 || !Array.isArray(diagram.containers) || diagram.containers.length ||
      !Array.isArray(diagram.edges) || diagram.edges.length !== 4 ||
      !Array.isArray(lesson.parts) || lesson.parts.length !== 4) return phrases;
  const state = nodes.get(lesson.state?.nodeId);
  if (!state || state.kind !== 'state' || state.role !== 'cognitive_state' ||
      state.presentation_only || !nonempty(lesson.state.reading) ||
      !Number.isInteger(state.operator) || state.noetic !== 'CO-' + state.operator) return phrases;
  // Check the canonical lesson expression against semantic state fields.
  // Labels are deliberately unused; stable IDs and graph roles bind each phrase.
  const expectedSource = '^' + state.operator + '^' + state.domain + '_{' + state.drive + '}|' + state.register;
  if (lesson.source !== expectedSource) return phrases;
  const tokens = {operator:'^' + state.operator, domain:'^' + state.domain,
    drive:'_{' + state.drive + '}', register:'|' + state.register};
  const expectedIds = {operator:'noetic:' + state.noetic, domain:'domain:' + state.domain,
    drive:'drive:' + state.drive, register:'register:' + state.register};
  const seen = new Set();
  for (const part of lesson.parts) {
    if (!part || !Object.hasOwn(partRoles, part.key) || seen.has(part.key)) return new Map();
    seen.add(part.key);
    const expected = partRoles[part.key], node = nodes.get(part.nodeId);
    if (!node || node.presentation_only || node.kind !== expected.kind || node.role !== expected.role ||
        part.nodeKind !== expected.kind || part.nodeId !== expectedIds[part.key] ||
        part.token !== tokens[part.key] || !nonempty(part.phrase)) return new Map();
    const edges = diagram.edges.filter(edge => edge.source === node.id && edge.target === state.id &&
      edge.kind === expected.edge && edge.directed === true && !edge.presentation_only);
    if (edges.length !== 1) return new Map();
    phrases.set(node.id, {category:expected.name, text:part.phrase});
  }
  phrases.set(state.id, {category:'Authored reading', text:lesson.state.reading});
  return phrases;
}
function matchesRenderedGraph(svg, nodes, diagram) {
  const cubes = [...svg.querySelectorAll('.cas-cube')];
  const semantic = cubes.filter(cube => cube.dataset.presentationOnly === 'false');
  const roots = cubes.filter(cube => cube.dataset.presentationOnly === 'true');
  if (cubes.length !== nodes.size + 1 || semantic.length !== nodes.size || roots.length !== 1 ||
      roots[0].dataset.nodeId !== 'compiler:root') return false;
  const ids = semantic.map(cube => cube.dataset.nodeId);
  if (new Set(ids).size !== nodes.size || !ids.every(id => nodes.has(id))) return false;
  const actual = [...svg.querySelectorAll('[data-edge-source]')]
    .filter(edge => edge.dataset.presentationOnly === 'false')
    .map(edge => JSON.stringify([edge.dataset.edgeSource, edge.dataset.edgeTarget])).sort();
  const expected = (diagram?.edges || []).map(edge => JSON.stringify([edge.source, edge.target])).sort();
  return JSON.stringify(actual) === JSON.stringify(expected);
}
function addText(parent, tag, className, text) {
  const element = parent.ownerDocument.createElement(tag);
  element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

// The owner supplies context only after its full-workspace freshness gate.
// Reuse the same strict graph/render binding for the six-purpose presentation.
export function getVerifiedAnnotations({svg,diagram,lessonContext=null}={}) {
  try {
    const nodes=graphNodes(diagram);
    if(!svg || !matchesRenderedGraph(svg,nodes,diagram))return new Map();
    return new Map([...verifiedPhrases(diagram,lessonContext,nodes)].map(([id,phrase])=>
      [id,{...phrase,lessonTitle:lessonContext.title}]));
  }catch{return new Map();}
}

/**
 * Call AFTER mountCubeControls(), once for each newly inserted diagram.
 * diagram is result.artifact.diagram; lessonContext is the owner's shared
 * lesson record or null. The owner alone proves request validity and freshness.
 * Returns cleanup; call it before replacing/clearing the diagram.
 */
export function mountDiagramAnnotations({canvas, diagram, lessonContext = null} = {}) {
  const svg = canvas?.querySelector('svg[data-cas-cubes]');
  const inspector = svg?.nextElementSibling;
  if (!svg || !inspector?.classList.contains('cas-inspector')) return () => {};
  const nodes = graphNodes(diagram);
  const lessonTitle = lessonContext?.title;
  let phrases;
  try {
    phrases = matchesRenderedGraph(svg, nodes, diagram)
      ? verifiedPhrases(diagram, lessonContext, nodes) : new Map();
  } catch { phrases = new Map(); }
  const removeExtras = () => inspector.querySelectorAll('.cas-annotation-extra').forEach(element => element.remove());
  const refresh = () => {
    removeExtras();
    const cube = svg.querySelector('.cas-cube[aria-pressed="true"]');
    if (!cube) return;
    const faces = [...cube.querySelectorAll('[data-face]')];
    const cards = [...inspector.querySelectorAll('.cas-face-grid > section')];
    if (faces.length !== 6 || cards.length !== 6) return;
    faces.forEach((face, index) => {
      addText(cards[index], 'p', 'cas-annotation-extra cas-face-explanation', explanations[face.dataset.face] || '');
    });
    const front = cards[faces.findIndex(face => face.dataset.face === 'front')];
    if (!front) return;
    const label = addText(front, 'p', 'cas-annotation-extra cas-structural-label', 'Structural summary');
    front.insertBefore(label, front.querySelector('p'));
    const layoutOnly = cube.dataset.presentationOnly === 'true';
    const node = nodes.get(cube.dataset.nodeId);
    if (node && !layoutOnly && nonempty(node.role)) {
      addText(front, 'p', 'cas-annotation-extra cas-structural-role', 'Compiler role: ' + node.role);
    }
    addText(front, 'p', 'cas-annotation-extra cas-structure-boundary', layoutOnly
      ? 'Layout only: this organizing root has no authored human annotation.'
      : 'These relationships describe structure. They do not predict a person’s actions.');
    const phrase = !layoutOnly && phrases.get(cube.dataset.nodeId);
    if (!phrase) return;
    const box = addText(front, 'div', 'cas-annotation-extra cas-authored-annotation', '');
    box.dataset.annotationNodeId = cube.dataset.nodeId;
    addText(box, 'h5', 'cas-annotation-heading', 'Authored scenario annotation');
    addText(box, 'p', 'cas-annotation-source', phrase.category + ' · ' + lessonTitle);
    addText(box, 'blockquote', 'cas-annotation-phrase', phrase.text);
    addText(box, 'p', 'cas-annotation-boundary', 'From the unchanged teaching example. This is authored context, not a measured finding.');
  };
  // Controls replace the inspector's direct children on click/keyboard selection.
  // Decorating descendants does not retrigger this observer.
  const observer = new MutationObserver(refresh);
  observer.observe(inspector, {childList:true});
  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    svg.removeEventListener('cas-dispose', cleanup);
    removeExtras();
  };
  svg.addEventListener('cas-dispose', cleanup, {once:true});
  refresh();
  return cleanup;
}
