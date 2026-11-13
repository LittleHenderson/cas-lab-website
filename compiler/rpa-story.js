import {LESSON_CONTEXTS} from './lesson-data.js';
const bindings=new WeakMap();
export function bindRpaStory(record,lesson) {
  if(record.source.kind!=='compiler_structure'||!lesson)return null;
  const canonical=LESSON_CONTEXTS.find(item=>item.id===lesson.id);
  if(!canonical||!canonical.state||!Array.isArray(canonical.parts)||canonical.parts.length!==4||JSON.stringify(canonical)!==JSON.stringify(lesson)||record.metadata.request.source!==canonical.source)return null;
  const ids=new Set(record.atlas.nodes.map(n=>n.node_id));
  if(!ids.has(canonical.state.nodeId)||canonical.parts.some(p=>!ids.has(p.nodeId)))return null;
  const story=Object.freeze({title:canonical.title,context:canonical.context,source:canonical.source,
    entries:Object.freeze([Object.freeze({nodeId:record.atlas.focus_node_id,text:canonical.context,explanation:'The author supplies this story. The compiler supplies the linked structure.'}),
      Object.freeze({nodeId:canonical.state.nodeId,text:canonical.state.reading,explanation:'This reading was written for the loaded example. It is not a measured finding.'}),
      ...canonical.parts.map(p=>Object.freeze({nodeId:p.nodeId,text:p.phrase,explanation:p.explanation}))])});
  bindings.set(story,record);return story;
}
export function assertRpaStory(record,story){if(story!==null&&bindings.get(story)!==record)throw new TypeError('Story context must be bound to this exact record by the owner.');}
