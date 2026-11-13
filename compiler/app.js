import {WorkspaceHistory, WORKSPACE_FIELDS, FIELD_LABELS, exampleKey, sameFields} from './workspace-state.js';
import {createLessonTeaching, getLessonContext} from './lesson-teaching.js';
import {prepareCubeFaces} from './prepare-cube-faces.js';
import {exportDiagramHTML} from './diagram-export.js';
import {createExampleDrawer} from './example-drawer.js';
import {createDiagramMenus} from './diagram-menus.js';
import {PROFESSIONAL_EXAMPLES} from './professional-data.js';
import {createInspectionWorkspace} from './inspection-workspace.js';
import {createOptionalInversion} from './optional-inversion.js';
import {createOptionalRpa} from './optional-rpa.js';
const $ = id => document.getElementById(id);
let inspectionWorkspace = null, optionalInversion = null, optionalRpa = null;
function refreshInspection() { inspectionWorkspace?.refresh(); optionalInversion?.refresh(); optionalRpa?.refresh(); }
const bytes = text => new TextEncoder().encode(text).length;
let worker, ready = false, loading = false, active = null, bootTimer, runTimer, revision = 0, nextId = 0;
let resultRequestFields = null, resultRequestId = null;
let result = null, currentView = 'diagram', reference = null, frameReady = false, initial = true;
let highlightTimer, highlightedParts=[];
const workspaceHistory = new WorkspaceHistory();
let workspaceTouched = false, resultLessonContext = null, resultFaceRecords = [];
const teachingController = createLessonTeaching({container:$('lesson-teaching'),onLoadLesson:loadLesson});
const lookupLesson = getLessonContext;
const exampleDrawer=createExampleDrawer({root:$('editor-layout'),dialog:$('example-drawer'),toggle:$('examples-toggle'),source:$('source'),onSelect:loadExample,onRetry:loadReference});
let referenceAttempt=0;
function readWorkspaceFields() {
  return Object.fromEntries(WORKSPACE_FIELDS.map(key => [key, $(key).value]));
}
function workspaceUI() {
  return {view:currentView, selectionStart:$('source').selectionStart,
    selectionEnd:$('source').selectionEnd, selectionDirection:$('source').selectionDirection,
    scrollTop:$('source').scrollTop, scrollLeft:$('source').scrollLeft,
    modulesOpen:$('modules-panel').open,
    syntaxOpen:document.querySelector('.syntax-legend').open};
}
function applyWorkspaceFields(fields) {
  for (const key of WORKSPACE_FIELDS) $(key).value = fields[key];
  modeChanged();
}
function refreshWorkspacePresentation() {
  const state = workspaceHistory.status(readWorkspaceFields());
  const origin = state.origin;
  $('example-state').textContent = state.pristine ? 'Original authored example' : origin ? 'Edited input' : 'Your input';
  $('example-provenance').dataset.state = state.pristine ? 'authored' : 'edited';
  $('example-context-title').textContent = origin
    ? (state.pristine ? 'Authored example: ' : 'Original example — reference only: ') + origin.name
    : 'Write your own input';
  $('example-note').textContent = origin?.description ?? 'Choose an example or write CAS. No authored story is associated with this input.';
  $('open-teaching').hidden = !lookupLesson(origin?.lessonId);
  $('example-validity').textContent = state.pristine
    ? 'This input matches the original example. Its authored description applies to this input.'
    : origin
      ? 'The original story below is reference material; it does not describe your edited input.' +
        (state.changedFields.length ? ' Changed: ' + state.changedFields.map(key => FIELD_LABELS[key]).join(', ') + '.' : ' Reload the example to use its authored interpretation.')
      : 'Your input has no authored interpretation.';
  const selectedIndex = origin && reference?.examples.findIndex(e => exampleKey(e) === origin.key);
  $('examples').value = state.pristine && selectedIndex >= 0 ? String(selectedIndex) : 'custom';
  exampleDrawer.setCurrent(state.pristine && selectedIndex >= 0 ? selectedIndex : null);
  $('example-current').textContent=origin?(state.pristine?'Example: ':'Edited input from: ')+origin.name:'Your input';
  $('example-current').title=$('example-current').textContent;
  const custom = $('examples').querySelector('option[value="custom"]');
  if (custom) custom.textContent = origin ? 'Edited input — from ' + origin.name : 'Your input';
  $('restore-workspace').disabled = !state.canRestore;
  $('restore-note').textContent = state.canRestore
    ? 'Your workspace before loading “' + state.replacedBy + '” is kept in this tab. Restore it in one step.'
    : 'Example loads keep one previous workspace in this tab. Reloading the page clears it.';
  teachingController?.update({lessonId:origin?.lessonId ?? null,pristine:state.pristine,changedFields:state.changedFields});
  refreshInspection();
}
function refreshFieldDisplays() {
  $('source-size').textContent = (bytes($('source').value)/1024).toFixed(1)+' / 64 KiB';
  try {$('module-count').textContent = '('+Object.keys(JSON.parse($('modules').value)).length+')';}
  catch {$('module-count').textContent = '(invalid JSON)';}
  colorSource();
  refreshWorkspacePresentation();
}
// Accepted compiler results keep the complete request snapshot for inspection.
function currentInspectionResult() {
  if (result?.artifact?.valid !== true || active || !resultRequestFields || !sameFields(resultRequestFields,readWorkspaceFields())) return null;
  return {artifact:result.artifact,fields:resultRequestFields,generation:resultRequestId,lessonContext:resultLessonContext};
}
function authoredContextForRun() {
  const state = workspaceHistory.status(readWorkspaceFields());
  if (!state.pristine || !state.origin?.lessonId) return null;
  const lesson = lookupLesson(state.origin.lessonId);
  return lesson && lesson.source === $('source').value ? structuredClone(lesson) : null;
}
function restoreWorkspace() {
  if (!workspaceHistory.previous) return;
  if (active) stop('Previous run cancelled before workspace restore.');
  const saved = workspaceHistory.restore();
  initial = false; workspaceTouched = true; revision++;
  applyWorkspaceFields(saved.fields);
  currentView = saved.ui.view ?? 'diagram';
  $('modules-panel').open = Boolean(saved.ui.modulesOpen);
  document.querySelector('.syntax-legend').open = Boolean(saved.ui.syntaxOpen);
  clearOutput('Previous workspace restored. Run again to produce a new result.');
  refreshFieldDisplays(); renderView();
  $('source').setSelectionRange(saved.ui.selectionStart ?? 0,saved.ui.selectionEnd ?? 0,saved.ui.selectionDirection ?? 'none');
  $('source').scrollTop = saved.ui.scrollTop ?? 0;
  $('source').scrollLeft = saved.ui.scrollLeft ?? 0;
  $('workspace-notice').textContent = 'Previous workspace restored, including its input fields and original-example status. Run again when ready.';
  exampleDrawer.focusEditor();
}

