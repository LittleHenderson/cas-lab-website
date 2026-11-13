// Presentation only: selection calls the existing workspace loader, never Run.
export function createExampleDrawer({root,dialog,toggle,source,onSelect,onRetry}) {
  const search=dialog.querySelector('input'),list=dialog.querySelector('.example-list');
  const status=dialog.querySelector('[role="status"]'),retry=dialog.querySelector('[data-retry]');
  const closeButton=dialog.querySelector('[data-close]');
  const collectionButtons=[...dialog.querySelectorAll('[data-collection]')];
  const wide=matchMedia('(min-width:1100px)');
  let examples=[],selected=null,isOpen=false,isModal=false,available=false,collection='all';
  const buttons=()=>[...list.querySelectorAll('button[data-example-index]')];
  function focusEditor({resetSelection=false}={}) {
    if(resetSelection){source.setSelectionRange(0,0);source.scrollTop=0;source.scrollLeft=0;}
    source.focus({preventScroll:true});
    root.querySelector('.code-pane').scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
  }
  function markCurrent(){for(const button of buttons()){if(Number(button.dataset.exampleIndex)===selected)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');}}
  function render(){
    list.replaceChildren();if(!available)return;
    const query=search.value.trim().toLocaleLowerCase(),groups=new Map();let count=0;
    examples.forEach((example,index)=>{
      if(collection==='professional'&&!example.category.startsWith('Professional:'))return;
      if(query&&!`${example.name} ${example.category} ${example.language} ${example.description??''} ${(example.tags??[]).join(' ')}`.toLocaleLowerCase().includes(query))return;
      let section=groups.get(example.category);
      if(!section){section=document.createElement('section');const heading=document.createElement('h3');heading.textContent=example.category;section.append(heading);list.append(section);groups.set(example.category,section);}
      const button=document.createElement('button');button.type='button';button.dataset.exampleIndex=String(index);
      button.textContent=example.name;
      button.addEventListener('click',()=>{onSelect(index);if(isModal)close(false);focusEditor({resetSelection:true});});
      section.append(button);count++;
    });
    status.textContent=count?`${count} of ${examples.length} examples${collection==='professional'?' in the Professional collection':''}. Select one to load its code; then use Run.`:'No matching examples. Change or clear the search or choose All examples.';
    markCurrent();
  }
  function positionModal(){
    const box=root.getBoundingClientRect();
    dialog.style.setProperty('--drawer-left',Math.max(12,Math.min(box.left,innerWidth-332))+'px');
    dialog.style.setProperty('--drawer-top',Math.max(12,Math.min(box.top,innerHeight-320))+'px');
  }
  function open(){
    if(isOpen)return;const pageX=scrollX,pageY=scrollY;isOpen=true;isModal=!wide.matches;
    root.dataset.drawerOpen='true';root.dataset.drawerMode=isModal?'modal':'inline';toggle.setAttribute('aria-expanded','true');
    dialog.setAttribute('aria-modal',String(isModal));
    if(isModal){positionModal();dialog.showModal();}else dialog.show();
    (search.disabled?closeButton:search).focus({preventScroll:true});scrollTo({left:pageX,top:pageY,behavior:'instant'});
  }
  function close(returnFocus=true){
    if(!isOpen)return;const pageX=scrollX,pageY=scrollY;isOpen=false;dialog.close();root.dataset.drawerOpen='false';toggle.setAttribute('aria-expanded','false');
    if(returnFocus)toggle.focus({preventScroll:true});
    scrollTo({left:pageX,top:pageY,behavior:'instant'});
  }
  toggle.addEventListener('click',()=>isOpen?close():open());
  closeButton.addEventListener('click',()=>close());
  dialog.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&isOpen){event.preventDefault();close();return;}
    if(event.key!=='Tab'||!isOpen||!isModal)return;
    const stops=[closeButton,search,...collectionButtons,retry,...buttons()].filter(el=>!el.disabled&&!el.hidden);
    const first=stops[0],last=stops.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  dialog.addEventListener('click',event=>{if(isModal&&event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&isOpen&&!isModal){event.preventDefault();close();}});
  search.addEventListener('input',render);
  collectionButtons.forEach(button=>button.addEventListener('click',()=>{
    collection=button.dataset.collection==='professional'?'professional':'all';
    collectionButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.collection===collection)));render();
  }));
  search.addEventListener('keydown',event=>{if(event.key==='ArrowDown'&&buttons().length){event.preventDefault();buttons()[0].focus();}});
  list.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
    const all=buttons(),index=all.indexOf(event.target);if(index<0)return;
    event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?all.length-1:Math.max(0,Math.min(all.length-1,index+(event.key==='ArrowDown'?1:-1)));all[next].focus();
  });
  retry.addEventListener('click',()=>onRetry());
  wide.addEventListener('change',()=>{if(isOpen){const value=search.value;close(false);open();search.value=value;}});
  addEventListener('resize',()=>{if(isOpen&&isModal)positionModal();});
  return {
    setExamples(value){examples=value;available=true;retry.hidden=true;search.disabled=false;render();if(isOpen)search.focus({preventScroll:true});},
    setCurrent(index){selected=Number.isInteger(index)?index:null;markCurrent();},
    loading(){available=false;list.replaceChildren();retry.hidden=true;search.disabled=true;status.textContent='Loading examples…';},
    failed(){available=false;list.replaceChildren();search.disabled=true;status.textContent='Examples could not load. You can still write code and run the compiler. Retry when your connection is ready.';retry.hidden=false;if(isOpen)retry.focus({preventScroll:true});},
    beforeRun(){if(isOpen&&isModal){close(false);focusEditor();}},
    focusEditor,close
  };
}
