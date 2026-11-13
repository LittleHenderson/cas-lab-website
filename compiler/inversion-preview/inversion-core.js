/** Selected-state preview. Pure functions; no compiler execution or source mutation.
 * Grammar reference: post-professional v17; compiler bytes identical to reviewed v15.
 * This intentionally admits only a documented subset of the canonical grammar.
 */
export const BINDING = Object.freeze({
  commit: '73bbdbb5011c8e454a8a34eba0621694268f3895',
  reviewedCompilerCommit: 'f1aa28e35e78b0c735c10b97c7910b36e6293747',
  compilerSha256: '464fd4adfae90a35ba54aa794829da1fe713b9b9cccd68b630ecccfdfbca2f56',
  inversionSha256: 'c176fe2d23270e25b1630d631b8a9fe0473d07eb4e0399231207a42a1a6b0041',
  subsetVersion: 'selected-state-v1',
});
export const AXES = Object.freeze(['N', 'W', 'F', 'P']);
export const LIMITS = Object.freeze({ bytes: 65536, tokens: 4096, depth: 64, stateUnits: 2048 });
export const NOETICS = Object.freeze(['Idea', 'Mind', 'Positive', 'Negative', 'Vibration', 'Female', 'Male', 'Rhythm', 'Above/Cause', 'Below/Effect']);
export const DOMAINS = Object.freeze({ P: 'Principled', C: 'Cognitive', E: 'Evaluative', O: 'Operational' });
export const DRIVES = Object.freeze(['', 'Unity', 'Wisdom', 'Vitality', 'Connection', 'Agency', 'Structure', 'Purpose']);
export const REGISTERS = Object.freeze({ T: 'Transcendent', A: 'Analytical', f: 'Affective', E: 'Embodied' });
const N = Object.freeze([0, 1, 3, 2, 4, 6, 5, 7, 9, 8]);
const W = Object.freeze({ P: 'O', O: 'P', C: 'E', E: 'C' });
const F = Object.freeze([0, 7, 6, 5, 4, 3, 2, 1]);
const reserved = new Set(['export', 'fn', 'use', 'RPM', 'Phi', 'S', 'Y_T', 'Y_A', 'union', 'intersect', 'intersection', 'setminus', 'difference', 'diff']);
const prefixes = ['Theta', 'Omega', 'Lambda', 'kappa', 'iota', 'eta'];
const digit = c => c !== undefined && c >= '0' && c <= '9';
const lower = c => c !== undefined && c >= 'a' && c <= 'z';
const upper = c => c !== undefined && c >= 'A' && c <= 'Z';
const alpha = c => lower(c) || upper(c);
const word = c => alpha(c) || digit(c) || c === '_';
const space = c => c === ' ' || c === '\t' || c === '\r' || c === '\n';
const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export class PreviewError extends Error {
  constructor(code, message, position = null) { super(message); this.name = 'PreviewError'; this.code = code; this.position = position; }
}
function fail(code, message, position) { throw new PreviewError(code, message, position); }
function freeze(value) {
  const pending = [value], seen = new Set();
  while (pending.length) {
    const item = pending.pop();
    if (!item || typeof item !== 'object' || seen.has(item)) continue;
    seen.add(item); pending.push(...Object.values(item)); Object.freeze(item);
  }
  return value;
}

/** Stateful tokenizer: quoted strings/comments are opaque and keep their spans.
 * No regex scans source for state-looking substrings. Offsets are UTF-16 indices,
 * matching HTML textarea selectionStart/selectionEnd.
 */