const syntaxMeaning={cyan:'Noetic operator',emerald:'Domain',amber:'Drive',fuchsia:'Register',pink:'Recipe or fractal marker',purple:'Yield query or RPM',orange:'Target, recipe modifier or multiplicative operator',violet:'Set or constructor',teal:'Set operation',white:'Transition',slate_500:'Delimiter',slate_300:'Plain notation or punctuation'};
function plainHighlight() {$('source-highlight').textContent=$('source').value+'\n';highlightedParts=[];$('syntax-at-cursor').textContent=$('language').value==='cas'?'Colors follow the original CAS terminal; they do not validate the code.':'CCDL is shown as plain text; the CAS syntax palette does not apply.';}
function colorSource() {clearTimeout(highlightTimer);plainHighlight();if(!ready||active||$('language').value!=='cas')return;highlightTimer=setTimeout(()=>worker?.postMessage({type:'highlight',revision,source:$('source').value}),100);}
function cursorMeaning() {let offset=0;for(const p of highlightedParts){offset+=p.text.length;if(offset>$('source').selectionStart){$('syntax-at-cursor').textContent=`At cursor: ${p.text.trim()||'space'} — ${syntaxMeaning[p.category]??'Plain notation'}`;return;}}}
function receiveHighlight(data){if(data.revision!==revision||$('language').value!=='cas')return;if(data.limited){$('syntax-at-cursor').textContent='Live colors pause above 16 KiB. Compilation still accepts up to 64 KiB.';return;}highlightedParts=data.parts;const fragment=document.createDocumentFragment();for(const p of data.parts){const span=document.createElement('span');span.textContent=p.text;span.style.color=p.color;if(p.bold)span.style.fontWeight='700';fragment.append(span);}fragment.append(document.createTextNode('\n'));$('source-highlight').replaceChildren(fragment);cursorMeaning();}
const frame = $('diagram');
let diagramGeneration=0,sentDiagram=null,diagramState=null,diagramNotice='';
const diagramMenus=createDiagramMenus({root:$('diagram-menu-host'),onCommand:command=>{
  if(!result?.svg||frame.hidden||!diagramState?.available)return;
  diagramNotice='';frame.contentWindow.postMessage({type:'diagram-control',generation:diagramGeneration,command},'*');
}});
frame.src = './diagram.html?v=16';
let diagramLayoutQueued=false;
function queueDiagramLayout(){
  if(diagramLayoutQueued)return;diagramLayoutQueued=true;
  requestAnimationFrame(()=>{
    diagramLayoutQueued=false;
    const wrap=document.querySelector('.editor-wrap'),area=$('result-area');
    const narrow=matchMedia('(max-width:760px)').matches;
    // Align the actual input and scene surfaces, accounting for wrapping controls.
    const inputTop=wrap.getBoundingClientRect().top-(parseFloat(wrap.style.marginTop)||0);
    const viewerTop=area.getBoundingClientRect().top+parseFloat(getComputedStyle(area).borderTopWidth)-(parseFloat(area.style.marginTop)||0);
    const target=Math.max(inputTop,viewerTop+10);
    const inputMargin=narrow?0:Math.max(0,target-inputTop);
    const viewerMargin=narrow?10:Math.max(10,target-viewerTop);
    if(wrap.style.marginTop!==inputMargin+'px')wrap.style.marginTop=inputMargin+'px';
    if(area.style.marginTop!==viewerMargin+'px')area.style.marginTop=viewerMargin+'px';
    if(!frameReady||frame.hidden)return;
    const sceneHeight=narrow?Math.round(Math.min(420,Math.max(300,innerHeight*.45))):Math.round($('source').getBoundingClientRect().height);
    frame.contentWindow.postMessage({type:'diagram-space',height:sceneHeight,sceneHeight},'*');
  });
}
const diagramLayoutObserver=new ResizeObserver(queueDiagramLayout);
diagramLayoutObserver.observe(document.querySelector('.editor-panel'));
diagramLayoutObserver.observe(document.querySelector('.output-panel'));
diagramLayoutObserver.observe($('source'));
addEventListener('resize',queueDiagramLayout);
addEventListener('message', event => {
  if(event.source!==frame.contentWindow)return;
  const data=event.data;
  if(data?.type==='diagram-controls'&&data.generation===diagramGeneration&&result?.svg){
    diagramState=data.state;diagramMenus.update({...diagramState,available:diagramState.available&&!frame.hidden,notice:diagramNotice});
  }
  if(data?.type==='diagram-interact')diagramMenus.close();
  if(data?.type==='diagram-height'&&Number.isFinite(data.height)&&data.height>0){
    const width=data.viewportWidth;
    const scale=Number.isFinite(width)&&width>0?Math.min(4,Math.max(.25,frame.clientWidth/width)):1;
    const value=`${Math.min(12000,Math.max(170,Math.ceil(data.height*scale)))}px`;
    if(frame.style.height!==value)frame.style.height=value;
    queueDiagramLayout();
  }
  if(data?.type==='diagram-ready'){frameReady=true;sentDiagram=null;sendDiagram();}
});
function sendDiagram(){
  if(!frameReady||!result?.svg)return;
  if(sentDiagram!==result){
    sentDiagram=result;diagramNotice='New diagram: view and drag reset.';
    frame.contentWindow.postMessage({type:'diagram',generation:diagramGeneration,svg:result.svg,faceRecords:resultFaceRecords},'*');
  }else if(diagramState)diagramMenus.update({...diagramState,available:true,notice:diagramNotice});
  queueDiagramLayout();
}
function status(text, state = '') {$('outcome').textContent=text; $('outcome').dataset.state=state;$('editor-run-status').textContent=text;$('editor-run-status').dataset.state=state;}
function controls() {
  $('rpa-run').disabled=loading || Boolean(active);
  $('rpa-load-story').disabled=$('rpa-load-alternative').disabled=!reference;
  $('run').disabled=loading || Boolean(active);
  $('run').textContent=loading ? 'Loading…' : $('mode').value==='simulate' ? 'Run simulation' : 'Run compiler';
  $('cancel').disabled=!(active || loading);
}
function clearOutput(message='Input changed. Run again.') {
  $('rpa-guide-progress').textContent=message;
  result=null; resultRequestFields=null; resultRequestId=null; resultLessonContext=null; resultFaceRecords=[];
  sentDiagram=null;diagramState=null;diagramGeneration++;diagramMenus.update({available:false,message:'Run code to use the diagram controls.'});
  $('view-current-output').hidden=true;
  $('json-output').textContent='';
  if(frameReady) frame.contentWindow.postMessage({type:'clear-diagram'},'*');
  $('download-json').disabled=$('download-svg').disabled=$('download-html').disabled=true;
  $('empty').hidden=false; frame.hidden=true; $('json-output').hidden=true;
  status(message);
  $('result-meaning').textContent='Diagrams show declared or parsed structure. They do not establish a cognitive outcome.';
  refreshInspection();
}
function stop(message='Run cancelled. No partial result kept.') {
  clearTimeout(runTimer); clearTimeout(bootTimer); clearTimeout(highlightTimer);
  worker?.terminate(); worker=null; ready=false; loading=false;
  refreshInspection();
  if(active){active.reject(new Error(message));active=null;}
  clearOutput(message); $('runtime').textContent='Compiler stopped · run to restart'; controls();
}
function edited() {
  initial=false; workspaceTouched=true; revision++;
  workspaceHistory.markEdited();
  if(active) stop('Input changed. Run again.'); else clearOutput();
  refreshFieldDisplays();
}
function boot() {
  loading=true; ready=false; $('runtime').textContent='Loading Python on your device…'; controls();
  worker=new Worker(new URL('./worker.js',import.meta.url),{type:'module'});
  const bootWorker=worker;
  refreshInspection();
  bootTimer=setTimeout(()=>{if(worker===bootWorker) stop('Runtime loading timed out. Check your connection and select Run compiler to retry.');},60000);
  worker.onmessage=({data})=>{
    if(worker!==bootWorker) return;
    if(data.type==='highlight'){receiveHighlight(data);return;}
    if(data.type==='loading') {$('runtime').textContent=data.message;return;}
    if(data.type==='ready') {
      clearTimeout(bootTimer);ready=true;loading=false;$('runtime').textContent=`Python ready · local execution`;controls();colorSource();
      if(active) dispatch(); else if(initial && reference) {initial=false;runCompiler().catch(()=>{});} return;
    }
    if(data.type==='fatal'){stop('Compiler could not load. Select Run compiler to retry.');status(data.message,'error');return;}
    if(!active || data.id!==active.id) return;
    clearTimeout(runTimer);
    const request=active;active=null;controls();
    if(request.revision!==revision || !sameFields(request.fields,readWorkspaceFields())){
      workspaceHistory.markEdited();revision++;
      clearOutput('Input changed during the run. Run again.');refreshFieldDisplays();
      request.reject(new Error('Input changed.'));return;
    }
    if(data.type==='error') {clearOutput();status('Run failed','error');showError(data.message);request.reject(new Error(data.message));return;}
    result=data.result; resultRequestFields=request.fields; resultRequestId=request.id;
    resultLessonContext = result.artifact.valid === true ? request.lessonContext : null;
    let diagramWarning='';
    if(result.svg) {
      try {
        const prepared=prepareCubeFaces({svg:result.svg,diagram:result.artifact.diagram,lessonContext:resultLessonContext});
        result={...result,svg:prepared.svg};resultFaceRecords=prepared.records;
      }catch(error){
        result={...result,svg:''};resultFaceRecords=[];
        diagramWarning=' Diagram unavailable: '+error.message+' Full JSON remains available.';
      }
    }
    colorSource();
    refreshInspection();
    const a=result.artifact;
    status(a.valid ? (a.execution_status==='EXECUTED' ? 'Simulation executed' : a.language==='ccdl' ? (a.structural_status==='PASS'?'Structural checks passed':'Frontend stage passed') : 'Compiled successfully') : 'Compiler rejected this source',a.valid?'success':'error');
    $('download-json').disabled=false;$('download-svg').disabled=$('download-html').disabled=!result.svg;
    $('view-current-output').hidden=false;
    $('result-meaning').textContent=a.language==='ccdl' ? a.execution_status==='EXECUTED' ? 'Executed only the selected bounded model. Read its profile, assumptions and trace in Result.' : 'CCDL validity applies to the selected stage. Structural checks do not establish numerical execution or dynamic stability.' : 'CAS validity means the implemented checks passed. Assertions can be false; recipe yield queries are symbolic.';
    if(!a.valid) currentView='diagnostics';
    else if(request.mode==='lex') currentView='tokens';
    else if(request.mode==='parse') currentView='ast';
    else currentView='diagram';
    if(diagramWarning){$('result-meaning').textContent+=diagramWarning;currentView='full';}
    renderView();
    request.resolve({valid:a.valid,error:a.error,engine:a.engine,execution_status:a.execution_status ?? 'CAS_RUNTIME',result:a.result});
  };
  worker.onerror=event=>{if(worker!==bootWorker)return;stop('Compiler worker failed. Run again to restart.');status(event.message || 'Browser runtime failed.','error');};
}
function showError(message) {
  $('view-current-output').hidden=false;
  $('empty').hidden=true;frame.hidden=true;$('json-output').hidden=false;$('json-output').textContent=message;
}
function getRequest() {
  const source=$('source').value, inputs=$('inputs').value;
  if(bytes(source)>65536) throw Error('Source exceeds 64 KiB.');
  if(bytes(inputs)>65536) throw Error('Simulation inputs exceed 64 KiB.');
  if(bytes($('modules').value)>300000) throw Error('Module JSON is too large.');
  let modules;try{modules=JSON.parse($('modules').value);}catch{throw Error('Module sources must be a valid JSON object.');}
  if(!modules || Array.isArray(modules) || typeof modules!=='object') throw Error('Module sources must be a filename-to-source JSON object.');
  return {source,language:$('language').value,mode:$('mode').value,modules,inputs,steps:Number($('steps').value)};
}
function dispatch() {
  if(!active || !ready)return;
  status('Compiling…');
  runTimer=setTimeout(()=>stop('Run stopped after the 8-second browser limit. Reduce the source or steps and try again.'),8000);
  worker.postMessage({type:'run',id:active.id,request:active.request});
}
function runCompiler() {
  exampleDrawer.beforeRun();
  if(active) return Promise.reject(new Error('A run is already active. Cancel it first.'));
  initial=false;
  if(workspaceHistory.status(readWorkspaceFields()).changedFields.length)workspaceHistory.markEdited();
  refreshWorkspacePresentation();
  let request;try{request=getRequest();}catch(error){clearOutput();status('Input needs attention','error');showError(error.message);return Promise.reject(error);}
  clearOutput('Preparing run…');
  return new Promise((resolve,reject)=>{
    active={id:++nextId,revision,mode:request.mode,request,fields:readWorkspaceFields(),lessonContext:authoredContextForRun(),resolve,reject};controls();
    if(!worker)boot();else if(ready)dispatch();
  });
}
function renderView() {
  for(const button of document.querySelectorAll('.output-tabs [data-view]')){const selected=button.dataset.view===currentView;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;}
  if(!result)return;
  const a=result.artifact;
  $('empty').hidden=true;frame.hidden=currentView!=='diagram'||!result.svg;$('json-output').hidden=!frame.hidden;
  if(!frame.hidden){sendDiagram();return;}
  diagramMenus.update({available:false,message:'Select the Diagram tab to use its controls.'});
  let value;
  if(currentView==='diagram')value={message:'No diagram for this result. Read Diagnostics or the selected frontend stage.'};
  else if(currentView==='diagnostics')value={valid:a.valid,error:a.error,warnings:a.warnings,diagnostics:a.diagnostics ?? [],parse_status:a.parse_status,structural_status:a.structural_status,execution_status:a.execution_status};
  else if(currentView==='full')value=a;
  else if(currentView==='result')value=a.result;
  else if(currentView==='activations')value=a.activations ?? {message:'Register activations apply to CAS, not CCDL.'};
  else value=a[currentView];
  $('json-output').textContent=JSON.stringify(value,null,2) ?? 'No value for this view.';
}
function modeChanged(){
  $('simulation-panel').hidden=$('mode').value!=='simulate';
  document.querySelector('.source-label label').textContent=$('language').value==='ccdl'?'main.ccdl':'main.cas';
  $('modules-panel').hidden=$('language').value!=='cas';controls();
}
function loadExample(index){
  const e=reference?.examples[index];if(!e)return;
  const fields=workspaceHistory.load(e,readWorkspaceFields(),workspaceUI());
  if(active)stop('Previous run cancelled before loading the example.');
  initial=false;workspaceTouched=true;revision++;
  applyWorkspaceFields(fields);
  currentView='diagram';
  clearOutput('Example loaded. Select Run compiler when ready.');
  refreshFieldDisplays();renderView();
  $('workspace-notice').textContent='Loaded '+e.name+'. Your previous workspace can be restored in one step.';
}
function loadLesson(id) {
  const index=reference?.examples.findIndex(e=>e.id===id);
  if(index>=0){loadExample(index);exampleDrawer.close(false);exampleDrawer.focusEditor({resetSelection:true});}
}
function referenceView(){
  if(!reference)return;
  const value=reference[$('reference-view').value];
  $('reference-output').textContent=typeof value==='string'?value:JSON.stringify(value,null,2);
}
inspectionWorkspace = createInspectionWorkspace(() => {
  const fields = readWorkspaceFields(), state = workspaceHistory.status(fields);
  return {fields,ownerRevision:revision,originKey:state.origin?.key ?? null,pristine:state.pristine,
    runtime:worker,selectionStart:$('source').selectionStart,selectionEnd:$('source').selectionEnd};
});
optionalInversion = createOptionalInversion({details:$('inversion-tools'),host:$('inversion-region'),workspace:inspectionWorkspace});
optionalRpa = createOptionalRpa({host:$('rpa-region'),nativeButton:$('rpa-load-native'),compilerButton:$('rpa-load-compiler'),status:$('rpa-load-status'),workspace:inspectionWorkspace,getResult:currentInspectionResult});
for (const [buttonId,lessonId] of [['rpa-load-story','relationships'],['rpa-load-alternative','relationships-variation']]) {
  $(buttonId).addEventListener('click',()=>{
    const index=reference?.examples.findIndex(e=>e.id===lessonId);
    if(index>=0){loadExample(index);$('rpa-guide-progress').textContent='Loaded '+(lessonId==='relationships'?'Maya’s reaction':'Maya’s alternative')+'. Next: Run current editor code.';}
    else $('rpa-guide-progress').textContent='Examples are still loading. Retry the examples loader above if needed.';
  });
}
$('rpa-run').addEventListener('click',async()=>{
  $('rpa-guide-progress').textContent='Running the current editor code…';
  try { await runCompiler(); $('rpa-guide-progress').textContent=currentInspectionResult()?'Compiler accepted the current input. Next: Inspect current compound state. Other input forms may not be supported by this atlas.':'Read the compiler diagnostics above. No valid current result is available.'; }
  catch(error){$('rpa-guide-progress').textContent='Run did not complete: '+error.message;}
});
for (const event of ['select','keyup','pointerup']) $('source').addEventListener(event,refreshInspection);
document.addEventListener('selectionchange',() => { if(document.activeElement === $('source')) refreshInspection(); });

