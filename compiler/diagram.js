const {mountCubeFaceInspector}=CASCubeFaces;
// The sandbox has an opaque execution origin, but its document URL still names
// the company origin. Never trust a referrer, first message, or payload origin.
const companyOrigin = new URL(location.href).origin;
const validCompanyOrigin = /^https?:$/.test(location.protocol);
function notifyParent(message){if(validCompanyOrigin)parent.postMessage(message,companyOrigin);}
const canvas=document.getElementById('canvas');
let sceneBudget=null,layoutQueued=false;
let cleanupAnnotations=()=>{},controlAdapter=null,currentGeneration=null;
function clearDiagram(){controlAdapter?.destroy();controlAdapter=null;currentGeneration=null;cleanupAnnotations();cleanupAnnotations=()=>{};canvas.querySelectorAll('svg[data-cas-cubes]').forEach(svg=>svg.dispatchEvent(new Event('cas-dispose')));canvas.replaceChildren();}
function updateSceneHeight(){
  const svg=canvas.querySelector('.cas-scene-svg');if(!svg||!sceneBudget)return;
  const chrome=canvas.getBoundingClientRect().height-svg.getBoundingClientRect().height;
  const height=sceneBudget.sceneHeight??Math.min(1400,Math.max(480,sceneBudget.height-chrome));
  const value=`${Math.round(height)}px`;if(canvas.style.getPropertyValue('--cas-scene-height')!==value)canvas.style.setProperty('--cas-scene-height',value);
}
function queueLayout(){if(layoutQueued)return;layoutQueued=true;requestAnimationFrame(()=>{layoutQueued=false;updateSceneHeight();notifyParent({type:'diagram-height',height:Math.ceil(canvas.getBoundingClientRect().height)+2,viewportWidth:innerWidth});});}
addEventListener('message', event => {
  if(!validCompanyOrigin || event.source !== parent || event.origin !== companyOrigin || !event.data || typeof event.data !== 'object') return;
  if(event.data.type==='diagram-control'&&event.data.generation===currentGeneration){if(event.data.command&&typeof event.data.command==='object')controlAdapter?.command(event.data.command);return;}
  if(event.source === parent && event.data?.type === 'diagram-space' && Number.isFinite(event.data.height) && event.data.height>=0 && event.data.height<=10000 && (event.data.sceneHeight===null || Number.isFinite(event.data.sceneHeight)&&event.data.sceneHeight>=170&&event.data.sceneHeight<=800)){sceneBudget=event.data;updateSceneHeight();return;}
  if(event.source === parent && event.data?.type === 'clear-diagram') {clearDiagram();return;}
  if (event.source !== parent || event.data?.type !== 'diagram' || typeof event.data.svg !== 'string' || event.data.svg.length > 2097152) return;
  if (!Number.isSafeInteger(event.data.generation) || event.data.generation < 0) return;
  const root = CASDiagramSanitizer.sanitize(event.data.svg);
  if (!root) return;
  clearDiagram();canvas.append(root);
  mountCubeControls();
  currentGeneration=event.data.generation;
  controlAdapter=mountDiagramControlAdapter({canvas,generation:currentGeneration,onState:state=>notifyParent({type:'diagram-controls',generation:currentGeneration,state}),onInteract:()=>notifyParent({type:'diagram-interact'})});
  cleanupAnnotations=mountCubeFaceInspector({canvas,records:event.data.faceRecords});
  queueLayout();
});
notifyParent({type:'diagram-ready'});
new ResizeObserver(queueLayout).observe(canvas);
