/* CAS Site RPA inspection records. No native execution or replay authority. */
export const RPA_API = 'cas.site.rpa-inspection/0.1';
export const LIMITS = Object.freeze({bytes:262144,nodes:128,links:512,fields:64,members:512,timeline:64,path:16,jsonDepth:24,jsonValues:20000,string:8192});
export const NATIVE_SCHEMA = 'cncm.native-rpa-view/0.1';
export const FIXTURE = Object.freeze({id:'native-missing-procedure',revision:'rpa_001/demo2',sha256:'723efadb73e60b9ca003b71c6d93f857bbf440c0d40690ad99a727ae3b6435ab',schema:NATIVE_SCHEMA});
const records = new WeakMap();
const fail = (code,message) => { throw new RpaInputError(code,message); };
export class RpaInputError extends Error { constructor(code,message){super(message);this.name='RpaInputError';this.code=code;} }
export const requireValue = (test,code,message) => { if(!test)fail(code,message); };
export function freezeDeep(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freezeDeep);Object.freeze(value);}return value;}
export function stableJSON(v){if(Array.isArray(v))return '['+v.map(stableJSON).join(',')+']';if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+stableJSON(v[k])).join(',')+'}';return JSON.stringify(v);}
export async function sha256(bytes){
 requireValue(bytes instanceof Uint8Array,'TYPE','Supply UTF-8 bytes as Uint8Array.');
 const hash=await globalThis.crypto.subtle.digest('SHA-256',bytes);
 return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function text(v,label,max=LIMITS.string,empty=false){requireValue(typeof v==='string'&&v.length<=(max)&& (empty||v.length>0),'FIELD',label+' must be bounded text.');return v;}
function id(v,label='ID'){text(v,label,256);requireValue(/^[A-Za-z0-9][A-Za-z0-9_.:/+@-]*$/.test(v),'ID',label+' contains unsupported characters.');return v;}
function digest(v,label){requireValue(typeof v==='string'&&/^[a-f0-9]{64}$/.test(v),'HASH',label+' must be a lowercase SHA-256 identity.');return v;}
function integer(v,label,max=1000000){requireValue(Number.isSafeInteger(v)&&v>=0&&v<=max,'FIELD',label+' must be a bounded nonnegative integer.');}
function exact(v,keys,label){requireValue(v&&typeof v==='object'&&!Array.isArray(v),'TYPE',label+' must be an object.');requireValue(Object.keys(v).sort().join('|')===[...keys].sort().join('|'),'SCHEMA',label+' has unsupported or missing fields.');}
function arr(v,max,label){requireValue(Array.isArray(v)&&v.length<=max,'BOUNDS',label+' exceeds its supported count or is not an array.');}
function identifiers(v,label,max=64){arr(v,max,label);v.forEach(x=>id(x,label));requireValue(v.every((x,i)=>i===0||v[i-1]<x),'DUPLICATE',label+' must be sorted and unique.');}
const schema=(v,s)=>requireValue(v.schema_version===s,'UNSUPPORTED_SCHEMA','Unsupported schema: '+String(v.schema_version));
/** Strict, bounded JSON parser. Duplicate keys cannot be hidden by JSON.parse. */
export function parseBoundedJSON(bytes){
 requireValue(bytes instanceof Uint8Array&&bytes.byteLength<=LIMITS.bytes,'BOUNDS','Record exceeds the 256 KiB input limit.');
 let s;try{s=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail('UTF8','Source is not valid UTF-8.');}
 let p=0,count=0;
 const ws=()=>{while(p<s.length&&[32,9,10,13].includes(s.charCodeAt(p)))p++;};
 function string(){
  const start=p++;let escaped=false;
  while(p<s.length){const ch=s[p++];if(ch==='"'&&!escaped){let value;try{value=JSON.parse(s.slice(start,p));}catch{fail('JSON','Invalid JSON string.');}text(value,'JSON string',LIMITS.string,true);return value;}if(ch==='\\'&&!escaped)escaped=true;else escaped=false;}
  fail('JSON','Unterminated JSON string.');
 }
 function value(depth){
  requireValue(depth<=LIMITS.jsonDepth&&++count<=LIMITS.jsonValues,'BOUNDS','JSON nesting or value count exceeds the supported bound.');ws();const c=s[p];
  if(c==='"')return string();
  if(c==='{'){p++;ws();const out=Object.create(null),seen=new Set();if(s[p]==='}'){p++;return out;}while(true){ws();requireValue(s[p]==='"','JSON','Expected an object key.');const k=string();requireValue(!seen.has(k),'DUPLICATE','Duplicate JSON key: '+k);requireValue(!['__proto__','prototype','constructor'].includes(k),'FIELD','Unsupported object key.');seen.add(k);ws();requireValue(s[p++]===':','JSON','Expected colon.');out[k]=value(depth+1);ws();const sep=s[p++];if(sep==='}')return out;requireValue(sep===',','JSON','Expected comma or closing brace.');}}
  if(c==='['){p++;ws();const out=[];if(s[p]===']'){p++;return out;}while(true){out.push(value(depth+1));ws();const sep=s[p++];if(sep===']')return out;requireValue(sep===',','JSON','Expected comma or closing bracket.');}}
  for(const [word,result]of [['true',true],['false',false],['null',null]])if(s.startsWith(word,p)){p+=word.length;return result;}
  const match=s.slice(p).match(/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/);
  requireValue(Boolean(match),'JSON','Unexpected JSON token.');
  p+=match[0].length;const number=Number(match[0]);requireValue(Number.isFinite(number)&&Math.abs(number)<=Number.MAX_SAFE_INTEGER,'BOUNDS','JSON numeric value exceeds supported precision.');return number;
 }
 const parsed=value(0);ws();requireValue(p===s.length,'JSON','Unexpected trailing input.');return parsed;
}
function context(c){
 exact(c,['schema_version','context_id','model_version','observation_id','observation_time','record_version'],'Context');schema(c,'cas.rpa.context/0.1');
 id(c.context_id);id(c.observation_id);text(c.model_version,'Model version',256);text(c.observation_time,'Observation time',256);integer(c.record_version,'Record version');
}
export function validateAtlas(a,{currentRequired=true}={}){
 exact(a,['schema_version','nodes','links','current_state_id','focus_node_id','hypothesis_branch_id','overlap_certificates'],'Atlas');schema(a,'cas.rpa.snapshot/0.1');
 arr(a.nodes,LIMITS.nodes,'Nodes');requireValue(a.nodes.length>0,'FIELD','Atlas must have a node.');arr(a.links,LIMITS.links,'Links');
 arr(a.overlap_certificates,0,'Overlap certificates'); // This adapter does not implement overlap proof verification.
 const nodes=new Map(),links=new Set();
 for(const n of a.nodes){
  exact(n,['schema_version','node_id','idea_id','label','context','status','fields','members','profile40','profile_basis','expansion_ref','kind','evidence_refs'],'Node');schema(n,'cas.rpa.node/0.1');
  id(n.node_id);id(n.idea_id);text(n.label,'Label',512);context(n.context);
  requireValue(!nodes.has(n.node_id),'DUPLICATE','Duplicate node ID.');nodes.set(n.node_id,n);
  requireValue(['observed','hypothetical','unknown','rejected','verified'].includes(n.status),'FIELD','Unknown node status.');
  requireValue(['idea_context','state','region','evidence'].includes(n.kind),'FIELD','Unknown node kind.');
  arr(n.fields,LIMITS.fields,'Fields');let last='';
  for(const row of n.fields){requireValue(Array.isArray(row)&&row.length===2,'FIELD','Invalid field pair.');id(row[0],'Field name');text(row[1],'Field value',LIMITS.string,true);requireValue(last<row[0],'DUPLICATE','Fields must be sorted and unique.');last=row[0];}
  if(n.members!==null)identifiers(n.members,'Members',LIMITS.members);
  requireValue(n.profile40===null&&n.profile_basis===null,'UNSUPPORTED_PROFILE','Profile geometry is not supported by this inspection adapter.');
  requireValue(n.expansion_ref===null,'UNSUPPORTED_EXPANSION','Expansion generators are not supported.');
  identifiers(n.evidence_refs,'Node evidence');
 }
 if(currentRequired)requireValue(nodes.has(a.current_state_id),'REFERENCE','Current retained state is missing.');
 if(a.current_state_id!==null){const current=nodes.get(a.current_state_id);requireValue(current?.kind==='state'&&['observed','verified'].includes(current.status),'FIELD','Current retained state must be an imported observed/verified state.');}
 requireValue(nodes.has(a.focus_node_id),'REFERENCE','Initial focus is missing.');
 if(a.hypothesis_branch_id!==null)requireValue(nodes.get(a.hypothesis_branch_id)?.status==='hypothetical','REFERENCE','Hypothesis must reference a hypothetical node.');
 const children=new Map(a.nodes.map(n=>[n.node_id,[]]));
 for(const l of a.links){
  exact(l,['schema_version','link_id','source_id','target_id','relation','projection','action_id','evidence_refs','certificate_id','transition_status'],'Link');schema(l,'cas.rpa.link/0.1');
  id(l.link_id);id(l.source_id);id(l.target_id);requireValue(!links.has(l.link_id),'DUPLICATE','Duplicate link ID.');links.add(l.link_id);
  requireValue(nodes.has(l.source_id)&&nodes.has(l.target_id),'REFERENCE','Link endpoint is missing.');
  identifiers(l.evidence_refs,'Link evidence');requireValue(l.certificate_id===null,'UNSUPPORTED_RELATION','Overlap certificates are unsupported.');
  requireValue(['contains_part','refines_state','reachable_via','references_same_idea'].includes(l.relation),'UNSUPPORTED_RELATION','Unsupported relation type.');
  if(l.relation==='contains_part'){text(l.projection,'Part projection',512);children.get(l.source_id).push(l.target_id);}else requireValue(l.projection===null,'FIELD','Only contains_part has a projection.');
  if(l.relation==='reachable_via'){
   id(l.action_id,'Transition action');requireValue(['candidate','observed','rejected'].includes(l.transition_status),'FIELD','Invalid transition status.');
   if(l.transition_status!=='candidate')requireValue(l.evidence_refs.length>0,'EVIDENCE','Recorded transition requires retained evidence references.');
   if(l.transition_status==='candidate')requireValue(nodes.get(l.target_id).status==='hypothetical','FIELD','Candidate target must be hypothetical in this adapter.');
  }else requireValue(l.action_id===null&&l.transition_status===null,'FIELD','Only reachable_via has transition fields.');
  if(l.relation==='refines_state'){
   const parent=nodes.get(l.source_id),child=nodes.get(l.target_id);
   requireValue(stableJSON(parent.context)===stableJSON(child.context),'REFINEMENT','Refinement contexts differ.');
   requireValue(parent.members!==null&&child.members!==null,'REFINEMENT','Refinement requires explicit finite members.');
   requireValue(child.members.every(x=>parent.members.includes(x)),'REFINEMENT','Child members are not a subset.');
   const fields=new Map(parent.fields);requireValue(child.fields.every(([k,v])=>!fields.has(k)||fields.get(k)===v),'REFINEMENT','Refinement fields conflict.');
  }
  if(l.relation==='references_same_idea')requireValue(nodes.get(l.source_id).idea_id===nodes.get(l.target_id).idea_id,'IDENTITY','Same-idea relation IDs differ.');
 }
 const done=new Map(),active=new Set();
 function depth(n){if(active.has(n))fail('CONTAINMENT_CYCLE','contains_part cannot form a cycle.');if(done.has(n))return done.get(n);active.add(n);const d=1+Math.max(0,...children.get(n).map(depth));active.delete(n);requireValue(d<=LIMITS.path,'BOUNDS','Containment depth exceeds 16 nodes.');done.set(n,d);return d;}
 a.nodes.forEach(n=>depth(n.node_id));return a;
}
function validateNative(d){
 exact(d,['schema_version','atlas','native','timeline','next_actions'],'Native view');schema(d,NATIVE_SCHEMA);validateAtlas(d.atlas);
 exact(d.native,['current_state_hash','journal_digest','output','scope','source_profile_digest','terminal_status'],'Native metadata');
 const m=d.native;[m.current_state_hash,m.journal_digest,m.source_profile_digest].forEach(x=>digest(x,'Native digest'));text(m.scope,'Native scope');text(m.terminal_status,'Terminal status',128);if(m.output!==null)text(m.output,'Native output');
 requireValue(d.atlas.current_state_id==='native-state-'+m.current_state_hash,'IDENTITY','Native current state and hash differ.');
 const nodes=new Map(d.atlas.nodes.map(n=>[n.node_id,n]));
 const fields=n=>Object.fromEntries(n.fields);
 requireValue(fields(nodes.get(d.atlas.current_state_id)).state_hash===m.current_state_hash,'IDENTITY','Current node state hash differs.');
 arr(d.timeline,LIMITS.timeline,'Timeline');
 const events=new Map();let last=null;
 for(const e of d.timeline){
  exact(e,['event_hash','run_id','tick','intent_types','outcome','authorized_intent_ids','rejected_intent_ids','committed_mutations','pre_state_hash','post_state_hash','work'],'Timeline event');
  [e.event_hash,e.pre_state_hash,e.post_state_hash].forEach(x=>digest(x,'Event digest'));id(e.run_id);integer(e.tick,'Logical tick');
  requireValue(!events.has(e.event_hash),'DUPLICATE','Duplicate event identity.');events.set(e.event_hash,e);
  for(const key of ['intent_types','authorized_intent_ids','rejected_intent_ids','committed_mutations']){arr(e[key],64,key);e[key].forEach(x=>id(x,key));}
  requireValue(e.intent_types.length===1,'UNSUPPORTED_EVENT','This adapter supports one explicit intent type per retained event.');
  requireValue(['ACCEPTED','PARTIALLY_ACCEPTED','REJECTED'].includes(e.outcome),'FIELD','Unknown event outcome.');
  exact(e.work,['basis','checker_calls_allocated','instructions_allocated'],'Work allocation');requireValue(e.work.basis==='conservative_policy_units','FIELD','Unsupported work basis.');
  integer(e.work.checker_calls_allocated,'Checker allocation');integer(e.work.instructions_allocated,'Instruction allocation');
  if(last)requireValue(e.run_id===last.run_id&&e.tick===last.tick+1&&e.pre_state_hash===last.post_state_hash,'UNSUPPORTED_TIMELINE','Only one contiguous retained episode is supported.');
  requireValue(nodes.has('native-state-'+e.pre_state_hash)&&nodes.has('native-state-'+e.post_state_hash),'REFERENCE','Timeline state node missing.');
  requireValue(fields(nodes.get('native-state-'+e.pre_state_hash)).state_hash===e.pre_state_hash,'IDENTITY','Timeline pre-state identity differs.');
  const end=nodes.get('native-state-'+e.post_state_hash),ef=fields(end);
  requireValue(ef.state_hash===e.post_state_hash&&ef.event_hash===e.event_hash&&ef.run_id===e.run_id&&ef.outcome===e.outcome,'IDENTITY','Timeline/node evidence join differs.');
  requireValue(end.context.record_version===e.tick&&end.context.observation_time==='logical-tick:'+e.tick,'IDENTITY','Logical tick/context join differs.');
  last=e;
 }
 requireValue(last&&last.post_state_hash===m.current_state_hash,'IDENTITY','Retained timeline does not end at the current state.');
 const recorded=d.atlas.links.filter(l=>l.relation==='reachable_via'&&l.transition_status!=='candidate');
 requireValue(recorded.length===d.timeline.length,'IDENTITY','Timeline and recorded-transition counts differ.');
 const matchedEvents=new Set();
 for(const l of recorded){const e=events.get(l.evidence_refs[0]);requireValue(e&&!matchedEvents.has(e.event_hash)&&l.evidence_refs.length===1&&l.source_id==='native-state-'+e.pre_state_hash&&l.target_id==='native-state-'+e.post_state_hash&&l.action_id===e.intent_types[0]&&l.transition_status===(e.outcome==='REJECTED'?'rejected':'observed'),'IDENTITY','Recorded transition does not uniquely match a retained event.');matchedEvents.add(e.event_hash);}
 requireValue(matchedEvents.size===events.size,'IDENTITY','A retained event has no matching transition.');
 arr(d.next_actions,16,'Proposals');const proposalLinks=d.atlas.links.filter(l=>l.relation==='reachable_via'&&l.transition_status==='candidate');
 requireValue(proposalLinks.length===d.next_actions.length,'IDENTITY','Proposal count differs from candidate links.');
 const matchedProposals=new Set(),proposalActions=new Set();
 for(const hint of d.next_actions){
  exact(hint,['action','authority','blockers','readiness'],'Proposal');id(hint.action);text(hint.readiness,'Readiness',256);arr(hint.blockers,32,'Blockers');hint.blockers.forEach(x=>text(x,'Blocker'));requireValue(hint.authority==='PROPOSAL_ONLY','AUTHORITY','Only proposal-only hints are accepted.');
  requireValue(!proposalActions.has(hint.action),'IDENTITY','Duplicate proposal action.');proposalActions.add(hint.action);
  const matches=proposalLinks.filter(l=>l.action_id===hint.action&&l.source_id===d.atlas.current_state_id);requireValue(matches.length===1,'IDENTITY','Proposal does not match a unique current candidate link.');
  requireValue(!matchedProposals.has(matches[0].link_id),'IDENTITY','Candidate link is matched more than once.');matchedProposals.add(matches[0].link_id);
  const f=fields(nodes.get(matches[0].target_id));requireValue(f.authority==='PROPOSAL_ONLY'&&f.readiness===hint.readiness&&stableJSON(parseBoundedJSON(new TextEncoder().encode(f.blockers)))===stableJSON(hint.blockers),'IDENTITY','Proposal fields differ from retained hint.');
 }
 requireValue(matchedProposals.size===proposalLinks.length,'IDENTITY','A candidate link has no matching proposal.');
 return d;
}
function registerInspectionRecord({source,atlas,metadata,original,bytes}){
 // Exported only for the separately versioned compiler adapter; never upgrades trust.
 validateAtlas(atlas,{currentRequired:source.kind!=='compiler_structure'});
 const trust=freezeDeep({classification:source.kind==='compiler_structure'?'DECLARED_COMPILER_STRUCTURE':source.kind==='retained_example'?'RETAINED_EXAMPLE_ASSERTIONS':'IMPORTED_ASSERTIONS',bytes:'MATCHED_EXPECTED_SHA256',replay:'NOT_RUN',authorship:'NOT_AUTHENTICATED',worldTruth:'NOT_ESTABLISHED',authenticatedReplayEvidence:'NOT_SUPPLIED'});
 const record=freezeDeep({api:RPA_API,source,trust,atlas,metadata,original});
 records.set(record,{bytes:new Uint8Array(bytes)});return record;
}
export async function importRetainedNative({bytes,expectedSha256,sourceId,revision}){
 digest(expectedSha256,'Expected source digest');id(sourceId,'Source identity');text(revision,'Source revision',256);
 requireValue(bytes instanceof Uint8Array&&bytes.byteLength<=LIMITS.bytes,'BOUNDS','Record exceeds the supported byte bound.');
 const copy=new Uint8Array(bytes),actual=await sha256(copy);requireValue(actual===expectedSha256,'SOURCE_MISMATCH','Source bytes do not match the expected SHA-256.');
 const d=validateNative(parseBoundedJSON(copy));
 return registerInspectionRecord({source:{kind:actual===FIXTURE.sha256&&sourceId===FIXTURE.id&&revision===FIXTURE.revision?'retained_example':'imported_assertion',adapter:'cas.site.rpa-native-inspection/0.1',sourceId,revision,sha256:actual,schema:d.schema_version},atlas:d.atlas,metadata:{native:d.native,timeline:d.timeline,nextActions:d.next_actions},original:d,bytes:copy});
}
export function assertInspectionRecord(record){requireValue(records.has(record),'TYPE','Use a supported adapter to create the inspection record.');return record;}
export function originalBytes(record){assertInspectionRecord(record);return new Uint8Array(records.get(record).bytes);}
export function sourceKey(record){assertInspectionRecord(record);return stableJSON(record.source);}

export const COMPILER_ADAPTER = 'cas.site.rpa-compound-state/0.1';
export const COMPILER_RECORD_SCHEMA = 'cas.site.rpa-compiler-record/0.1';
export const COMPILER_BASE = '73bbdbb5011c8e454a8a34eba0621694268f3895';
/** Known single compound CAS state only. No graph edge is interpreted as a future. */
export async function importCompilerState({bytes,expectedSha256,expectedRequestSha256,sourceId,revision}){
 digest(expectedSha256,'Expected record digest');digest(expectedRequestSha256,'Expected request digest');id(sourceId,'Source ID');text(revision,'Workspace revision',256);
 requireValue(bytes instanceof Uint8Array&&bytes.byteLength<=LIMITS.bytes,'BOUNDS','Record exceeds the supported byte bound.');
 const copy=new Uint8Array(bytes),actual=await sha256(copy);requireValue(actual===expectedSha256,'SOURCE_MISMATCH','Compiler record bytes do not match the expected digest.');
 const d=parseBoundedJSON(copy);exact(d,['schema_version','compiler_commit','request','artifact'],'Compiler record');schema(d,COMPILER_RECORD_SCHEMA);
 requireValue(d.compiler_commit===COMPILER_BASE,'UNSUPPORTED_COMPILER','This adapter is pinned to the inspected v17 compiler contract.');
 const r=d.request;exact(r,['source','language','mode','modules'],'Compiler request');
 requireValue(r.language==='cas'&&r.mode==='run','UNSUPPORTED_REQUEST','Only CAS run mode is supported.');
 exact(r.modules,[],'Modules');
 const requestHash=await sha256(new TextEncoder().encode(stableJSON(r)));
 requireValue(requestHash===expectedRequestSha256,'REQUEST_MISMATCH','Full compiler request identity differs.');
 const match=typeof r.source==='string'&&r.source.match(/^\^(\d)\^([PCEO])_\{(F[1-7])\}\|([TAfE])$/);
 requireValue(match,'UNSUPPORTED_SOURCE','Only one explicit compound state such as ^6^C_{F2}|A is supported.');
 const [,op,dom,drive,reg]=match,coordinateId='state:'+dom+op+'_'+drive+'_'+reg;
 const a=d.artifact;exact(a,['source','valid','error','engine','warnings','tokens','ast','type','bytecode','result','browser_view','diagram','activations','nesting'],'Compiler artifact');requireValue(a&&a.valid===true&&a.error===null&&a.source===r.source&&a.engine==='python'&&a.browser_view==='run','INVALID_COMPILER_RECORD','A successful matching compiler artifact is required.');
 const g=a.diagram;exact(g,['kind','schema_version','layouts','nodes','edges','containers'],'Compiler diagram');
 requireValue(g.kind==='cas_diagram'&&g.schema_version==='1.0'&&stableJSON(g.layouts)==='["semantic"]'&&Array.isArray(g.containers)&&g.containers.length===0,'UNSUPPORTED_DIAGRAM','Unsupported diagram schema or layout.');
 arr(g.nodes,5,'Compiler nodes');arr(g.edges,4,'Compiler edges');requireValue(g.nodes.length===5&&g.edges.length===4,'UNSUPPORTED_DIAGRAM','Only the five-node, four-edge compound-state graph is supported.');
 const selected=g.nodes.find(n=>n.id===coordinateId);
 const expectedState={id:coordinateId,kind:'state',label:dom+op+'_'+drive+'|'+reg,role:'cognitive_state',operator:Number(op),noetic:'CO-'+op,domain:dom,drive,register:reg};
 requireValue(stableJSON(selected)===stableJSON(expectedState),'COMPILER_MAPPING','Compound state fields do not match the source.');
 const coords=[
 {id:'noetic:CO-'+op,kind:'noetic',label:'CO-'+op,role:'atomic_noetic',edge:'instantiates',field:'noetic',caption:'Noetic'},
 {id:'domain:'+dom,kind:'domain',label:dom,role:'processing_domain',edge:'locates',field:'domain',caption:'Domain'},
 {id:'drive:'+drive,kind:'drive',label:drive,role:'foundation_drive',edge:'modulates',field:'drive',caption:'Drive'},
 {id:'register:'+reg,kind:'register',label:reg,role:'phenomenological_register',edge:'register',field:'register',caption:'Register'}
 ];
 requireValue(new Set(g.nodes.map(n=>n.id)).size===5&&new Set(g.edges.map(e=>e.id)).size===4,'DUPLICATE','Compiler graph IDs are not unique.');
 for(const c of coords){
  requireValue(stableJSON(g.nodes.find(n=>n.id===c.id))===stableJSON({id:c.id,kind:c.kind,label:c.label,role:c.role}),'COMPILER_MAPPING','Unknown coordinate node fields.');
  const edges=g.edges.filter(e=>e.source===c.id&&e.target===coordinateId);
  requireValue(edges.length===1,'COMPILER_MAPPING','Coordinate attachment is missing or duplicated.');
  const edge=edges[0];exact(edge,['id','source','target','kind','directed','label'],'Compiler edge');id(edge.id);
  requireValue(edge.kind===c.edge&&edge.directed===true&&edge.label===c.caption,'COMPILER_MAPPING','Unsupported coordinate attachment role.');
 }
 requireValue(a.type?.kind==='state'&&a.type.singular===true&&stableJSON(a.type.domains)===stableJSON([dom]),'COMPILER_MAPPING','Compiler state type differs.');
 requireValue(a.result?.kind==='state'&&a.result.dominant_operator==='CO-'+op&&a.result.dominant_domain===dom&&a.result.dominant_drive===drive&&a.result.register===reg,'COMPILER_MAPPING','Compiler result coordinates differ.');
 const sourceHash=await sha256(new TextEncoder().encode(r.source));
 const ctx={schema_version:'cas.rpa.context/0.1',context_id:'compiler-source:'+sourceHash,model_version:COMPILER_ADAPTER,observation_id:'loaded-record:'+actual,observation_time:'NOT_SUPPLIED',record_version:0};
 const make=(nodeId,label,fields)=>({schema_version:'cas.rpa.node/0.1',node_id:nodeId,idea_id:nodeId,label,context:ctx,status:'unknown',fields:Object.entries(fields).sort(([a],[b])=>a.localeCompare(b,'en')),members:null,profile40:null,profile_basis:null,expansion_ref:null,kind:'idea_context',evidence_refs:[actual]});
 const root='compiler-source:'+sourceHash;
 const mappedNodes=[make(root,'Loaded compound-state source',{source:r.source,meaning:'Loaded source record; not an actual current machine state.'}),make(coordinateId,selected.label,{compiler_node_id:selected.id,compiler_role:selected.role,domain:dom,drive,noetic:'CO-'+op,register:reg}),...coords.map(c=>make(c.id,c.caption+': '+c.label,{compiler_node_id:c.id,compiler_role:c.role,declared_coordinate:c.field}))];
 const part=(linkId,source,target,projection)=>({schema_version:'cas.rpa.link/0.1',link_id:linkId,source_id:source,target_id:target,relation:'contains_part',projection,action_id:null,evidence_refs:[actual],certificate_id:null,transition_status:null});
 const mappedLinks=[part('source-state',root,coordinateId,'artifact.diagram.nodes: exact declared compound-state record'),...coords.map(c=>part('coordinate:'+c.field,coordinateId,c.id,'compound_state.'+c.field+'; original attachment '+c.edge+' retained separately'))];
 const atlas={schema_version:'cas.rpa.snapshot/0.1',nodes:mappedNodes,links:mappedLinks,current_state_id:null,focus_node_id:root,hypothesis_branch_id:null,overlap_certificates:[]};
 return registerInspectionRecord({source:{kind:'compiler_structure',adapter:COMPILER_ADAPTER,sourceId,revision,sha256:actual,sourceSha256:sourceHash,requestSha256:requestHash,compilerCommit:d.compiler_commit,schema:d.schema_version},atlas,metadata:{originalDiagram:g,request:r,originalEdgeMeaning:'Only explicit compound-state coordinates are projected as named parts. Original edges are retained; none become reachable_via.',currentState:'NOT_SUPPLIED',timeline:[],nextActions:[],scope:'Declared compiler structure; no native execution history or authored human interpretation.'},original:d,bytes:copy});
}