export function tokenize(source) {
  if (typeof source !== 'string') fail('SOURCE', 'Source must be text.');
  if (source.length > LIMITS.bytes || new TextEncoder().encode(source).length > LIMITS.bytes)
    fail('LIMIT', 'Preview supports source text up to 64 KiB.');
  const tokens = []; let i = 0;
  const emit = (kind, start, end) => {
    if (tokens.length >= LIMITS.tokens) fail('LIMIT', 'Preview supports at most 4,096 tokens.', start);
    tokens.push({ kind, start, end, text: source.slice(start, end) });
  };
  while (i < source.length) {
    const start = i, c = source[i];
    if (c === ' ' || c === '\t' || (c === '\r' && source[i + 1] !== '\n')) { i++; continue; }
    if (c === '\n' || (c === '\r' && source[i + 1] === '\n')) {
      i += c === '\r' ? 2 : 1; emit('SEMI', start, i); continue;
    }
    if (c === '#' || (c === '/' && source[i + 1] === '/')) {
      while (i < source.length && source[i] !== '\n' && source[i] !== '\r') i++;
      continue;
    }
    if (c === '"') {
      i++; let closed = false;
      while (i < source.length) {
        if (source[i] === '\n' || source[i] === '\r') fail('STRING', 'Multiline strings are outside this preview subset.', start);
        if (source[i] === '\\') {
          if (i + 1 >= source.length || source[i + 1] === '\n' || source[i + 1] === '\r') fail('STRING', 'Incomplete string escape.', i);
          i += 2; continue;
        }
        if (source[i++] === '"') { closed = true; break; }
      }
      if (!closed) fail('STRING', 'Close the quoted string before previewing a state.', start);
      emit('STRING', start, i); continue;
    }
    const relation = ['<->', '->', '<-', '↔', '→', '←'].find(s => source.startsWith(s, i));
    if (relation) { i += relation.length; emit('REL', start, i); continue; }
    const longNoetic = source.startsWith('CO-', i) && digit(source[i + 3]);
    if ((c === '^' && digit(source[i + 1])) || longNoetic) {
      i += longNoetic ? 3 : 1;
      const numberStart = i;
      while (digit(source[i])) i++;
      if (i - numberStart !== 1) fail('NOETIC', 'Use one ASCII Noetic digit, 0–9.', start);
      emit('NOETIC', start, i); continue;
    }
    if (c === '|') {
      if (source[i + 1] === '⟨' || source[i + 1] === '<') fail('REGISTER_SET', 'Register sets are not supported by this preview.', start);
      if (!own(REGISTERS, source[i + 1])) fail('REGISTER', 'Use a single register: T, A, f or E.', start);
      i += 2; emit('REGISTER', start, i); continue;
    }
    if (c === '_') { i++; emit('UNDERSCORE', start, i); continue; }
    if (alpha(c) || c === '_') {
      while (word(source[i]) && !(source[i] === '_' && source[i + 1] === '{')) i++;
      const text = source.slice(start, i);
      if (text === 'let') { emit('LET', start, i); continue; }
      if (own(DOMAINS, text)) { emit('DOMAIN', start, i); continue; }
      if ((text[0] === 'F' && text.length === 2 && digit(text[1])) ||
          (text.startsWith('F_') && text.length === 3 && digit(text[2]))) {
        const n = Number(text.at(-1));
        if (n < 1 || n > 7) fail('DRIVE', 'Use a drive from F1 to F7 (or F_1 to F_7).', start);
        emit('DRIVE', start, i); continue;
      }
      if (own(DOMAINS, text[0]) && text.length > 1 && [...text.slice(1)].every(digit))
        fail('COMPACT_STATE', 'Compact states such as C2 are not supported. Use an explicit state such as ^2^C.', start);
      if (reserved.has(text) || prefixes.some(p => text.startsWith(p)))
        fail('UNSUPPORTED_CONTEXT', 'This source uses syntax outside the preview subset (imports, functions, recipes or meta-logic).', start);
      if (!lower(text[0]) || ![...text].every(ch => lower(ch) || digit(ch) || ch === '_'))
        fail('UNSUPPORTED_CONTEXT', 'Constructors and non-simple identifiers are outside this preview subset.', start);
      emit('IDENT', start, i); continue;
    }
    if (digit(c)) {
      while (digit(source[i])) i++;
      if (source[i] === '.' && digit(source[i + 1])) { i++; while (digit(source[i])) i++; }
      emit('NUMBER', start, i); continue;
    }
    const punctuation = { '^': 'CARET', '{': 'LBRACE', '}': 'RBRACE', '(': 'LPAREN', ')': 'RPAREN', ';': 'SEMI', '=': 'EQUAL', '+': 'SUM', '-': 'SUM', '*': 'PRODUCT', '/': 'PRODUCT', '×': 'PRODUCT', '÷': 'PRODUCT' };
    if (own(punctuation, c)) { i++; emit(punctuation[c], start, i); continue; }
    fail('UNSUPPORTED_TOKEN', 'This character or syntax is outside the selected-state preview subset.', start);
  }
  tokens.push({ kind: 'EOF', start: i, end: i, text: '' });
  return tokens;
}

/** Parse the entire supported source, not a selected substring in isolation.
 * program := (let lower_name = expression | expression) separated by ;/newline
 * expression := explicit-state | string | number | lower_name | (expression)
 *               joined with + - * / × ÷ -> <- <-> → ← ↔
 * No type checking, evaluation, name resolution or module loading occurs.
 */
