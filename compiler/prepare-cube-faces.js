import {buildCubeFaceContent} from './cube-face-content.js';
import {getVerifiedAnnotations} from './diagram-annotations.js';
import {replaceCubeFaceText} from './cube-face-view.js';

// Freeze presentation against the accepted result, never the later editor/menu.
export function prepareCubeFaces({svg,diagram,lessonContext=null}) {
  const parsed=new DOMParser().parseFromString(svg,'image/svg+xml');
  const root=parsed.documentElement;
  if(root.localName!=='svg'||parsed.querySelector('parsererror'))throw Error('Invalid compiler SVG.');
  const annotations=getVerifiedAnnotations({svg:root,diagram,lessonContext});
  const nodes=new Map([...(diagram?.nodes??[]),...(diagram?.containers??[])].map(node=>[node.id,node]));
  const records=[...root.querySelectorAll('.cas-cube')].map(cube=>{
    const id=cube.dataset.nodeId;
    const node=cube.dataset.presentationOnly==='true'
      ?{id,kind:'presentation_root',presentation_only:true}:nodes.get(id)??{id};
    return {nodeId:id,faces:buildCubeFaceContent({node,diagram,authoredAnnotation:annotations.get(id)??null})};
  });
  return {svg:replaceCubeFaceText(svg,records),records};
}