function download(text,mime,name){const url=URL.createObjectURL(new Blob([text],{type:mime}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('download-json').onclick=()=>{if(result)download(JSON.stringify(result.artifact,null,2),'application/json','cas-result.json');};
$('download-svg').onclick=()=>{if(result?.svg)download(result.svg,'image/svg+xml','cas-diagram.svg');};
$('download-html').onclick=()=>{if(result?.svg)download(exportDiagramHTML(result.svg,resultFaceRecords),'text/html','cas-diagram.html');};
$('run').onclick=()=>runCompiler().catch(()=>{});$('cancel').onclick=()=>{initial=false;stop();};
for(const id of ['source','modules','inputs','steps'])$(id).addEventListener('input',edited);
for(const id of ['language','mode'])$(id).addEventListener('change',()=>{modeChanged();edited();});
$('examples').onchange=()=>{if($('examples').value!=='custom')loadExample(Number($('examples').value));};
$('restore-workspace').onclick=restoreWorkspace;
$('return-to-code').onclick=event=>{event.preventDefault();exampleDrawer.focusEditor();};
$('reference-view').onchange=referenceView;
document.querySelectorAll('[data-example]').forEach(button=>button.onclick=()=>{const i=reference?.examples.findIndex(e=>e.name===button.dataset.example);if(i>=0){loadExample(i);exampleDrawer.close(false);exampleDrawer.focusEditor({resetSelection:true});}});
document.querySelectorAll('[data-symbol]').forEach(button=>button.onclick=()=>{const s=$('source');s.setRangeText(button.dataset.symbol,s.selectionStart,s.selectionEnd,'end');s.focus();edited();});
document.querySelectorAll('.output-tabs [data-view]').forEach(button=>{button.onclick=()=>{currentView=button.dataset.view;renderView();};button.onkeydown=event=>{const buttons=[...document.querySelectorAll('.output-tabs [data-view]')];if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let index=buttons.indexOf(button);index=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[index].click();buttons[index].focus();};});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();if(!active)runCompiler().catch(()=>{});}});
function loadReference(){
const attempt=++referenceAttempt;exampleDrawer.loading();
return Promise.all(['./reference.json','./teaching-examples.json'].map(url=>fetch(url).then(r=>{if(!r.ok)throw Error('Reference unavailable.');return r.json();}))).then(([data,lessons])=>{
  if(attempt!==referenceAttempt)return;
  data.examples.push(...lessons,...PROFESSIONAL_EXAMPLES);
  reference=data;$('examples').replaceChildren();const custom=document.createElement('option');custom.value='custom';custom.textContent='Your input';$('examples').append(custom);const groups=new Map();
  data.examples.forEach((e,i)=>{if(!groups.has(e.category)){const group=document.createElement('optgroup');group.label=e.category;groups.set(e.category,group);$('examples').append(group);}const o=document.createElement('option');o.value=String(i);o.textContent=e.name;groups.get(e.category).append(o);});
  exampleDrawer.setExamples(data.examples);
  const defaultIndex=data.examples.findIndex(e=>e.name==='Compound state, Transcendent');
  workspaceHistory.establish(data.examples[defaultIndex],readWorkspaceFields());
  if(workspaceTouched)workspaceHistory.markEdited();
  const params=new URLSearchParams(location.search),lesson=params.get('lesson'),example=params.get('example');
  const requested=data.examples.findIndex(e=>(lesson&&e.id===lesson)||(example&&e.name===example));
  if(requested>=0&&!workspaceTouched)loadExample(requested);
  refreshWorkspacePresentation();referenceView();if(initial&&ready){initial=false;runCompiler().catch(()=>{});}
}).catch(error=>{if(attempt!==referenceAttempt)return;$('example-note').textContent=error.message;exampleDrawer.failed();});
}
loadReference();
$('source-size').textContent=`${(bytes($('source').value)/1024).toFixed(1)} / 64 KiB`;
plainHighlight();
$('source').addEventListener('scroll',()=>{$('source-highlight').scrollTop=$('source').scrollTop;$('source-highlight').scrollLeft=$('source').scrollLeft;});
$('source').addEventListener('click',cursorMeaning);$('source').addEventListener('keyup',cursorMeaning);
boot();

// Optional browser-native agent interface; it uses the same visible editor and run action.
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  try{Promise.resolve(document.modelContext.registerTool({name:'compile_cas_source',title:'Compile CAS source',description:'Replace the visible source editor and compile CAS or CCDL locally; return the actual result. Existing unsaved editor text is replaced.',inputSchema:{type:'object',properties:{source:{type:'string',maxLength:65536},language:{enum:['cas','ccdl']}},required:['source','language'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async input=>{if(!input||typeof input.source!=='string'||bytes(input.source)>65536||!['cas','ccdl'].includes(input.language)||Object.keys(input).some(k=>!['source','language'].includes(k)))throw Error('Supply source text and language cas or ccdl only.');if(active)throw Error('A run is active.');$('source').value=input.source;$('language').value=input.language;$('mode').value='run';$('modules').value='{}';modeChanged();edited();return await runCompiler();}},{signal:lifecycle.signal})).catch(()=>{});}catch{}
  addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