export function parseDocument(source) {
  const tokens = tokenize(source); let cursor = 0; const states = [];
  const peek = () => tokens[cursor];
  const take = kind => {
    const t = peek();
    if (t.kind !== kind) fail('SYNTAX', `Expected ${kind.toLowerCase()} in the supported preview grammar.`, t.start);
    cursor++; return t;
  };
  const maybeRegister = attachment => {
    if (peek().kind !== 'REGISTER') return null;
    const t = take('REGISTER'); return { ...t, value: t.text[1], attachment };
  };
  function state() {
    const noetic = take('NOETIC'), operator = Number(noetic.text.at(-1));
    const headRegister = maybeRegister('Noetic');
    if (peek().kind !== 'CARET') fail('IMPLICIT_DOMAIN', 'Select an explicit-domain state such as ^2^C. Implicit domains are not supported.', noetic.start);
    take('CARET'); const domain = take('DOMAIN');
    let drive = null, driveRegister = null, last = domain;
    if (peek().kind === 'UNDERSCORE') {
      take('UNDERSCORE'); take('LBRACE'); drive = take('DRIVE');
      driveRegister = maybeRegister('Drive'); last = take('RBRACE');
    }
    const tailRegister = maybeRegister('Compound');
    if (headRegister && tailRegister) fail('REGISTER_PLACEMENT', 'Both a Noetic register and a trailing compound register are outside this subset. Use one placement; independent Drive registers are supported.', tailRegister.start);
    if (tailRegister) last = tailRegister;
    const result = {
      kind: 'state', start: noetic.start, end: last.end,
      operator, domain: domain.text, drive: drive ? Number(drive.text.at(-1)) : null,
      spans: { noetic: { start: noetic.end - 1, end: noetic.end }, domain: { start: domain.start, end: domain.end }, drive: drive ? { start: drive.end - 1, end: drive.end } : null },
      registers: [headRegister, driveRegister, tailRegister].filter(Boolean),
    };
    states.push(result); return result;
  }
  function primary(depth) {
    if (depth > LIMITS.depth) fail('LIMIT', 'Preview nesting is limited to 64 levels.', peek().start);
    if (peek().kind === 'NOETIC') return state();
    if (peek().kind === 'LPAREN') { take('LPAREN'); const value = expression(0, depth + 1); take('RPAREN'); return { kind: 'group', value }; }
    if (['STRING', 'NUMBER', 'IDENT'].includes(peek().kind)) {
      const t = tokens[cursor++];
      if (t.kind === 'IDENT' && ['LPAREN', 'LBRACE'].includes(peek().kind))
        fail('UNSUPPORTED_CONTEXT', 'Calls and constructors are outside this preview subset.', t.start);
      return { kind: t.kind.toLowerCase(), start: t.start, end: t.end };
    }
    fail('UNSUPPORTED_CONTEXT', 'Select a complete explicit state in a supported simple expression or let-binding.', peek().start);
  }
  function expression(minimum = 0, depth = 0) {
    let left = primary(depth);
    const precedence = { REL: 10, SUM: 20, PRODUCT: 30 };
    while (own(precedence, peek().kind) && precedence[peek().kind] >= minimum) {
      const op = tokens[cursor++], right = expression(precedence[op.kind] + 1, depth + 1);
      left = { kind: 'binary', operator: op.text, left, right };
    }
    return left;
  }
  const statements = [];
  while (peek().kind !== 'EOF') {
    if (peek().kind === 'SEMI') { cursor++; continue; }
    if (peek().kind === 'LET') {
      take('LET'); const name = take('IDENT'); take('EQUAL');
      statements.push({ kind: 'let', name: name.text, value: expression() });
    } else statements.push(expression());
    if (!['EOF', 'SEMI'].includes(peek().kind)) fail('SYNTAX', 'Unsupported continuation after the expression. No partial-state preview was produced.', peek().start);
  }
  return freeze({ kind: 'program', statements, states });
}

export function validateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') fail('SNAPSHOT', 'The editor did not provide a source snapshot.');
  const { source, revision, documentId, selectionStart, selectionEnd, language } = snapshot;
  if (language !== 'cas') fail('LANGUAGE', 'Selected-state preview is available only for CAS source.');
  if (typeof documentId !== 'string' || !documentId.length || documentId.length > 256) fail('SNAPSHOT', 'A stable document ID is required.');
  if (!(typeof revision === 'string' && revision.length > 0 && revision.length <= 256) &&
      !(Number.isSafeInteger(revision) && revision >= 0)) fail('SNAPSHOT', 'A non-empty revision string or nonnegative integer is required.');
  if (typeof source !== 'string' || !Number.isSafeInteger(selectionStart) || !Number.isSafeInteger(selectionEnd) || selectionStart < 0 || selectionEnd < selectionStart || selectionEnd > source.length)
    fail('SNAPSHOT', 'The editor selection is not a valid UTF-16 source range.');
  return { source, revision, documentId, selectionStart, selectionEnd, language };
}
export function sameSnapshot(a, b) {
  return ['source', 'revision', 'documentId', 'selectionStart', 'selectionEnd', 'language'].every(k => a[k] === b[k]);
}
export function selectState(snapshot) {
  const snap = validateSnapshot(snapshot);
  if (snap.selectionStart === snap.selectionEnd) fail('SELECTION', 'Select one complete state, including its domain, drive and registers. A caret alone is not a verified selection.');
  const tree = parseDocument(snap.source);
  let start = snap.selectionStart, end = snap.selectionEnd;
  while (start < end && space(snap.source[start])) start++;
  while (end > start && space(snap.source[end - 1])) end--;
  const found = tree.states.filter(s => s.start === start && s.end === end);
  if (found.length !== 1) fail('SELECTION', 'The selection must cover exactly one complete parsed state. Strings, comments, identifiers and partial or multiple states cannot be previewed.', start);
  if (end - start > LIMITS.stateUnits) fail('LIMIT', 'A selected state is limited to 2,048 UTF-16 code units.', start);
  return { snapshot: snap, state: found[0] };
}

