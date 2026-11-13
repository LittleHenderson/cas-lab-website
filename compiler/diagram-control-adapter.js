// Adapt the renderer's existing buttons; its geometry and interaction code are unchanged.
function mountDiagramControlAdapter({canvas,generation,onState,onInteract}) {
  const svg=canvas.querySelector('svg[data-cas-cubes]'),toolbar=canvas.querySelector('.cas-controls');
  if(!svg||!toolbar){onState({available:false,message:'This result has no interactive cube scene.'});return {command(){},destroy(){}};}
  toolbar.hidden=true;let disposed=false,last='';
  function state(){
    const selected=svg.querySelector('.cas-cube[aria-pressed="true"]');
    return {available:true,view:toolbar.querySelector('[data-view="map"]').getAttribute('aria-pressed')==='true'?'map':'cubes',mode:toolbar.querySelector('select').value,zoom:Number(svg.dataset.sceneZoom)||1,orbit:svg.dataset.sceneOrbit,pan:svg.dataset.scenePan,selected:selected?.dataset.nodeId||null,selectedLabel:selected?.dataset.label||null};
  }
  function publish(){if(disposed)return;const next=state(),encoded=JSON.stringify(next);if(encoded!==last){last=encoded;onState(next);}}
  const observer=new MutationObserver(publish);observer.observe(svg,{subtree:true,attributes:true,attributeFilter:['aria-pressed','data-scene-zoom','data-scene-orbit','data-interaction-mode']});observer.observe(toolbar,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
  const interact=()=>onInteract?.();canvas.addEventListener('pointerdown',interact,true);canvas.addEventListener('focusin',interact);publish();
  const command=({kind,value}={})=>{
    if(disposed)return;const current=state();let button;
    if(kind==='mode'&&['scene','cube','pan'].includes(value)){
      if(current.view==='map'&&value!=='pan')return;
      const select=toolbar.querySelector('select');select.value=value;select.dispatchEvent(new Event('change'));publish();return;
    }
    if(kind==='view'&&['cubes','map'].includes(value))button=toolbar.querySelector('[data-view="'+value+'"]');
    if(kind==='action'&&['left','right','up','down','twist-left','twist-right','zoom-out','zoom-in','fit','reset','reset-cube'].includes(value)){
      if(value==='reset-cube'&&(!current.selected||current.view==='map'))return;
      button=toolbar.querySelector('[data-command="'+value+'"]');
    }
    if(button&&!button.disabled){button.click();publish();}
  };
  return {command,destroy(){disposed=true;observer.disconnect();canvas.removeEventListener('pointerdown',interact,true);canvas.removeEventListener('focusin',interact);}};
}
