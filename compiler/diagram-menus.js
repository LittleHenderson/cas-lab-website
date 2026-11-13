// Presentation controls. Commands go only to the current diagram's existing renderer.
export function createDiagramMenus({root,onCommand}) {
  const categories=[
    ['view','View','<button data-view="cubes">3D cubes</button><button data-view="map">2D map</button>'],
    ['drag','Drag','<p>Choose what dragging does.</p><button data-mode="scene">Whole structure</button><button data-mode="cube">One cube</button><button data-mode="pan">Pan view</button>'],
    ['rotate','Rotate','<p>Turn the whole view. For one cube, use Drag → One cube or its arrow keys.</p><details><summary>Turn</summary><div><button data-command="left" data-orbit>Turn left</button><button data-command="right" data-orbit>Turn right</button></div></details><details><summary>Tilt</summary><div><button data-command="up" data-orbit>Tilt up</button><button data-command="down" data-orbit>Tilt down</button></div></details><details><summary>Twist</summary><div><button data-command="twist-left">Twist left</button><button data-command="twist-right">Twist right</button></div></details>'],
    ['zoom','Zoom','<button data-command="zoom-out">− Zoom</button><button data-command="zoom-in">+ Zoom</button><button data-command="fit">Fit all</button>'],
    ['reset','Reset','<p>Changes the diagram view only. Your code and result stay intact.</p><button data-command="reset">Reset view</button><button data-command="reset-cube">Reset selected cube</button><p class="selection-note"></p>']
  ];
  let opened=null,state=null,available=false;
  const entries=[];
  function close(restore=false){
    if(!opened)return;const entry=opened;opened=null;
    entry.panel.hidePopover();entry.trigger.setAttribute('aria-expanded','false');
    entry.panel.querySelectorAll('details').forEach(d=>d.open=false);
    if(restore&&!entry.trigger.disabled)entry.trigger.focus({preventScroll:true});
  }
  function position(){
    if(!opened)return;const {panel,trigger}=opened,b=trigger.getBoundingClientRect();
    panel.style.maxHeight=Math.max(100,innerHeight-24)+'px';
    const p=panel.getBoundingClientRect();
    panel.style.left=Math.max(12,Math.min(b.left,innerWidth-p.width-12))+'px';
    const below=b.bottom+6;
    panel.style.top=Math.max(12,Math.min(below,innerHeight-p.height-12))+'px';
  }
  function open(entry){
    if(!available)return;if(opened===entry){close(true);return;}close();opened=entry;
    entry.trigger.setAttribute('aria-expanded','true');entry.panel.showPopover();position();
    entry.panel.querySelector('button:not(:disabled),summary')?.focus({preventScroll:true});
  }
  for(const [id,label,content] of categories){
    const trigger=document.createElement('button'),panel=document.createElement('div');
    trigger.type='button';trigger.className='diagram-menu-trigger';trigger.dataset.menu=id;
    trigger.textContent=label+' ▾';trigger.disabled=true;trigger.setAttribute('aria-expanded','false');
    panel.id='diagram-menu-'+id;panel.className='diagram-menu-popover';panel.setAttribute('popover','manual');panel.setAttribute('role','dialog');panel.setAttribute('aria-label',label+' controls');
    trigger.setAttribute('aria-controls',panel.id);trigger.setAttribute('aria-haspopup','dialog');
    panel.innerHTML='<div class="menu-heading"><strong>'+label+'</strong><button type="button" data-close aria-label="Close '+label+' controls">×</button></div>'+content;
    const entry={id,label,trigger,panel};entries.push(entry);root.append(trigger,panel);
    trigger.addEventListener('click',()=>open(entry));
    trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();open(entry);}});
    panel.querySelector('[data-close]').addEventListener('click',()=>close(true));
    panel.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',position));
    panel.addEventListener('click',e=>{
      const button=e.target.closest('button');if(!button||button.disabled)return;
      const kind=button.dataset.view?'view':button.dataset.mode?'mode':button.dataset.command?'action':null;
      if(!kind)return;onCommand({kind,value:button.dataset.view||button.dataset.mode||button.dataset.command});
      if(kind!=='action'||button.dataset.command.startsWith('reset'))close(true);
    });
    panel.addEventListener('keydown',e=>{
      if(e.key!=='Escape')return;e.preventDefault();e.stopPropagation();
      const nested=e.target.closest('details[open]');
      if(nested){nested.open=false;nested.querySelector('summary').focus();position();}else close(true);
    });
  }
  const pointer=e=>{if(opened&&!opened.panel.contains(e.target)&&e.target!==opened.trigger)close();};
  const focus=e=>{if(opened&&!opened.panel.contains(e.target)&&e.target!==opened.trigger)close();};
  const escape=e=>{if(e.key==='Escape'&&opened){e.preventDefault();close(true);}};
  const blur=()=>{if(document.activeElement?.tagName==='IFRAME')close();};
  document.addEventListener('pointerdown',pointer,true);document.addEventListener('focusin',focus);
  document.addEventListener('keydown',escape);addEventListener('resize',position);addEventListener('scroll',position,true);addEventListener('blur',blur);
  const caption=document.createElement('p');caption.className='diagram-current';caption.setAttribute('role','status');root.parentElement.append(caption);
  function update(next){
    state=next;available=Boolean(next?.available);entries.forEach(e=>e.trigger.disabled=!available);
    for(const key of ['view','mode','zoom','selected','orbit','pan']){
      if(available&&next[key]!=null)root.dataset[key]=String(next[key]);else delete root.dataset[key];
    }
    if(!available){close();caption.textContent=next?.message||'Run code to use the diagram controls.';return;}
    const view=next.view==='map'?'2D map':'3D cubes',mode={scene:'Whole structure',cube:'One cube',pan:'Pan view'}[next.mode]||'Whole structure';
    entries.find(e=>e.id==='view').trigger.title=view;
    entries.find(e=>e.id==='drag').trigger.title=next.view==='map'?'Pan view (map)':mode;
    entries.find(e=>e.id==='zoom').trigger.title=Math.round(next.zoom*100)+'%';
    root.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===next.view)));
    root.querySelectorAll('[data-mode]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.mode===(next.view==='map'?'pan':next.mode)));b.disabled=next.view==='map'&&b.dataset.mode!=='pan';});
    root.querySelectorAll('[data-orbit]').forEach(b=>b.disabled=next.view==='map');
    root.querySelector('[data-command="reset-cube"]').disabled=!next.selected||next.view==='map';
    root.querySelector('.selection-note').textContent=next.view==='map'?'Select 3D cubes to reset a selected cube.':next.selected?'Selected: '+next.selectedLabel:'Select a cube first.';
    caption.textContent=view+' · Drag: '+(next.view==='map'?'Pan view (map)':mode)+' · Selected: '+(next.selectedLabel||'none')+' · '+Math.round(next.zoom*100)+'% zoom'+(next.notice?' · '+next.notice:'');
    caption.title=caption.textContent;position();
  }
  update(null);
  return {update,close,getState:()=>state,destroy(){close();document.removeEventListener('pointerdown',pointer,true);document.removeEventListener('focusin',focus);document.removeEventListener('keydown',escape);removeEventListener('resize',position);removeEventListener('scroll',position,true);removeEventListener('blur',blur);root.replaceChildren();caption.remove();}};
}