export function previewInversion(snapshot, axis) {
  if (!AXES.includes(axis)) fail('AXIS', ['E', 'S', 'A'].includes(axis) ? 'Axes E, S and A are unsupported; no transformation was made.' : 'Choose axis N, W, F or compound P.');
  const { snapshot: snap, state } = selectState(snapshot);
  const next = { operator: axis === 'N' || axis === 'P' ? N[state.operator] : state.operator,
    domain: axis === 'W' || axis === 'P' ? W[state.domain] : state.domain,
    drive: state.drive !== null && (axis === 'F' || axis === 'P') ? F[state.drive] : state.drive };
  const original = snap.source.slice(state.start, state.end), edits = [];
  for (const [key, value] of [['noetic', next.operator], ['domain', next.domain], ['drive', next.drive]]) {
    if (state.spans[key] && value !== null) edits.push({ ...state.spans[key], text: String(value) });
  }
  let candidate = original;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    const a = edit.start - state.start, b = edit.end - state.start;
    candidate = candidate.slice(0, a) + edit.text + candidate.slice(b);
  }
  const checked = parseDocument(candidate);
  if (checked.states.length !== 1 || checked.states[0].start !== 0 || checked.states[0].end !== candidate.length)
    fail('INTERNAL', 'Candidate did not remain one complete supported state.');
  const after = checked.states[0];
  if (after.operator !== next.operator || after.domain !== next.domain || after.drive !== next.drive ||
      JSON.stringify(after.registers.map(r => [r.text, r.attachment])) !== JSON.stringify(state.registers.map(r => [r.text, r.attachment])))
    fail('INTERNAL', 'Candidate components did not match the requested map.');
  const status = (before, afterValue, active) => before === null ? 'Not specified' : before !== afterValue ? 'Changed' : active ? 'Self-dual' : 'Preserved';
  const registerText = regs => regs.length ? regs.map(r => `${r.attachment} ${r.text} · ${REGISTERS[r.value]}`).join('; ') : 'Not specified';
  const components = [
    { key: 'noetic', label: 'Noetic', original: `^${state.operator} · ${NOETICS[state.operator]}`, candidate: `^${next.operator} · ${NOETICS[next.operator]}`, status: status(state.operator, next.operator, axis === 'N' || axis === 'P') },
    { key: 'domain', label: 'Domain', original: `^${state.domain} · ${DOMAINS[state.domain]}`, candidate: `^${next.domain} · ${DOMAINS[next.domain]}`, status: status(state.domain, next.domain, axis === 'W' || axis === 'P') },
    { key: 'drive', label: 'Drive', original: state.drive === null ? 'Not specified' : `F${state.drive} · ${DRIVES[state.drive]}`, candidate: next.drive === null ? 'Not specified' : `F${next.drive} · ${DRIVES[next.drive]}`, status: status(state.drive, next.drive, axis === 'F' || axis === 'P') },
    { key: 'register', label: 'Registers', original: registerText(state.registers), candidate: registerText(after.registers), status: state.registers.length ? 'Preserved' : 'Not specified' },
  ];
  return freeze({ axis, binding: BINDING, snapshot: snap, original, candidate,
    scope: { kind: 'selected-state', documentId: snap.documentId, start: state.start, end: state.end },
    components, changed: candidate !== original,
    validation: { selectedOccurrence: 'parsed-supported-subset', candidate: 'parsed-supported-subset', workspace: 'NOT_CHECKED', compilerExecution: 'NOT_RUN' },
  });
}

/** Guard at the moment an explicit Copy action is dispatched. */
export function verifyCopy(preview, snapshot, displayedText, axis) {
  const current = validateSnapshot(snapshot);
  if (!preview || !sameSnapshot(preview.snapshot, current) || preview.axis !== axis)
    fail('STALE', 'Source, document, selection, revision or axis changed. Preview again before copying.');
  if (displayedText !== preview.candidate) fail('DISPLAY', 'The displayed candidate changed. Preview again before copying.');
  const fresh = previewInversion(current, axis);
  if (fresh.candidate !== displayedText) fail('STALE', 'The candidate no longer matches the selected state. Preview again.');
  return displayedText;
}
