import {assertRpaStory} from '../rpa-story.js';
import {assertInspectionRecord,originalBytes} from './rpa-records.js';
import {createInspectionSession} from './rpa-navigation.js';
let serial=0;
const meanings={
 contains_part:'Contains part — a constituent; entering it does not advance time.',
 refines_state:'Refines state — a more specific description in the same context.',
 reachable_via:'Reachable via — a retained event or explicit candidate action; never an inferred future.',
 references_same_idea:'References the same canonical idea in another contextual record.'
};
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function add(parent,...children){parent.append(...children);return parent;}
function pair(dl,key,value){add(dl,node('dt',key),node('dd',value===null?'Not supplied':String(value)));}
const short=id=>id.length>44?id.slice(0,21)+'…'+id.slice(-14):id;
/** Mount an independent inspection panel. Never changes the compiler or retained state. */
export function mountRpaInspector({host,record,getSourceRevision,onInspect,story=null}){
 if(!(host instanceof HTMLElement))throw new TypeError('host must be an HTMLElement');
 assertInspectionRecord(record);assertRpaStory(record,story);
 if(record.source.kind==='compiler_structure'&&typeof getSourceRevision!=='function')throw new TypeError('Compiler inspection requires an owner-supplied full workspace revision callback.');
 const instance='rpa-'+(++serial),session=createInspectionSession(record,{getSourceRevision});
 const nodes=new Map(record.atlas.nodes.map(n=>[n.node_id,n]));
 const compiled=record.source.kind==='compiler_structure';
 const names={noetic:['Idea','Mind','Positive','Negative','Vibration','Female','Male','Rhythm','Above/Cause','Below/Effect'],domain:{P:'Principled',C:'Cognitive',E:'Evaluative',O:'Operational'},drive:{F1:'Unity',F2:'Wisdom',F3:'Vitality',F4:'Connection',F5:'Agency',F6:'Structure',F7:'Purpose'},register:{T:'Transcendent',A:'Analytical',f:'Affective',E:'Embodied'}};
 function presentation(n){
  if(!compiled)return {label:n.label,color:'neutral',meaning:'A supplied record from the saved software episode. Its fields and links are available below.'};
  const [kind,id]=n.node_id.split(':');
  if(kind==='compiler-source')return {label:'Your compiled input',color:'neutral',meaning:'Open the complete state inside this source record. The compiler checked the written notation; it did not establish a real situation.'};
  if(kind==='state')return {label:'Complete state · '+n.label,color:'neutral',meaning:'This description combines four coordinates: named labels for an operation, domain, motive and manner. Open its parts to inspect those labels.'};
  const definitions={noetic:['cyan','Noetic operator','A Noetic operator names a way of relating to an idea.'],domain:['emerald','Domain','The domain names the area of experience being described.'],drive:['amber','Drive','The drive names the motive assigned to the description.'],register:['pink','Register','The register names the manner of experiencing or processing the situation.']};
  const d=definitions[kind];if(!d)return {label:n.label,color:'neutral',meaning:'A compiler-derived record.'};
  const name=kind==='noetic'?names.noetic[Number(id.replace('CO-',''))]:names[kind][id];
  return {label:d[1]+': '+name+' · '+id,color:d[0],meaning:d[2]};
 }
 const label=n=>presentation(n).label;
 const localParts=id=>record.atlas.links.filter(l=>l.relation==='contains_part'&&l.source_id===id).map(l=>nodes.get(l.target_id));

 const outer=node('section',undefined,'rpa-inspector');outer.dataset.rpaVersion=record.api;outer.setAttribute('aria-labelledby',instance+'-title');
 const live=node('p','','rpa-status');live.id=instance+'-status';live.setAttribute('role','status');live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');const content=node('div',undefined,'rpa-content');outer.append(live,content);
 host.append(outer);let destroyed=false,page=0;
 const button=(label,control,action,{disabled=false,pressed,aria}={})=>{
  const b=node('button',label);b.type='button';b.dataset.rpaControl=control;b.disabled=disabled;
  if(pressed!==undefined)b.setAttribute('aria-pressed',String(pressed));if(aria)b.setAttribute('aria-label',aria);
  b.addEventListener('click',()=>{if(destroyed)return;try{const next=action();render(next?.message??label,next?.focus??control);if(next?.inspected&&typeof onInspect==='function')onInspect(Object.freeze({source:record.source,inspection:session.state()}));}catch(error){render(error.message,control);}});
  return b;
 };
 function inspect(id){session.inspect(id);const s=session.state(),others=localParts(s.scopeNodeId);const index=others.findIndex(n=>n.node_id===id);if(index>=0)page=Math.floor(index/6);return {inspected:true,message:'Inspection focus: '+nodes.get(id).label+'. Retained current state unchanged.',focus:'inspect:'+id};}
 function fieldDetails(parent,title,value){const d=node('details');add(d,node('summary',title),node('pre',JSON.stringify(value,null,2)));parent.append(d);}
 function render(message='',restore=null){
  if(destroyed)return;
  const s=session.state(),selected=nodes.get(s.focusNodeId),scope=nodes.get(s.scopeNodeId);
  const fragments=document.createDocumentFragment();
  const header=node('header',undefined,'rpa-header'),title=node('h2',compiled?'Explore your compiled description':'Explore the saved software episode');title.id=instance+'-title';
  add(header,node('p',compiled?'COMPILER-DERIVED STRUCTURE':'SAVED SYSTEM RECORDS','rpa-eyebrow'),title,node('p','Select a record to read it. Enter part opens the named parts inside that record. Neither action changes the recorded present or carries out a proposal.'));
  fragments.append(header);
  const trust=node('aside',undefined,'rpa-trust');trust.setAttribute('aria-label','Source and trust classification');
  add(trust,node('strong',record.source.kind==='retained_example'?'Saved software example — claims from its source':record.source.kind==='compiler_structure'?'Declared compiler structure':'Imported source — its claims have not been independently verified'),node('p',compiled?'These records come from the accepted editor input. They describe what the code says, not what a person or machine has actually done.':'This is a saved example, not a live machine. The file matches the expected copy. This viewer has not rerun the system to verify its history.'));
  const sourceInfo=node('details');add(sourceInfo,node('summary','Technical source checks and import limits'));
  const sourceDL=node('dl');for(const [k,v]of Object.entries(record.source))pair(sourceDL,k,v);add(sourceInfo,sourceDL,node('p','Authenticated replay evidence: NOT_SUPPLIED. Imported status words and retained evidence references do not authenticate themselves.'));add(sourceInfo,node('p','Import limits: 256 KiB; 128 records; 512 links; 64 fields per record; 512 finite members; 64 timeline records; 512-character labels; 8,192-character strings; 24 JSON levels; 20,000 values; 16 containment/path nodes. Unsupported input fails explicitly.'));trust.append(sourceInfo);fragments.append(trust);
  const handles=node('div',undefined,'rpa-handles');
  const currentLabel=s.currentStateId?nodes.get(s.currentStateId).label:'None: code alone does not supply a recorded present';
  for(const [handleLabel,id,display,kind]of [
   ['Recorded present — what the saved source calls current',s.currentStateId,currentLabel,'current'],
   ['You are inspecting — the selected record',s.focusNodeId,label(selected),'focus'],
   ['Proposed next step — not carried out here',s.hypothesisBranchId,s.hypothesisBranchId?nodes.get(s.hypothesisBranchId).label:compiled?'None: this code supplies no proposed action':'None selected','hypothesis']]){
    const card=node('section',undefined,'rpa-handle');card.dataset.rpaHandle=kind;add(card,node('h3',handleLabel),node('p',display));const identity=node('details');add(identity,node('summary','Record identifier'),node('code',id??'NOT_SUPPLIED'));card.append(identity);if(kind==='hypothesis'&&s.hypothesisBranchId!==null)card.append(button('Clear proposal selection','hypothesis:clear-handle',()=>{session.selectHypothesis(null);return {message:'Proposal selection cleared. Recorded present and inspection focus unchanged.',focus:'mode:'+s.mode};},{disabled:s.stale}));handles.append(card);
  }fragments.append(handles);
  live.classList.toggle('rpa-stale',s.stale);
  const layout=node('div',undefined,'rpa-workspace'),main=node('div',undefined,'rpa-main'),inspector=node('section',undefined,'rpa-detail');inspector.setAttribute('aria-labelledby',instance+'-selection');
  const toolbar=node('div',undefined,'rpa-toolbar');toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label','Atlas layout');
  add(toolbar,button('Outline','mode:outline',()=>{session.setMode('outline');return {message:'Outline layout. Same records and links.',focus:'mode:outline'};},{disabled:s.stale,pressed:s.mode==='outline'}),button('Flower','mode:flower',()=>{session.setMode('flower');return {message:'Flower layout. Same records and links; position has no semantic meaning.',focus:'mode:flower'};},{disabled:s.stale,pressed:s.mode==='flower'}));
  const readSelection=node('a','Read selected explanation ↓','rpa-selection-link');readSelection.href='#'+instance+'-selection';toolbar.append(readSelection);
  add(main,toolbar,node('p','Outline and Flower show the same parts of the open record. Flower is a circular arrangement of supplied records, not the full nested Noetic Flower. Position does not mean likelihood or elapsed time. On small screens, Flower uses a readable list.','rpa-caption'));
  const nav=node('nav');nav.setAttribute('aria-label','Inspection scope breadcrumbs');const crumbs=node('ol',undefined,'rpa-breadcrumbs');
  s.scopePath.forEach((id,i)=>{const li=node('li');li.append(button(label(nodes.get(id)),'crumb:'+i,()=>{session.returnTo(i);page=0;return {message:'Inspection scope: '+nodes.get(id).label+'. Current state unchanged.',focus:'crumb:'+i};},{disabled:s.stale}));if(i===s.scopePath.length-1)li.firstChild.setAttribute('aria-current','location');crumbs.append(li);});nav.append(crumbs);main.append(nav);
  add(main,node('h3','Inside: '+label(scope)),node('p','Enter part follows a contains_part link: a named part of this record. Use the path above to return. Other supplied records remain available in the list below and the full relationship table.','rpa-caption'));
  const others=localParts(s.scopeNodeId),pages=Math.max(1,Math.ceil(others.length/6));page=Math.min(page,pages-1);
  const visible=[scope,...others.slice(page*6,page*6+6)];
  const list=node('ol',undefined,'rpa-node-list '+(s.mode==='flower'?'rpa-flower':'rpa-outline'));list.setAttribute('aria-label','Atlas records');list.dataset.rpaNodeCount=String(visible.length);
  const centers=visible.map((n,i)=>i===0?{x:50,y:50}:{x:50+35*Math.cos((i-1)/(visible.length-1)*2*Math.PI-Math.PI/2),y:50+37*Math.sin((i-1)/(visible.length-1)*2*Math.PI-Math.PI/2)});
  if(s.mode==='flower'){
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');svg.classList.add('rpa-flower-lines');
   for(const l of record.atlas.links){const from=visible.findIndex(n=>n.node_id===l.source_id),to=visible.findIndex(n=>n.node_id===l.target_id);if(from<0||to<0)continue;const line=document.createElementNS(svg.namespaceURI,'line');for(const [k,v]of Object.entries({x1:centers[from].x,y1:centers[from].y,x2:centers[to].x,y2:centers[to].y}))line.setAttribute(k,String(v));line.dataset.relation=l.relation;svg.append(line);}const decoration=node('li',undefined,'rpa-flower-decoration');decoration.setAttribute('aria-hidden','true');decoration.setAttribute('role','presentation');decoration.append(svg);list.append(decoration);
  }
  visible.forEach((n,i)=>{
   const li=node('li',undefined,'rpa-node');li.dataset.nodeId=n.node_id;li.style.setProperty('--rpa-x',centers[i].x+'%');li.style.setProperty('--rpa-y',centers[i].y+'%');
   if(n.node_id===s.focusNodeId)li.classList.add('is-focused');if(n.node_id===s.currentStateId)li.classList.add('is-current');
   li.dataset.rpaColor=presentation(n).color;
   const b=button(label(n),'inspect:'+n.node_id,()=>inspect(n.node_id),{disabled:s.stale,pressed:n.node_id===s.focusNodeId,aria:'Inspect '+n.label+'; '+n.node_id});b.classList.add('rpa-node-select');
   const ident=node('code',short(n.node_id));ident.title=n.node_id;
   add(li,b,node('span',compiled?'Named in the compiled description':'Source labels this: '+n.status,'rpa-source-status'));
   if(record.atlas.links.some(l=>l.relation==='contains_part'&&l.source_id===s.scopeNodeId&&l.target_id===n.node_id))li.append(button('Enter part','enter:'+n.node_id,()=>{session.enter(n.node_id);page=0;return {message:'Entered part '+n.label+'. Current state unchanged.',focus:'crumb:'+(s.scopePath.length)};},{disabled:s.stale,aria:'Enter part '+n.label}));
   if(n.status==='hypothetical')li.append(button('Select proposal','hypothesis:'+n.node_id,()=>{session.selectHypothesis(n.node_id);return {message:'Hypothetical proposal selected. Focus and current state unchanged.',focus:'hypothesis:'+n.node_id};},{disabled:s.stale,pressed:n.node_id===s.hypothesisBranchId}));
   list.append(li);
  });main.append(list);
  const pager=node('div',undefined,'rpa-toolbar');
  add(pager,button('Previous records','page:previous',()=>{page--;return {message:'Previous record page.',focus:'page:previous'};},{disabled:s.stale||page===0}),node('span','Page '+(page+1)+' of '+pages+' · '+others.length+' direct part(s)'),button('Next records','page:next',()=>{page++;return {message:'Next record page.',focus:'page:next'};},{disabled:s.stale||page===pages-1}));main.append(pager);
  const catalog=node('details');add(catalog,node('summary','Browse all '+record.atlas.nodes.length+' supplied records'));const catalogList=node('div',undefined,'rpa-catalog');for(const n of record.atlas.nodes)catalogList.append(button(label(n),'catalog:'+n.node_id,()=>({...inspect(n.node_id),focus:'catalog:'+n.node_id}),{disabled:s.stale}));catalog.append(catalogList);main.append(catalog);
  if(others.length===0)main.append(node('p','No smaller parts are supplied for this record. That does not mean smaller parts are impossible.','rpa-caption'));
  const selectionTitle=node('h3',label(selected));selectionTitle.dataset.rpaColor=presentation(selected).color;selectionTitle.id=instance+'-selection';add(inspector,node('p','SELECTED RECORD','rpa-eyebrow'),selectionTitle);
  inspector.append(node('p',presentation(selected).meaning));
  if(selected.status==='hypothetical'){
   inspector.append(node('p','This is a proposed next step from the saved source. Selecting it changes the proposal handle only; it does not carry out the action.'));
   inspector.append(button('Select this proposed next step','detail-hypothesis:'+selected.node_id,()=>{session.selectHypothesis(selected.node_id);return {message:'Proposal selected for inspection only. Recorded present and focus unchanged.',focus:'detail-hypothesis:'+selected.node_id};},{disabled:s.stale,pressed:selected.node_id===s.hypothesisBranchId}));
  }

  const attached=!s.stale&&story?.entries.find(item=>item.nodeId===selected.node_id);
  if(attached){const authored=node('aside',undefined,'rpa-authored');add(authored,node('strong','Authored example — '+story.title),node('blockquote',attached.text),node('p',attached.explanation));inspector.append(authored);}
  else if(s.stale)inspector.append(node('p','This is an old record. Its authored story is hidden because the editor or accepted result changed. Load a fresh result before inspecting.','rpa-caption'));
  else if(compiled)inspector.append(node('p','No authored story is attached to this result. The labels come from the compiler notation.','rpa-caption'));
  const technical=node('details');technical.className='rpa-technical';add(technical,node('summary','Technical record fields and source evidence'));
  const dl=node('dl');pair(dl,'Node ID',selected.node_id);pair(dl,'Canonical idea ID',selected.idea_id);pair(dl,'Kind',selected.kind);pair(dl,record.source.kind==='compiler_structure'?'Data class':'Imported status',record.source.kind==='compiler_structure'?'Derived compiler structure; source status not supplied':selected.status);pair(dl,'Profile / basis','UNASSIGNED');pair(dl,'Expansion generator','NOT_SUPPLIED');
  technical.append(dl);add(technical,node('h4','Declared fields'));const fields=node('dl');for(const [k,v]of selected.fields)pair(fields,k,v);if(!selected.fields.length)fields.append(node('p','No declared fields.'));technical.append(fields);
  fieldDetails(technical,'Context and source version',selected.context);
  fieldDetails(technical,'Finite members',selected.members);
  fieldDetails(technical,'Retained evidence references',selected.evidence_refs);
  add(technical,node('h4','Authenticated replay evidence'),node('p','Not supplied or verified by this inspector. A source status such as observed or verified remains an imported assertion.'));
  const incident=record.atlas.links.filter(l=>l.source_id===selected.node_id||l.target_id===selected.node_id);fieldDetails(technical,'Exact incident link records ('+incident.length+')',incident);
  inspector.append(technical);
  add(layout,main,inspector);fragments.append(layout);
  const relations=node('details',undefined,'rpa-relations');add(relations,node('summary','All supplied relationships — parts, refinements and actions'),node('p','contains_part is structure; refines_state is specificity; reachable_via needs its explicit action and retained status. A candidate is hypothetical and has no execution authority.'));
  const table=node('table'),caption=node('caption','All '+record.atlas.links.length+' supplied relations — unchanged across layouts');table.append(caption);
  const head=node('tr');['Relation','Source → target','Declared meaning','Action / evidence status'].forEach(t=>{const th=node('th',t);th.scope='col';head.append(th);});table.append(add(node('thead'),head));const body=node('tbody');
  for(const l of record.atlas.links){const row=node('tr');row.dataset.linkId=l.link_id;const target=node('td');add(target,node('span',nodes.get(l.source_id).label+' → '),button(nodes.get(l.target_id).label,'link:'+l.link_id,()=>({...inspect(l.target_id),focus:'link:'+l.link_id}),{disabled:s.stale}));add(row,node('td',l.relation),target,node('td',meanings[l.relation]),node('td',l.action_id?l.action_id+' · '+l.transition_status+' · '+l.evidence_refs.length+' retained reference(s)':l.projection??'Declared contextual relation'));body.append(row);}table.append(body);relations.append(table);fragments.append(relations);
  const retained=node('details',undefined,'rpa-retained');add(retained,node('summary','Original source and technical history'),node('p',record.source.kind==='compiler_structure'?'This record preserves the exact source request and original compiler diagram. Its coordinate parts do not establish an actual current state or execution history.':'This source contains the supplied current handle, context, event claims, and proposal hints. Display checks compare their structure and identities. They do not replay the native machine.'));
  fieldDetails(retained,'Original source record — exact parsed fields',record.original);
  fieldDetails(retained,'Source metadata, retained events, and proposal hints',record.metadata);
  if(s.hypothesisBranchId!==null)retained.append(button('Clear proposal selection','hypothesis:clear',()=>{session.selectHypothesis(null);return {message:'Hypothetical selection cleared. Current state and inspection focus unchanged.',focus:'mode:'+s.mode};},{disabled:s.stale}));
  fragments.append(retained);
  content.replaceChildren(fragments);
  live.textContent=s.stale?s.staleReason:message;
  if(restore){const b=[...outer.querySelectorAll('[data-rpa-control]')].find(el=>el.dataset.rpaControl===restore);if(b&&!b.disabled)b.focus({preventScroll:true});}
 }
 function onKey(e){
  if(e.key==='Escape'&&session.state().scopePath.length>1&&!session.state().stale){e.preventDefault();const index=session.state().scopePath.length-2;session.returnTo(index);page=0;render('Returned one inspection scope. Current state unchanged.','crumb:'+index);}
  if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)&&e.target.matches('.rpa-node-select')){
   const b=[...outer.querySelectorAll('.rpa-node-select:not(:disabled)')],i=b.indexOf(e.target);e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?b.length-1:(i+(e.key==='ArrowRight'?1:-1)+b.length)%b.length;b[next]?.focus();
  }
 }
 outer.addEventListener('keydown',onKey);render();
 return Object.freeze({session,refresh(){render();},invalidate(reason){session.invalidate(reason);render();},exportSource(){return originalBytes(record);},destroy(){destroyed=true;outer.removeEventListener('keydown',onKey);outer.remove();}});
}

/** Preferred host lifecycle API; validationContext comes from trusted integration code. */
export function createRpaInspector({container,onNotice}){
 if(!(container instanceof HTMLElement))throw new TypeError('container must be an HTMLElement');
 let mounted=null,destroyed=false;
 return Object.freeze({
  setRecord(record,validationContext={}){
   if(destroyed)throw new Error('Inspector has been destroyed.');
   mounted?.destroy();mounted=null;
   mounted=mountRpaInspector({host:container,record,getSourceRevision:validationContext.getSourceRevision,onInspect:event=>{if(typeof onNotice==='function')onNotice({kind:'inspection',source:event.source,inspection:event.inspection});}});
   return mounted.session.state();
  },
  clear(){mounted?.destroy();mounted=null;},
  invalidate(reason){mounted?.invalidate(reason);},
  destroy(){mounted?.destroy();mounted=null;destroyed=true;}
 });
}
