// One in-memory undo slot for example loads. No browser storage or compiler outputs.
export const WORKSPACE_FIELDS = ['source', 'language', 'mode', 'modules', 'inputs', 'steps'];
export const FIELD_LABELS = {source:'source', language:'language', mode:'action', modules:'module files', inputs:'simulation inputs', steps:'simulation steps'};
const copy = value => value == null ? value : JSON.parse(JSON.stringify(value));
export function copyFields(fields) {
  return Object.fromEntries(WORKSPACE_FIELDS.map(key => [key, String(fields[key] ?? '')]));
}
export function fieldsForExample(example) {
  return {
    source: example.source, language: example.language, mode: example.mode,
    modules: JSON.stringify(example.modules ?? {}, null, 2),
    inputs: example.inputs ?? '{}', steps: String(example.steps ?? 4)
  };
}
export function exampleKey(example) { return example.id ?? 'example:' + example.name; }
export function sameFields(left, right) {
  return WORKSPACE_FIELDS.every(key => left[key] === right[key]);
}
export class WorkspaceHistory {
  constructor() { this.origin = null; this.previous = null; }
  originFor(example) {
    return {
      key: exampleKey(example), lessonId: example.id ?? null,
      name: example.name, description: example.description ?? '',
      baseline: fieldsForExample(example), edited: false
    };
  }
  establish(example, fields) {
    this.origin = this.originFor(example);
    this.origin.edited = !sameFields(copyFields(fields), this.origin.baseline);
  }
  snapshot(fields, ui = {}) {
    return {fields:copyFields(fields), origin:copy(this.origin), ui:copy(ui)};
  }
  load(example, fields, ui = {}) {
    this.previous = {...this.snapshot(fields, ui), replacedBy:example.name};
    this.origin = this.originFor(example);
    return copyFields(this.origin.baseline);
  }
  markEdited() {
    if (this.origin) this.origin.edited = true;
  }
  status(fields) {
    const current = copyFields(fields);
    const changedFields = this.origin
      ? WORKSPACE_FIELDS.filter(key => current[key] !== this.origin.baseline[key])
      : [];
    return {
      origin:copy(this.origin),
      pristine:Boolean(this.origin && !this.origin.edited && changedFields.length === 0),
      changedFields,
      canRestore:Boolean(this.previous),
      replacedBy:this.previous?.replacedBy ?? null
    };
  }
  restore() {
    if (!this.previous) return null;
    const saved = copy(this.previous);
    this.previous = null;
    this.origin = copy(saved.origin);
    return saved;
  }
}

