const {mountCubeFaceInspector}=CASCubeFaces;
// The original 2D renderer applies this shadow filter to each node and label.
// Removing its primitive leaves an empty filter that hides the whole node group.
const allowed = new Set(['svg','style','g','defs','filter','feGaussianBlur','feDropShadow','marker','path','rect','line','polyline','polygon','circle','ellipse','text','tspan','title','desc','metadata']);
const canvas=document.getElementById('canvas');
let sceneBudget=null,layoutQueued=false;
let cleanupAnnotations=()=>{},controlAdapter=null,currentGeneration=null;
function clearDiagram(){controlAdapter?.destroy();controlAdapter=null;cleanupAnnotations();cleanupAnnotations=()=>{};canvas.querySelectorAll('svg[data-cas-cubes]').forEach(svg=>svg.dispatchEvent(new Event('cas-dispose')));canvas.replaceChildren();}
function updateSceneHeight(){
  const svg=canvas.querySelector('.cas-scene-svg');if(!svg||!sceneBudget)return;
  const chrome=canvas.getBoundingClientRect().height-svg.getBoundingClientRect().height;
  const height=sceneBudget.sceneHeight??Math.min(1400,Math.max(480,sceneBudget.height-chrome));
  const value=`${Math.round(height)}px`;if(canvas.style.getPropertyValue('--cas-scene-height')!==value)canvas.style.setProperty('--cas-scene-height',value);
}
function queueLayout(){if(layoutQueued)return;layoutQueued=true;requestAnimationFrame(()=>{layoutQueued=false;updateSceneHeight();parent.postMessage({type:'diagram-height',height:Math.ceil(canvas.getBoundingClientRect().height)+2,viewportWidth:innerWidth},'*');});}
addEventListener('message', event => {
  if(event.source===parent&&event.data?.type==='diagram-control'&&event.data.generation===currentGeneration){controlAdapter?.command(event.data.command);return;}
  if(event.source === parent && event.data?.type === 'diagram-space' && Number.isFinite(event.data.height) && event.data.height>=0 && event.data.height<=10000 && (event.data.sceneHeight===null || Number.isFinite(event.data.sceneHeight)&&event.data.sceneHeight>=170&&event.data.sceneHeight<=800)){sceneBudget=event.data;updateSceneHeight();return;}
  if(event.source === parent && event.data?.type === 'clear-diagram') {clearDiagram();return;}
  if (event.source !== parent || event.data?.type !== 'diagram' || typeof event.data.svg !== 'string' || event.data.svg.length > 2097152) return;
  const documentSvg = new DOMParser().parseFromString(event.data.svg, 'image/svg+xml');
  const root = documentSvg.documentElement;
  if (root.localName !== 'svg' || documentSvg.querySelector('parsererror')) return;
  for (const element of [...root.querySelectorAll('*')]) {
    if (!allowed.has(element.localName)) {element.remove(); continue;}
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase();
      if (name.startsWith('on') || name.includes('href') || name === 'src' || name === 'srcdoc' || /url\(\s*['"]?(?!#)/i.test(attribute.value)) element.removeAttribute(attribute.name);
    }
  }
  for (const attribute of [...root.attributes]) if (attribute.name.toLowerCase().startsWith('on')) root.removeAttribute(attribute.name);
  clearDiagram();canvas.append(document.importNode(root,true));
  mountCubeControls();
  currentGeneration=event.data.generation;
  controlAdapter=mountDiagramControlAdapter({canvas,generation:currentGeneration,onState:state=>parent.postMessage({type:'diagram-controls',generation:currentGeneration,state},'*'),onInteract:()=>parent.postMessage({type:'diagram-interact'},'*')});
  cleanupAnnotations=mountCubeFaceInspector({canvas,records:event.data.faceRecords});
  queueLayout();
});
parent.postMessage({type:'diagram-ready'}, '*');
new ResizeObserver(queueLayout).observe(canvas);
