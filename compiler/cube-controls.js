// Extracted unchanged interaction code from cas_cubes.py.
function mountCubeControls() {

// Browser interaction body embedded in cas_cubes.INTERACTION by prepare.py.
// Source geometry/axes: cas_cubes.py and parent SggsScene.placeFacePanel.
(() => {
  const NS='http://www.w3.org/2000/svg';
  const axes={front:[[-1,1,1],[2,0,0],[0,-2,0],[0,0,1]],right:[[1,1,1],[0,0,-2],[0,-2,0],[1,0,0]],back:[[1,1,-1],[-2,0,0],[0,-2,0],[0,0,-1]],left:[[-1,1,-1],[0,0,2],[0,-2,0],[-1,0,0]],top:[[-1,1,-1],[2,0,0],[0,0,2],[0,1,0]],bottom:[[-1,-1,1],[2,0,0],[0,0,-2],[0,-1,0]]};
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const rotate=([x,y,z],[ax,ay,az=0])=>{[x,z]=[Math.cos(ay)*x+Math.sin(ay)*z,-Math.sin(ay)*x+Math.cos(ay)*z];[y,z]=[Math.cos(ax)*y-Math.sin(ax)*z,Math.sin(ax)*y+Math.cos(ax)*z];return [Math.cos(az)*x-Math.sin(az)*y,Math.sin(az)*x+Math.cos(az)*y,z];};
  const element=(tag,attrs={},text)=>{const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(text!==undefined)e.textContent=text;return e;};
  document.querySelectorAll('svg[data-cas-cubes]:not([data-ready])').forEach(svg=>{
    svg.dataset.ready='true';
    const scene=svg.querySelector('[data-cube-scene]'),map=svg.querySelector('[data-cube-view="map"]');
    const cubes=[...scene.querySelectorAll('.cas-cube')];
    const base=new Map(cubes.map(c=>{const [x,y]=c.getAttribute('transform').match(/-?[\d.]+/g).map(Number);return [c,[x-550,305-y,0]];}));
    const local=new Map(cubes.map(c=>[c,[-.34,.26,0]]));
    const edges=[...scene.querySelectorAll('[data-edge-source]')].map(g=>{const l=g.querySelector('line'),t=g.querySelector('text');return {g,l,t,a:[+l.getAttribute('x1')-550,305-Number(l.getAttribute('y1')),0],b:[+l.getAttribute('x2')-550,305-Number(l.getAttribute('y2')),0],label:t?[+t.getAttribute('x')-550,305-Number(t.getAttribute('y')),0]:null};});
    let orbit=[0,0,0],zoom=1,pan=[0,0],mode='scene',view='cubes',selected=null,gesture=null;
    let centerY=305,viewportHeight=480,autoFit=true;
    const pointers=new Map();let toolbar,inspector,status,modeSelect;
    const clipId='scene-clip-'+Math.random().toString(36).slice(2);
    const clip=element('clipPath',{id:clipId}),clipRect=element('rect',{x:0,y:65,width:1100,height:480});clip.append(clipRect);svg.querySelector('defs').append(clip);
    const viewport=element('g',{'data-scene-viewport':'true','clip-path':`url(#${clipId})`,tabindex:0,role:'group','aria-label':'Whole structure. Drag to orbit; wheel or pinch to zoom. Arrow keys orbit; plus and minus zoom; zero resets.',style:'touch-action:none;cursor:grab;outline:none'});
    const sceneBackground=element('rect',{x:0,y:65,width:1100,height:480,fill:'#0d1117'});
    scene.parentElement.insertBefore(viewport,scene);viewport.append(sceneBackground,scene);
    const mapBackground=element('rect',{x:0,y:65,width:1100,height:480,fill:'#0d1117'});
    const mapViewport=element('g',{'data-map-viewport':'true','clip-path':`url(#${clipId})`,style:'touch-action:none',tabindex:0,role:'group','aria-label':'Map. Drag to pan; wheel or pinch to zoom.'});map.parentElement.insertBefore(mapViewport,map);mapViewport.append(mapBackground,map);mapViewport.setAttribute('display','none');
    // Keep the original map geometry, then apply one camera transform to it.
    const mapOriginal=element('g',{transform:map.getAttribute('transform')});mapOriginal.append(...map.childNodes);map.removeAttribute('transform');map.append(mapOriginal);
    const projection=p=>{const r=rotate(p,orbit);return [550+pan[0]+r[0]*zoom,centerY+pan[1]-r[1]*zoom,r[2]];};
    function inspect(cube){
      selected=cube;cubes.forEach(c=>c.setAttribute('aria-pressed',String(c===cube)));
      const faces=[...cube.querySelectorAll('[data-face]')];
      if(inspector){inspector.replaceChildren();const title=document.createElement('h3');title.textContent=cube.dataset.label;inspector.append(title);const grid=document.createElement('div');grid.className='cas-face-grid';inspector.append(grid);faces.forEach(face=>{const section=document.createElement('section'),h=document.createElement('h4'),p=document.createElement('p');h.textContent=face.dataset.title;p.textContent=JSON.parse(face.dataset.lines).join('\n');section.append(h,p);grid.append(section);});}
      const panel=svg.querySelector('[data-cube-inspector]');panel.replaceChildren(element('rect',{x:16,y:565,width:1068,height:180,rx:9,fill:'#111d2e'}),element('text',{x:32,y:585,fill:'#e2e8f0','font-size':12,'font-family':'monospace'},cube.dataset.label));
      faces.forEach((face,i)=>{const x=32+(i%3)*354,y=609+Math.floor(i/3)*71;panel.append(element('text',{x,y,fill:cube.dataset.stroke,'font-size':10,'font-family':'monospace'},face.dataset.title.toUpperCase()));JSON.parse(face.dataset.lines).slice(0,3).forEach((line,j)=>{const t=element('text',{x,y:y+15+j*13,fill:'#dbeafe','font-size':10,'font-family':'monospace'},line.length>53?line.slice(0,50)+'...':line);t.append(element('title',{},line));panel.append(t);});});
    }
    function draw(){
      const depth=[];
      cubes.forEach(c=>{const p=projection(base.get(c)),h=+c.dataset.size/2;c.setAttribute('transform',`translate(${p[0]} ${p[1]})`);depth.push([c,p[2]]);c.querySelectorAll('[data-face]').forEach(f=>{const [o,u,v,n]=axes[f.dataset.face].map(a=>rotate(rotate(a,local.get(c)),orbit));f.setAttribute('transform',`matrix(${u[0]*h*zoom/100} ${-u[1]*h*zoom/100} ${v[0]*h*zoom/100} ${-v[1]*h*zoom/100} ${o[0]*h*zoom} ${-o[1]*h*zoom})`);f.setAttribute('visibility',n[2]>.001?'visible':'hidden');});const label=c.querySelector('.cube-label');label.setAttribute('y',+c.dataset.size*.81*zoom);label.setAttribute('font-size',11*Math.max(.75,zoom));});
      // Far cubes first, with readable labels; edge endpoints use the same projection.
      depth.sort((a,b)=>a[1]-b[1]).forEach(([c])=>scene.append(c));
      edges.forEach(e=>{const a=projection(e.a),b=projection(e.b);['x1','y1','x2','y2'].forEach((key,i)=>e.l.setAttribute(key,[a[0],a[1],b[0],b[1]][i]));if(e.t){const p=projection(e.label);e.t.setAttribute('x',p[0]);e.t.setAttribute('y',p[1]);e.t.setAttribute('font-size',10*Math.max(.75,zoom));}});
      map.setAttribute('transform',`translate(${550+pan[0]} ${centerY+pan[1]}) scale(${zoom}) rotate(${-orbit[2]*180/Math.PI}) translate(-550 -305)`);
      svg.dataset.sceneZoom=String(zoom);svg.dataset.sceneOrbit=JSON.stringify(orbit);svg.dataset.scenePan=JSON.stringify(pan);svg.dataset.interactionMode=mode;
      if(status)status.textContent=`${view==='map'?'2D map':'Whole structure'} · ${Math.round(zoom*100)}% zoom · tilt ${Math.round(orbit[0]*180/Math.PI)}°, turn ${Math.round(orbit[1]*180/Math.PI)}°, twist ${Math.round(orbit[2]*180/Math.PI)}°`;
      if(toolbar)toolbar.querySelectorAll('[data-orbit]').forEach(b=>b.disabled=view==='map');
    }
    function zoomAt(next,p=[550,centerY]){autoFit=false;next=clamp(next,.2,6);const ratio=next/zoom;pan=[p[0]-550-(p[0]-550-pan[0])*ratio,p[1]-centerY-(p[1]-centerY-pan[1])*ratio];zoom=next;draw();}
    function fit(){
      let points=[];
      if(view==='map')points=[[0,65],[1100,735]];else cubes.forEach(c=>{const b=base.get(c),h=+c.dataset.size*.95;for(const x of [-h,h])for(const y of [-h,h])for(const z of [-h,h]){const r=rotate([b[0]+x,b[1]+y,b[2]+z],orbit);points.push([550+r[0],305-r[1]]);}});
      const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),l=Math.min(...xs),r=Math.max(...xs),t=Math.min(...ys),b=Math.max(...ys);zoom=clamp(Math.min(1000/Math.max(1,r-l),Math.max(100,viewportHeight-60)/Math.max(1,b-t)),.2,6);pan=[(550-(l+r)/2)*zoom,(305-(t+b)/2)*zoom];autoFit=true;draw();
    }
    function action(name){
      if(name==='reset'){orbit=[0,0,0];pan=[0,0];zoom=1;local.forEach((_,c)=>local.set(c,[-.34,.26,0]));fit();return;}
      if(name==='fit'){fit();return;}if(name==='reset-cube'){if(selected)local.set(selected,[-.34,.26,0]);draw();return;}
      if(name==='zoom-in'||name==='zoom-out'){zoomAt(zoom*(name==='zoom-in'?1.25:.8));return;}
      const turns={left:[0,-.26,0],right:[0,.26,0],up:[-.26,0,0],down:[.26,0,0],'twist-left':[0,0,.26],'twist-right':[0,0,-.26]};
      if(turns[name]){autoFit=false;orbit=orbit.map((r,i)=>r+turns[name][i]);draw();return;}
      if(name==='cubes'||name==='map'){view=name;svg.querySelector('[data-cube-view="cubes"]').setAttribute('display',name==='cubes'?'inline':'none');mapViewport.setAttribute('display',name==='map'?'inline':'none');map.setAttribute('display','inline');svg.querySelectorAll('[data-action]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.action===name)));if(toolbar)toolbar.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===name)));orbit=[0,0,0];pan=[0,0];zoom=1;fit();}
    }
    function svgPoint(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
    function begin(){const p=[...pointers.values()];if(p.length>1){const a=p[0].p,b=p[1].p;gesture={kind:'pinch',distance:Math.hypot(a.x-b.x,a.y-b.y),angle:Math.atan2(b.y-a.y,b.x-a.x),center:[(a.x+b.x)/2,(a.y+b.y)/2],zoom,pan:[...pan],orbit:[...orbit]};}else if(p.length){gesture={kind:p[0].cube&&mode==='cube'?'cube':mode==='pan'||view==='map'||p[0].shift?'pan':'scene',cube:p[0].cube,start:p[0].p,pan:[...pan],orbit:[...orbit],local:p[0].cube?[...local.get(p[0].cube)]:null};}else gesture=null;}
    function down(e){if(e.button!==0&&e.button!==2)return;e.preventDefault();const c=e.target.closest('.cas-cube');if(c)inspect(c);e.currentTarget.focus();e.currentTarget.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{p:svgPoint(e),cube:c,shift:e.shiftKey||e.button===2});begin();}
    function move(e){if(!pointers.has(e.pointerId))return;const p=svgPoint(e);pointers.get(e.pointerId).p=p;if(!gesture)return;autoFit=false;
      if(gesture.kind==='pinch'){const ps=[...pointers.values()],a=ps[0].p,b=ps[1].p,center=[(a.x+b.x)/2,(a.y+b.y)/2],ratio=clamp(Math.hypot(a.x-b.x,a.y-b.y)/Math.max(1,gesture.distance),.05,20);zoom=clamp(gesture.zoom*ratio,.2,6);const q=zoom/gesture.zoom;pan=[center[0]-550-(gesture.center[0]-550-gesture.pan[0])*q,center[1]-centerY-(gesture.center[1]-centerY-gesture.pan[1])*q];orbit=[...gesture.orbit];orbit[2]-=Math.atan2(b.y-a.y,b.x-a.x)-gesture.angle;
      }else{const dx=p.x-gesture.start.x,dy=p.y-gesture.start.y;if(gesture.kind==='pan')pan=[gesture.pan[0]+dx,gesture.pan[1]+dy];else if(gesture.kind==='cube')local.set(gesture.cube,[gesture.local[0]+dy*.006,gesture.local[1]+dx*.006,0]);else orbit=[gesture.orbit[0]+dy*.006,gesture.orbit[1]+dx*.006,gesture.orbit[2]];}draw();
    }
    function end(e){pointers.delete(e.pointerId);begin();}
    [viewport,mapViewport].forEach(v=>{v.addEventListener('pointerdown',down);v.addEventListener('pointermove',move);v.addEventListener('pointerup',end);v.addEventListener('pointercancel',end);v.addEventListener('lostpointercapture',end);v.addEventListener('contextmenu',e=>e.preventDefault());v.addEventListener('wheel',e=>{e.preventDefault();const p=svgPoint(e);zoomAt(zoom*Math.exp(-e.deltaY*(e.deltaMode===1?.035:.0015)),[p.x,p.y]);},{passive:false});v.addEventListener('keydown',e=>{if(e.target.closest('.cas-cube'))return;const actions={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'zoom-in','=':'zoom-in','-':'zoom-out','0':'reset','f':'fit','[':'twist-left',']':'twist-right'};if(actions[e.key]){e.preventDefault();action(actions[e.key]);}});});
    cubes.forEach(c=>{c.setAttribute('aria-label',`${c.dataset.label}; Enter to inspect; arrow keys turn only this cube`);c.addEventListener('click',()=>inspect(c));c.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();inspect(c);return;}const shifts={ArrowLeft:[0,-.26],ArrowRight:[0,.26],ArrowUp:[-.26,0],ArrowDown:[.26,0]};if(shifts[e.key]){e.preventDefault();e.stopPropagation();const r=local.get(c);local.set(c,[r[0]+shifts[e.key][0],r[1]+shifts[e.key][1],0]);inspect(c);draw();}});});
    svg.querySelectorAll('[data-action]').forEach(b=>{b.addEventListener('click',()=>action(b.dataset.action));b.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();action(b.dataset.action);}});});
    const hint=svg.querySelector('[data-cube-view="cubes"] > text:last-of-type');if(hint)hint.textContent='Drag the whole structure · wheel/pinch zoom · Shift-drag pans · arrow keys turn a focused cube · 0 resets';
    if(svg.parentElement?.namespaceURI==='http://www.w3.org/1999/xhtml'){
      const style=document.createElement('style');style.textContent='.cas-controls{font:14px/1.5 system-ui;color:#dbeafe;padding:12px;background:#101b2b}.cas-control-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:0 0 8px}.cas-controls button,.cas-controls select{font:inherit;color:#e2e8f0;background:#192b42;border:1px solid #52687e;border-radius:5px;padding:6px 9px;min-height:36px;cursor:pointer}.cas-controls button:focus-visible,.cas-controls select:focus-visible{outline:2px solid #5eead4;outline-offset:2px}.cas-controls button[aria-pressed=true]{background:#155e60}.cas-controls button:disabled{opacity:.4}.cas-controls p{padding:0;margin:8px 0;font:13px/1.5 system-ui;color:#b8c8dc}.cas-inspector{font:14px/1.5 system-ui;color:#dbeafe;padding:14px;background:#101b2b}.cas-inspector h3{font-size:16px;overflow-wrap:anywhere;margin:0 0 10px}.cas-face-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.cas-face-grid h4{font-size:12px;color:#5eead4;margin:0 0 5px}.cas-face-grid p{font-size:13px;white-space:pre-wrap;overflow-wrap:anywhere;padding:0;margin:0}.cas-scene-svg{display:block;width:100%;height:var(--cas-scene-height,520px);max-height:none;background:#0d1117}.cas-scene-svg [data-cube-viewport]:focus{outline:0}@media(max-width:550px){.cas-face-grid{grid-template-columns:1fr 1fr}.cas-controls{padding:10px}.cas-scene-svg{height:var(--cas-scene-height,360px)}.cas-controls button{min-height:40px}}';
      toolbar=document.createElement('div');toolbar.className='cas-controls';toolbar.setAttribute('aria-label','Whole structure controls');
      toolbar.innerHTML='<div class="cas-control-row"><button type="button" data-view="cubes" aria-pressed="true">3D cubes</button><button type="button" data-view="map" aria-pressed="false">2D map</button><label>Drag <select aria-label="Drag action"><option value="scene">Whole structure</option><option value="cube">One cube</option><option value="pan">Pan view</option></select></label></div><div class="cas-control-row"><button type="button" data-command="left" data-orbit>Turn left</button><button type="button" data-command="right" data-orbit>Turn right</button><button type="button" data-command="up" data-orbit>Tilt up</button><button type="button" data-command="down" data-orbit>Tilt down</button><button type="button" data-command="twist-left">Twist left</button><button type="button" data-command="twist-right">Twist right</button></div><div class="cas-control-row"><button type="button" data-command="zoom-out" aria-label="Zoom out">− Zoom</button><button type="button" data-command="zoom-in" aria-label="Zoom in">+ Zoom</button><button type="button" data-command="fit">Fit all</button><button type="button" data-command="reset">Reset view</button><button type="button" data-command="reset-cube">Reset selected cube</button></div><p>Whole structure moves cubes and links together. Drag to orbit; wheel or two-finger pinch to zoom; two-finger twist to roll; Shift-drag or Pan view to move. Choose One cube to turn just one cube. Click a cube to read its faces.</p><p class="cas-scene-status" role="status"></p>';
      status=toolbar.querySelector('.cas-scene-status');modeSelect=toolbar.querySelector('select');modeSelect.onchange=()=>{mode=modeSelect.value;draw();};toolbar.querySelectorAll('[data-command]').forEach(b=>b.onclick=()=>action(b.dataset.command));toolbar.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>action(b.dataset.view));
      inspector=document.createElement('div');inspector.className='cas-inspector';inspector.setAttribute('aria-label','Selected cube faces');svg.before(style,toolbar);svg.after(inspector);svg.classList.add('cas-scene-svg');svg.setAttribute('viewBox','0 60 1100 500');svg.querySelectorAll('[data-action]').forEach(b=>b.style.display='none');svg.querySelector('[data-cube-inspector]').style.display='none';
    }
    if(cubes.length)inspect(cubes[Math.min(1,cubes.length-1)]);
    if(toolbar){
      const resizeScene=()=>{const box=svg.getBoundingClientRect();if(!box.width||!box.height)return;const height=1100*box.height/box.width;viewportHeight=Math.max(100,height-10);centerY=65+viewportHeight/2;svg.setAttribute('viewBox',`0 60 1100 ${height}`);[clipRect,sceneBackground,mapBackground].forEach(r=>r.setAttribute('height',viewportHeight));if(hint)hint.setAttribute('y',65+viewportHeight-6);if(autoFit)fit();else draw();};
      const observer=new ResizeObserver(resizeScene);observer.observe(svg);svg.addEventListener('cas-dispose',()=>observer.disconnect(),{once:true});resizeScene();
    }else draw();
  });
})();


}
