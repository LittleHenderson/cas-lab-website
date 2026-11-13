const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paragraph = value => (Array.isArray(value)?value:[value]).filter(x=>typeof x==='string'&&x.trim()).map(x=>`<p>${escape(x)}</p>`).join('');
function sourceLink(source) {
  if (!source || typeof source.title !== 'string' || typeof source.url !== 'string') return '';
  try { const url=new URL(source.url); if(url.protocol!=='https:'||url.username||url.password)return ''; }
  catch { return ''; }
  return `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)}</a></li>`;
}
export function renderProfessionalContext(record,{referenceOnly=false}={}) {
  const p=record?.professional;if(!p)return '';
  const sources=(p.sources??[]).map(sourceLink).filter(Boolean).join('');
  return `<section class="professional-context" aria-label="Professional use and output guide"><p class="eyebrow">${escape(p.field||'Professional example')} · Fictional teaching scenario</p>${referenceOnly?'<p class="professional-reference">Saved example reference only. The expectations below do not describe your edited input.</p>':''}<div class="professional-context-grid"><div><h3>Use in practice</h3>${paragraph(p.use)}<h4>The task</h4>${paragraph(p.task)}</div><div><h3>${referenceOnly?'Saved example expected output':'What this example returns'}</h3>${paragraph(p.expectedOutput)}<p>Load a version, select Run, then inspect Result and Diagnostics. A successful compile checks the supplied formal model.</p></div></div><div class="professional-limits"><h3>What the output does not establish</h3>${paragraph(p.limits)}</div>${p.clinicalBackground?`<section class="clinical-background"><h3>Clinical background</h3>${paragraph(p.clinicalBackground)}<p>This background does not validate the CAS interpretation or establish a diagnosis.</p></section>`:''}${sources?`<details class="professional-sources"><summary>Context and references</summary><ul>${sources}</ul><p>These sources support the stated context. The scenario-to-CAS mapping is an authored educational interpretation.</p></details>`:''}</section>`;
}
