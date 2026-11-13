import {assertInspectionRecord,sourceKey,LIMITS,freezeDeep,requireValue} from './rpa-records.js';
export function createInspectionSession(record,{getSourceRevision=()=>record.source.revision}={}){
 assertInspectionRecord(record);
 requireValue(typeof getSourceRevision==='function','TYPE','getSourceRevision must be a function.');
 const nodes=new Map(record.atlas.nodes.map(n=>[n.node_id,n]));
 const loadedKey=sourceKey(record),initialCurrent=record.atlas.current_state_id;
 const root=initialCurrent??record.atlas.focus_node_id;
 let focus=record.atlas.focus_node_id,hypothesis=record.atlas.hypothesis_branch_id,path=[root],mode='outline',stale=false,staleReason=null;
 function markStale(reason){stale=true;staleReason=String(reason??'').trim()||'Source changed. Reload before further inspection.';}
 function sync(){if(stale)return;try{if(getSourceRevision()!==record.source.revision)markStale('Source revision changed. Reload this record before further inspection.');}catch{markStale('Source revision is unavailable. Reload before further inspection.');}}
 function fresh(){sync();requireValue(!stale,'STALE_SOURCE',staleReason);}
 function node(id){requireValue(nodes.has(id),'REFERENCE','Unknown inspection node.');return nodes.get(id);}
 function state(){sync();return freezeDeep({sourceKey:loadedKey,currentStateId:initialCurrent,focusNodeId:focus,hypothesisBranchId:hypothesis,scopePath:[...path],scopeNodeId:path.at(-1),mode,stale,staleReason});}
 function inspect(id){fresh();node(id);focus=id;return state();}
 function enter(id){
  fresh();node(id);const from=path.at(-1);
  requireValue(record.atlas.links.some(l=>l.relation==='contains_part'&&l.source_id===from&&l.target_id===id),'NOT_A_PART','Enter is available only for a direct contains_part link from the current scope.');
  requireValue(path.length<LIMITS.path&&!path.includes(id),'BOUNDS','Navigation depth or cycle bound reached.');path=[...path,id];focus=id;return state();
 }
 function returnTo(index){fresh();requireValue(Number.isInteger(index)&&index>=0&&index<path.length,'PATH','Invalid breadcrumb.');path=path.slice(0,index+1);focus=path.at(-1);return state();}
 function selectHypothesis(id){fresh();requireValue(id===null||node(id).status==='hypothetical','FIELD','Select only a retained hypothetical node.');hypothesis=id;return state();}
 function setMode(value){fresh();requireValue(['outline','flower'].includes(value),'FIELD','Unknown inspection layout.');mode=value;return state();}
 function scope(){const s=state();const outgoing=record.atlas.links.filter(l=>l.source_id===s.scopeNodeId);return freezeDeep({node:node(s.scopeNodeId),links:outgoing,nodes:[node(s.scopeNodeId),...outgoing.map(l=>node(l.target_id))]});}
 return Object.freeze({record,state,inspect,enter,returnTo,selectHypothesis,setMode,scope,invalidate(reason){markStale(reason);return state();}});
}
