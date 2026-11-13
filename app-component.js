// Production component extracted unchanged from snapshot 492361f index.html.
// Ordinary authored JavaScript, never source text evaluated at runtime.
window.CASLabProductionComponent = function (DCLogic, React) {
class Component extends DCLogic {
  state = { page: null, motionPaused: false, sel: 'helm', off: 'research', filter: 'all', menu: false, w: typeof window !== 'undefined' ? window.innerWidth : 1200, demo: true, sent: false, errs: {}, form: { name: '', email: '', org: '', type: '', desc: '', time: '', budget: '', total: '', ads: '' } };
  cubeFrame = (el) => { this._cubeFrame = el; if (el && !el._helmBound) { el._helmBound = true; el.addEventListener('load', () => { const post = () => this.postCube(el, { helmMode: this.state.cubeMode || 'speaking', helmPaused: !!this.state.motionPaused }); post(); setTimeout(post, 600); setTimeout(post, 2000); }); } };
  postCube(el, data) { if (el && el.contentWindow && new URL(el.src, window.location.href).origin === window.location.origin) el.contentWindow.postMessage(data, window.location.origin); }
  syncMotion() { document.documentElement.dataset.motionPaused = String(!!this.state.motionPaused); document.querySelectorAll('iframe[src^="./helm-cube-3d.html"]').forEach(el => this.postCube(el, { helmPaused: !!this.state.motionPaused })); }
  heroRef = (el) => { if (el) this.startHero(el); else this.stopHero(); };
  pal() { const P = {
    Blood: { ground: '#0a0506', card: '#150b0d', text: '#f6eeee', accent: '#ee3340', body: '#c9b9ba', muted: '#9c8a8c', dash: '#756466', rule: '#33191c', rule2: '#241214', stripe: '#1e0f11' },
    Biolume: { ground: '#050b0a', card: '#0c1513', text: '#eaf3ee', accent: '#37f5a0', body: '#b3c2ba', muted: '#86958d', dash: '#62706a', rule: '#20302b', rule2: '#17231f', stripe: '#13201c' },
    Signal: { ground: '#05080f', card: '#0c111c', text: '#eef2f8', accent: '#4aa8ff', body: '#b4bccb', muted: '#8690a2', dash: '#626b7c', rule: '#212a3a', rule2: '#18202d', stripe: '#141b27' },
    Aurora: { ground: '#0a0712', card: '#130f1e', text: '#f1ecfa', accent: '#a78bff', body: '#bdb5cc', muted: '#9087a3', dash: '#6b637c', rule: '#2a2340', rule2: '#1e1930', stripe: '#191428' },
    Solar: { ground: '#0b0906', card: '#151209', text: '#f6f1e6', accent: '#ffc233', body: '#c4bca9', muted: '#968e7b', dash: '#6f6858', rule: '#2e2818', rule2: '#211d12', stripe: '#1b170e' } };
    const c = P[this.state.pal || this.props.palette] || P.Biolume, rgb = (x) => [1, 3, 5].map(i => parseInt(x.slice(i, i + 2), 16)).join(',');
    return { c, t: rgb(c.text), a: rgb(c.accent) }; }
  applyPal() { const c = this.pal().c; for (const k in c) document.documentElement.style.setProperty('--' + k, c[k]); }
  palKey() { return (this.state.pal || this.props.palette || 'Biolume') + '|' + this.props.heroMotion + '|' + this.state.motionPaused; }
  componentDidUpdate() { const k = this.palKey(); if (k !== this._palKey) { this._palKey = k; this.applyPal(); if (this.state.motionPaused) this.stopHero(); else if (this._cv && this._cv.isConnected) this.startHero(this._cv); this.syncMotion(); } }
  componentDidMount() { this._route = () => this.readRoute(true); window.addEventListener('hashchange', this._route); window.addEventListener('popstate', this._route); this.readRoute(false); this._escape = (e) => { if (e.key === 'Escape' && this.state.menu) { this.setState({ menu: false }); this.focusId('menu-toggle'); } }; window.addEventListener('keydown', this._escape); this._motion = window.matchMedia('(prefers-reduced-motion: reduce)'); this._motionChange = () => { if (this._cv && this._cv.isConnected) this.startHero(this._cv); }; this._motion.addEventListener('change', this._motionChange); this._dh = (e) => { if (e.origin !== window.location.origin || !e.data || typeof e.data !== 'object') return; const frames = Array.from(document.querySelectorAll('iframe[src^="./helm-cube-3d.html"]')); const sourceFrame = frames.find(f => f.contentWindow === e.source && new URL(f.src, window.location.href).origin === window.location.origin); if (!sourceFrame) return; if (e.data.helmReady === true) this.postCube(sourceFrame, { helmPaused: !!this.state.motionPaused }); const h = e.data.helmDrawH; if (sourceFrame === this._cubeFrame && Number.isFinite(h) && h >= 200 && h <= 2000 && Math.abs(h - (this.state.drawH || 0)) > 2) this.setState({ drawH: h }); }; window.addEventListener('message', this._dh); this._palKey = this.palKey(); this.applyPal(); this._r = () => this.setState({ w: window.innerWidth }); window.addEventListener('resize', this._r); this._r(); }
  componentWillUnmount() { window.removeEventListener('hashchange', this._route); window.removeEventListener('popstate', this._route); window.removeEventListener('keydown', this._escape); if (this._motion) this._motion.removeEventListener('change', this._motionChange); window.removeEventListener('message', this._dh); if (window.speechSynthesis) window.speechSynthesis.cancel(); window.removeEventListener('resize', this._r); this.stopHero(); }
  stopHero() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = null; if (this._mm) window.removeEventListener('pointermove', this._mm); this._mm = null; if (this._sc) window.removeEventListener('scroll', this._sc); this._sc = null; }
  startHero(cv) {
    this.stopHero();
    this._cv = cv; const pal = this.pal(), TX = 'rgba(' + pal.t + ',', AC = 'rgba(' + pal.a + ',';
    const ctx = cv.getContext('2d'), nodes = [], rnd = Math.random;
    const add = (x, y, z, par, lvl) => { const p = par >= 0 ? nodes[par] : null; nodes.push({ x, y, z, par, lvl, g: p ? p.g + Math.hypot(x - p.x, y - p.y, z - p.z) : 0, hot: false, leaf: false, ph: rnd() * 6.28 }); return nodes.length - 1; };
    const base = add(0, -0.8, 0, -1, 0); let top = base;
    [-0.62, -0.44, -0.26, -0.1].forEach(y => { top = add((rnd() - .5) * .06, y, (rnd() - .5) * .06, top, 0); });
    for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283 + rnd() * .4, r1 = add(Math.cos(an) * .24, -0.93, Math.sin(an) * .24, base, 1), r2 = add(Math.cos(an) * .52, -1.03 - rnd() * .04, Math.sin(an) * .52, r1, 2); [-.35, .35].forEach(j => { const r = .78 + rnd() * .18; add(Math.cos(an + j) * r, -1.12, Math.sin(an + j) * r, r2, 3); }); }
    const N = 380, ga = Math.PI * (3 - Math.sqrt(5)), sides = { '-1': [], '1': [] }, cortex = [], leaves = [];
    for (let i = 0; i < N; i++) { const uy = 1 - (i / (N - 1)) * 2; if (uy < -0.5) continue; const r = Math.sqrt(1 - uy * uy), an = ga * i, ux = Math.cos(an) * r, uz = Math.sin(an) * r, sd = ux < 0 ? -1 : 1, k = .93 + rnd() * .07; sides[sd].push({ x: sd * (Math.abs(ux) * .8 + .07) * k, y: .35 + uy * .62 * k, z: uz * 1.02 * k }); }
    const d2 = (p, q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2;
    [-1, 1].forEach(sd => {
      const pts = sides[sd], hemi = add(sd * .14, .02, 0, top, 1), hp = nodes[hemi], seeds = [pts[Math.floor(pts.length / 2)]];
      while (seeds.length < 7) { let best = null, bd = -1; pts.forEach(p => { const m = Math.min.apply(null, seeds.map(q => d2(p, q))); if (m > bd) { bd = m; best = p; } }); seeds.push(best); }
      const lobes = seeds.map(q => add(hp.x + (q.x - hp.x) * .55, hp.y + (q.y - hp.y) * .55, hp.z + (q.z - hp.z) * .55, hemi, 2)), mine = [];
      pts.forEach(p => { let bi = 0, bd = 1e9; seeds.forEach((q, i) => { const d = d2(p, q); if (d < bd) { bd = d; bi = i; } }); const id = add(p.x, p.y, p.z, lobes[bi], 3); nodes[id].leaf = true; nodes[id].hot = rnd() < .1; mine.push(id); leaves.push(id); });
      mine.forEach(i => { const ds = mine.filter(j => j !== i).map(j => [d2(nodes[i], nodes[j]), j]).sort((x, y) => x[0] - y[0]); for (let k = 0; k < 3; k++) if (ds[k][1] > i) cortex.push([i, ds[k][1]]); });
    });
    const gMax = Math.max.apply(null, nodes.map(n => n.g)), paths = leaves.map(l => { const p = []; let i = l; while (i >= 0) { p.unshift(i); i = nodes[i].par; } return p; });
    const pulses = []; for (let i = 0; i < 46; i++) pulses.push({ p: Math.floor(rnd() * paths.length), t: rnd(), v: 0.003 + rnd() * 0.006 });
    let mx = 0, my = 0, tx = 0, ty = 0, t0 = 0;
    this._mm = (e) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', this._mm);
    const still = this.state.motionPaused || (this.props.heroMotion === false) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const P = new Array(nodes.length), LW = [2.6, 1.8, 1.1, .6];
    const frame = (now) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) { this._raf = requestAnimationFrame(frame); return; }
      if (!t0) t0 = now;
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      const wide = w >= 1200, host = cv.parentElement.getBoundingClientRect(), sp = Math.max(0, Math.min(1, -host.top / Math.max(1, host.height - h))), e1 = Math.min(1, sp / .2), zm = 1 + (wide ? .6 : 1.1) * e1 * e1 * (3 - 2 * e1), fy = sp < .2 ? -.08 + .43 * e1 : sp < .5 ? .35 - .7 * (sp - .2) / .3 : -.35 - .65 * Math.min(1, (sp - .5) / .35), R = (wide ? Math.min(w * .2, h * .27) : Math.min(w * .34, h * .15)) * zm, hb = (document.querySelector('header') || cv).getBoundingClientRect().bottom, cx = wide ? w * (.76 + .05 * e1) : w * .72, cy = wide ? h * .48 + fy * R : Math.max(h * (.27 + .23 * e1) + fy * R, Math.max(0, hb) + 16 + 1.25 * R * (1 - e1) + fy * R * e1), fade = wide ? 1 : .32;
      const t = still ? 4000 : now, prog = still ? 1e9 : (now - t0) / 3400 * gMax, ry = t * 0.00016 + mx * .9 + sp * 2.2, rx = .1 + my * .3, cyR = Math.cos(ry), syR = Math.sin(ry), cxR = Math.cos(rx), sxR = Math.sin(rx);
      for (let i = 0; i < nodes.length; i++) { const p = nodes[i], x1 = p.x * cyR + p.z * syR, z1 = -p.x * syR + p.z * cyR, y2 = p.y * cxR - z1 * sxR, z2 = p.y * sxR + z1 * cxR, s = 3.4 / (3.4 + z2); P[i] = { x: cx + x1 * R * s, y: cy - y2 * R * s, d: Math.max(0, Math.min(1, (1.1 - z2) / 2.2)), s }; }
      const gy = cy - .35 * R, gp = .85 + .15 * Math.sin(t * .0008), gg = ctx.createRadialGradient(cx, gy, 0, cx, gy, R * 2.6); gg.addColorStop(0, AC + (.34 * gp * fade + .05).toFixed(3) + ')'); gg.addColorStop(.3, AC + (.12 * gp * fade + .02).toFixed(3) + ')'); gg.addColorStop(1, AC + '0)'); ctx.fillStyle = gg; ctx.fillRect(0, 0, w, h);
      ctx.lineCap = 'round';
      ctx.lineWidth = .6;
      for (let i = 0; i < cortex.length; i++) { const e = cortex[i]; if (Math.max(nodes[e[0]].g, nodes[e[1]].g) > prog - .15) continue; const a = P[e[0]], b = P[e[1]]; ctx.strokeStyle = TX + ((.04 + .22 * Math.min(a.d, b.d)) * fade).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; if (n.par < 0) continue; const pn = nodes[n.par]; if (pn.g >= prog) continue; const f = Math.min(1, (prog - pn.g) / (n.g - pn.g)), a = P[n.par], b = P[i]; ctx.lineWidth = LW[n.lvl] * b.s; ctx.strokeStyle = TX + ((.14 + .5 * Math.min(a.d, b.d)) * fade).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f); ctx.stroke(); }
      for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; if (!n.leaf || n.g > prog) continue; const q = P[i];
        if (n.hot) { const pu = .6 + .4 * Math.sin(t * .002 + n.ph), r = (2 + 2 * pu) * q.s; ctx.fillStyle = AC + (.14 * q.d * fade).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(q.x, q.y, r * 4.5, 0, 6.29); ctx.fill(); ctx.fillStyle = AC + ((.35 + .65 * q.d) * fade).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, 6.29); ctx.fill(); }
        else { ctx.fillStyle = TX + ((.15 + .75 * q.d) * fade).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(q.x, q.y, 1.2 * q.s, 0, 6.29); ctx.fill(); } }
      if (prog > gMax) for (let i = 0; i < pulses.length; i++) { const u = pulses[i]; if (!still) { u.t += u.v; if (u.t >= 1) { u.t = 0; u.p = Math.floor(rnd() * paths.length); } } const pa = paths[u.p], fi = Math.min(u.t, .9999) * (pa.length - 1), k = Math.floor(fi), fr = fi - k, a = P[pa[k]], b = P[pa[k + 1]], x = a.x + (b.x - a.x) * fr, y = a.y + (b.y - a.y) * fr; ctx.fillStyle = AC + (.22 * fade).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.29); ctx.fill(); ctx.fillStyle = AC + fade.toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x, y, 2, 0, 6.29); ctx.fill(); }
      if (!still) this._raf = requestAnimationFrame(frame);
    };
    this._raf = requestAnimationFrame(frame);
    if (still && !this.state.motionPaused) { this._sc = () => frame(performance.now()); window.addEventListener('scroll', this._sc, { passive: true }); }
  }
  speak(title, rate) {
    const ss = window.speechSynthesis; if (!ss) return;
    const u = new SpeechSynthesisUtterance(title + '. A research paper by Little Henderson, version zero point two, from CAS Lab. The full narration of this paper will be added here.');
    u.rate = rate || this.state.rate || 1; u.onend = () => this.setState({ audioPlaying: false });
    ss.cancel(); ss.speak(u); this.setState({ audioPlaying: true });
  }
  stopAudio(close) { if (window.speechSynthesis) window.speechSynthesis.cancel(); this.setState(close ? { audio: null, audioPlaying: false } : { audioPlaying: false }); }
  playPaper(id, title) {
    const s = this.state;
    if (s.audio === id && s.audioPlaying) { if (window.speechSynthesis) window.speechSynthesis.pause(); this.setState({ audioPlaying: false, paused: true }); return; }
    if (s.audio === id && s.paused && window.speechSynthesis && window.speechSynthesis.paused) { window.speechSynthesis.resume(); this.setState({ audioPlaying: true, paused: false }); return; }
    this.setState({ audio: id, paused: false }); this.speak(title);
  }
  cubeEl(m) {
    const S = 190, h = S / 2, c = m[4], faces = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];
    return React.createElement('div', { role: 'img', 'aria-label': 'Preview of the cube in ' + m[1] + ' mode', style: { perspective: '900px', width: S, height: S, margin: Math.round(S * .28) + 'px auto' } },
      React.createElement('div', { className: 'cube-anim', style: { position: 'relative', width: S, height: S, transformStyle: 'preserve-3d', transform: 'rotateX(-24deg) rotateY(-30deg)', animation: 'cubeSpin 48s linear infinite' } },
        faces.map((f, i) => React.createElement('div', { key: i, style: { position: 'absolute', inset: 0, background: '#030404', outline: '1px solid #1b2220', transform: f + ' translateZ(' + h + 'px)' } },
          c ? React.createElement('div', { key: m[0], className: 'cube-anim', style: { position: 'absolute', inset: 0, border: '2px solid ' + c, boxShadow: '0 0 20px ' + c + ', inset 0 0 20px ' + c + '66', opacity: m[0] === 'listening' && i !== 0 ? .3 : 1, animation: m[5] || 'none' } }) : null))));
  }
  readRoute(focus) {
    const hash = window.location.hash.slice(1), parts = hash.split('/'), page = parts[0] || 'home';
    if (!['home', 'work', 'offering', 'research', 'project', 'library', 'shop', 'how', 'about', 'contact'].includes(page)) return;
    const next = { page, menu: false };
    if (page === 'project') next.sel = ['helm', 'helmcube', 'harness', 'lantern', 'branchspace'].includes(parts[1]) ? parts[1] : 'helm';
    if (page === 'offering') next.off = ['research', 'software', 'eval', 'marketing'].includes(parts[1]) ? parts[1] : 'research';
    this.setState(next);
    if (focus) { this.focusId('main'); window.scrollTo(0, 0); }
  }
  go(page, extra) { return (e) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0)) return;
    if (e && e.preventDefault) e.preventDefault();
    const next = Object.assign({ page, menu: false }, extra || {});
    const hash = '#' + page + (page === 'project' ? '/' + (next.sel || this.state.sel) : page === 'offering' ? '/' + (next.off || this.state.off) : '');
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    this.setState(next); this.focusId('main'); window.scrollTo(0, 0);
  }; }
  focusId(id) { setTimeout(() => { const el = document.getElementById(id); if (el) el.focus(); }, 60); }
  renderVals() {
    const s = this.state, page = s.page || this.props.startPage || 'home', f = s.form;
    const STAGES = [
      { key: 'planned', glyph: '○', label: 'Planned', desc: 'An idea or a question. No working version exists yet.', empty: 'No projects are marked as planned in this view.' },
      { key: 'prototype', glyph: '◐', label: 'Prototype', desc: 'Something has been built and runs. It has not been evaluated.', empty: 'No projects are marked as prototypes in this view.' },
      { key: 'eval', glyph: '◕', label: 'Under evaluation', desc: 'Being tested against stated criteria. Results are not final.', empty: 'No projects are under evaluation in this view.' },
      { key: 'shown', glyph: '●', label: 'Demonstrated result', desc: 'A result with public evidence you can inspect, and its limits stated.', empty: 'No demonstrated results have been approved for publication yet. When one is, it will appear here with its evidence and limitations.' }
    ];
    const st = (k) => STAGES.find(x => x.key === k);
    const pending = 'An approved public summary is pending.';
    const PROJECTS = [
      { id: 'helm', name: 'HELM', stage: 'prototype', summary: 'Central to the lab\'s research direction. ' + pending, access: 'None yet' },
      { id: 'compiler', name: 'CAS Compiler', stage: 'prototype', summary: 'A free browser workspace that runs the actual CAS compiler on your device. Write CAS notation, check it, and inspect the result as cube diagrams, maps and structured data.', access: 'Free, in the browser', url: './compiler/index.html', urlLabel: 'Open the compiler' },
      { id: 'helmcube', name: 'The HELM Cube', stage: 'planned', summary: 'A concept for HELM\'s final home: a small black cube with no buttons that listens, talks, sees and maps its room.', access: 'Concept only, not built' },
      { id: 'harness', name: 'CAS Harness', stage: 'eval', summary: 'Part of the CAS project family. ' + pending, access: 'None yet' },
      { id: 'lantern', name: 'Lantern', stage: 'planned', summary: pending, access: 'None yet' },
      { id: 'branchspace', name: 'Branchspace', stage: 'prototype', summary: 'The lab\'s internal workspace for organizing projects, files and ideas. It is not a public product.', access: 'Internal only' }
    ].map(p => Object.assign(p, { href: p.url || '#project/' + p.id, hasUrl: !!p.url, glyph: st(p.stage).glyph, stageLabel: st(p.stage).label, open: p.id === 'compiler' ? ((e) => { if (e && e.preventDefault) e.preventDefault(); window.location.href = p.url; }) : this.go('project', { sel: p.id }) }));
    const proj = PROJECTS.find(p => p.id === s.sel && p.id !== 'compiler') || PROJECTS[0];
    const OFFERS = [
      { id: 'research', title: 'Bounded AI research and feasibility work', short: 'Find out whether an idea is workable before you commit to building it.', problem: 'You have an idea that depends on AI and you do not know whether it can work, what it would take, or where it would fail.', deliverable: 'A written feasibility report: what was tried, what was observed, what remains uncertain and a recommendation on whether to continue.', scope: 'One question, agreed in writing, with a fixed stopping point. Data access and any spending are approved by you first.', next: 'We talk through the question, what a useful answer looks like and what information you could share.' },
      { id: 'software', title: 'Software prototypes and workflow tools', short: 'A working first version of a tool, small enough to judge quickly.', problem: 'A manual or awkward process is costing your team time, and you want to see whether software could carry part of it.', deliverable: 'A bounded prototype you can try, with notes on what it does, what it does not do and what a fuller version would need.', scope: 'A single workflow or feature. A prototype is not production software and is labeled that way.', next: 'We walk through the process as it works today and pick the smallest piece worth prototyping.' },
      { id: 'eval', title: 'Evaluation and evidence-based review', short: 'An independent look at how an AI or software system behaves.', problem: 'You rely on, or are considering, an AI or software system and want to know how it behaves beyond the vendor\'s description.', deliverable: 'A review stating what was tested, how, what was observed and the limits of the test.', scope: 'Agreed test criteria and agreed access. Passing checks is reported as passing checks, not as proof of broader ability.', next: 'We establish what you need to be confident about and what access is possible.' },
      { id: 'marketing', title: 'Marketing research and planning', short: 'Describe what your business needs, compare approaches and decide how much help you want.', problem: 'You want to reach customers and are unsure which approach suits your business and budget.', deliverable: 'Research and a written plan that compares different approaches, with their likely costs listed separately.', scope: 'Planning only, for now. Managed execution is a possible later service. No sales results are promised.', next: 'You describe your business and goals. We outline which approaches are worth comparing.' }
    ].map((o, i) => Object.assign(o, { href: '#offering/' + o.id, num: '0' + (i + 1), isMarketing: o.id === 'marketing', open: this.go('offering', { off: o.id }), discuss: this.go('contact', { sent: false, form: Object.assign({}, f, { type: o.id }) }) }));
    const off = OFFERS.find(o => o.id === s.off) || OFFERS[0];
    const shown = s.filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.stage === s.filter);
    const filters = [{ key: 'all', glyph: '', label: 'All' }].concat(STAGES).map(x => ({ glyph: x.glyph, label: x.label, on: s.filter === x.key, pick: () => this.setState({ filter: x.key }) }));
    const none = 'No approved public information yet.';
    const SECS = [
      ['The question', 'Can a system keep what it learned on one task while it learns a second, different task?', 'The research question will be published here once approved.'],
      ['Why it matters', 'Systems that forget earlier learning need retraining, which limits how useful they are over time.', none],
      ['Approach', 'Build a small test setup, define what counts as retention before running anything, then compare against a simple baseline.', none],
      ['Development stage', 'A first version runs. It has not been evaluated against the stated criteria.', 'Stage is pending verification.'],
      ['What was observed', null, 'No approved public results yet. Software builds and passing checks are preparation and are not reported here as findings.'],
      ['Public evidence', null, 'Nothing has been published for inspection yet. Evidence will be linked here when it is approved.'],
      ['Limitations', 'Small-scale tests may not hold at larger scale. Results would apply only to the tasks tested.', none],
      ['Next questions', 'Does the same behavior appear with a third task? What is the cost in compute?', none]
    ];
    const CUBE_MODES = [["asleep","Asleep","off","Off. A plain black box."],["awake","Awake","after a shake","One sweep along all twelve edges, then dim."],["listening","Listening","mics live","The edges nearest the person speaking glow brighter."],["thinking","Thinking","gate check","Two points of light travel along the edges."],["speaking","Speaking","voice out","Brightness follows the voice: a pulse per syllable."],["asking","Asking","a question","Short, short, long, every 2 seconds. Then it listens."],["missing","Missing input","undetermined","One dark edge: the gap is what is missing."],["declined","Declined","refusal","Shrinks to one edge and fades. Not red."],["soft","Privacy, soft","5 taps","Slow breathing. A software mute."],["hard","Privacy, hard","hardware switch","Steady red, powered through the switch."],["camera","Camera on","a camera powered","A green dot on that face, wired to the camera."],["charging","Charging","on the pad","One buzz; lit edges show the charge level."],["pairing","Pairing","setup window","A chase; fewer stay lit as time runs out."],["low","Low battery, error","battery or network","Orange blinks."],["eye","Eye report","report filed","One blip: a report is in the app."],["updating","Updating","firmware","A slow chase along the edges."],["tap","Tap command","taps on a face","The number of taps is the action, the face you tap is the target. A tiny buzz confirms each counted tap."]];
    const cubeKey = s.cubeMode || 'speaking', cubeCur = CUBE_MODES.find(m => m[0] === cubeKey) || CUBE_MODES[4];
    const cubeModes = CUBE_MODES.map(m => ({ label: m[1], on: m[0] === cubeKey, ring: m[0] === cubeKey ? 'var(--accent)' : 'var(--rule)', pick: () => { this.setState({ cubeMode: m[0] }); const f = this._cubeFrame; if (f && f.contentWindow) this.postCube(f, { helmMode: m[0] }); } }));
    const cubeParts = ["Camera, behind dark glass","Camera-on dot: green, wired to the camera's power","Depth-sensor window","Microphone pinhole, in the edge seam","Sound slot","Edge light: light pipes along all four edges","Magnet ring and charging coil","Dock sensor","Haptic motor"].map((text, i) => ({ num: i + 1, text }));
    const cubeSpec = [["Size","64 mm on each edge, about a tennis ball across; 55 mm is the smallest honest size, at the cost of magnetic charging and on-cube speech.","estimate"],["Look","A plain black box. Off, all six faces are identical: no band, port, button or logo singles one out.","owner ruling"],["Light","Along all twelve edges, invisible until lit. It pulses with each syllable HELM speaks and shows each mode by its motion.","design"],["Touch","No buttons. Shake to wake. Taps to command: the number of taps is the action, the face you tap is the target. A tiny buzz confirms each counted tap.","design"],["Charging","Qi2 magnetic wireless charging only. One unmarked face snaps to the charger by magnetic pull, and a short buzz confirms. Heat, not the standard, sets the speed: about 14 W at first, likely 7 to 10 W as it warms.","owner ruling; speeds are estimates"],["Cameras, microphones, sound","Behind every face, hidden behind dark glass and edge slots. While docked, the charge face rests and the other five work. Cameras are off by default.","owner ruling; design"],["Knowing where it is","A gyroscope feels every turn; small depth sensors on each face measure the walls; Wi-Fi gives distances; the phone can share the location. Together they build a coarse map of the room; space it has not measured stays undetermined. Wi-Fi alone cannot draw walls yet; that is still research.","design; researched and fact-checked"],["Brains","HELM's recipe brain runs on the cube. Speech runs on the cube when it is cool enough, otherwise on the phone.","design"],["Radios","Wi-Fi 6, Bluetooth, and Thread for Matter smart-home devices, through the home's existing hub.","design"],["Another version: the display cube","Not the main version. The whole outside is black Gorilla Glass over square screens that can show pictures, video, answers and the room map. A dark screen gives no light, so off it is still a plain black box. Screens cost power and heat, so one or two faces light at a time; cameras see worse under a screen.","owner ruling; estimates only"]].map(r => ({ part: r[0], design: r[1], status: r[2] }));
    const cubeWords = [["recipe brain","HELM's brain made of written recipes and exact arithmetic instead of a neural network"],["RPM Gate","HELM's one gate: it lets a step go ahead, sends it to repair, or refuses, and lets the brain say it cannot tell"],["UNDETERMINED","HELM's honest 'I cannot tell', used when something it needs is missing"],["receipt","the record a saved fact leaves behind, with a fingerprint, so it can be checked later"]].map(w => ({ term: w[0], def: w[1] }));
    const cubeHard = ["Six cameras running at once needs a hotter, phone-class chip; the plan is one camera at a time, chosen by where the voice came from.","Hiding a camera behind dark glass costs it light, so pictures get noisy in dim rooms.","Six separate speakers do not fit usefully; one driver with two passive radiators sends sound out through slots on every face.","The law expects a regulatory mark on the device; the closest fit to the plain-black-box rule is a black-on-black etch on the charge face.","In the EU, from 18 February 2027, portable batteries must be removable by the user, so an EU version needs an openable face.","It cannot charge fast and talk at the same time: both share one small heat budget."].map((text, i) => ({ num: '0' + (i + 1), text }));
    const isCube = proj.id === 'helmcube';
    const sections = SECS.map((x, i) => { const filled = s.demo && !!x[1]; return { num: '0' + (i + 1), title: x[0], body: x[1], filled, empty: !filled, emptyText: x[2] }; });
    const steps = [
      ['Understand the problem', 'A conversation about what you need and what a useful outcome looks like.', 'You confirm the written scope.'],
      ['Research', 'AI agents and the founder gather what is known and identify what is uncertain.', 'You approve any access to your data.'],
      ['Bounded prototype', 'A small working version or study, limited to the agreed question.', 'You approve any spending beyond the agreed amount.'],
      ['Evaluation', 'The work is checked against criteria set beforehand, and the limits of the checks are recorded.', ''],
      ['Human review', 'The founder reviews the outputs and evidence before anything is handed over.', 'Nothing is published without your approval.'],
      ['Agreed next step', 'You decide whether to stop, continue or change direction.', 'You decide. No automatic continuation.']
    ].map((x, i) => ({ num: '0' + (i + 1), title: x[0], body: x[1], gate: x[2], hasGate: !!x[2] }));
    const navDefs = [['work', 'Work with us', ['work', 'offering']], ['research', 'Research', ['research', 'project']], ['library', 'Library', ['library']], ['shop', 'Shop', ['shop']], ['how', 'How we work', ['how']], ['about', 'About', ['about']]];
    const BOOKS = [
      { slot: 'book-programming', cover: './assets/books/programming-in-cas-title.svg', title: 'Programming in CAS', note: 'Corrected edition · Free PDF', href: './compiler/downloads/Programming_in_CAS_Corrected_Edition_2026-10-11.pdf', cta: 'Download free PDF' },
      { slot: 'book-pcba', cover: './assets/books/cas-pcba-engineer-cover.jpg', title: 'CAS PCBA Engineer', note: 'Book', href: 'https://www.amazon.com/stores/Little-Henderson/author/B0HF7SCH5N/allbooks', cta: 'View on Amazon' },
      { slot: 'book-reality', cover: './assets/books/reality-engineering-cover.jpg', title: 'Reality Engineering', note: 'Book', href: 'https://www.amazon.com/stores/Little-Henderson/author/B0HF7SCH5N/allbooks', cta: 'View on Amazon' },
      { slot: 'book-thinking', cover: './assets/books/thinking-in-cognitive-architecture-cover.jpg', title: 'Thinking in Cognitive Architecture', note: 'Book', href: 'https://www.amazon.com/stores/Little-Henderson/author/B0HF7SCH5N/allbooks', cta: 'View on Amazon' }
    ];
    const PAPERS = [['core', 'CAS Core 8'], ['ohm', 'CAS-Ohm 1.0'], ['pcba', 'CAS PCBA 8'], ['topos', 'Noetic Topos 2.0'], ['tks', 'TKS V8.0']];
    const papers = PAPERS.map((p, i) => { const playing = s.audio === p[0] && s.audioPlaying; return { num: '0' + (i + 1), title: p[1], version: 'v0.2', playing, icon: playing ? '❚❚' : '▶', listenLabel: playing ? 'Pause preview' : 'Play preview', listen: () => this.playPaper(p[0], p[1]) }; });
    const curPaper = PAPERS.find(p => p[0] === s.audio);
    const DOT = { green: '#37f5a0', blue: '#4aa8ff', red: '#ee3340', violet: '#a78bff', gold: '#ffc233' };
    const SHOP = [
      ['01', 'tops', 'Signature tee', 'green', 'Green brain, black, front logo'],
      ['02', 'tops', 'Brain-tree tee', 'blue', 'Blue brain, black, logo and brain tree'],
      ['04', 'tops', 'Colorway tee', 'red', 'Red brain, black, front logo'],
      ['20a', 'tops', 'Long-sleeve tee', 'violet', 'Violet brain, black, shoulder and heart marks', '20b'],
      ['21a', 'tops', 'Sleeve-logo long-sleeve', 'blue', 'Blue brain, black, logo down both sleeves', '21b'],
      ['03', 'hoodies', 'Brain-tree hoodie', 'violet', 'Violet brain, charcoal, pocketless'],
      ['19a', 'hoodies', 'Placement hoodie', 'blue', 'Blue brain, charcoal, full logo on back', '19b'],
      ['26a', 'layers', 'Fleece vest', 'green', 'Green brain tree, charcoal, name and tree on chest', '26b'],
      ['27a', 'layers', 'Quarter-zip', 'blue', 'Blue brain tree, navy, tree at left cuff', '27b', 'Cuff'],
      ['28a', 'sweats', 'Gray sweatshirt', 'blue', 'Blue brain, gray, logo down left sleeve', '28b'],
      ['28c', 'sweats', 'Gray joggers', 'blue', 'Blue brain, gray, logo down left leg', '28d', 'Side'],
      ['29a', 'sweats', 'Navy sweatshirt', 'green', 'Green mark, navy, gold sleeve logo, tree on back', '29b'],
      ['29c', 'sweats', 'Navy joggers', 'green', 'Green mark, navy, gold logo down left leg', '29d', 'Side'],
      ['07', 'hats', 'Curved-brim cap', 'green', 'Green brain, black, horizontal logo'],
      ['08', 'hats', 'Flat-brim cap', 'blue', 'Blue brain, black, stacked logo'],
      ['09', 'hats', 'Navy cap', 'red', 'Red brain, navy, horizontal logo'],
      ['10', 'hats', 'Cuffed beanie', 'violet', 'Violet brain, charcoal, stacked logo'],
      ['11', 'hats', 'Trucker cap', 'gold', 'Gold brain, black, horizontal logo'],
      ['12', 'hats', 'Light cap', 'blue', 'Blue brain, off-white, horizontal logo'],
      ['22', 'hats', 'Brain-tree cap', 'blue', 'Blue tree beside CAS LAB'],
      ['23', 'hats', 'Brain-tree cap, stacked', 'green', 'Green tree above CAS LAB'],
      ['13', 'bags', 'Classic backpack', 'green', 'Green brain, black, mark only'],
      ['14', 'bags', 'Zip book bag', 'blue', 'Blue brain, charcoal, stacked logo'],
      ['15', 'bags', 'Roll-top book bag', 'red', 'Red brain, navy, mark only'],
      ['16', 'bags', 'Canvas tote', 'blue', 'Blue brain, natural canvas, stacked logo'],
      ['17', 'bags', 'Everyday tote', 'violet', 'Violet brain, black, stacked logo'],
      ['18', 'bags', 'Logo-only tote', 'gold', 'Gold brain, charcoal, mark only'],
      ['05', 'mugs', 'Dark mug', 'gold', 'Gold brain, black ceramic'],
      ['06', 'mugs', 'Light mug', 'blue', 'Blue brain, white ceramic']
    ];
    const CATS = [['all', 'All'], ['tops', 'Tees and tops'], ['hoodies', 'Hoodies'], ['layers', 'Vests and zips'], ['sweats', 'Sweats'], ['hats', 'Hats'], ['bags', 'Bags'], ['mugs', 'Mugs']];
    const cat = s.shopCat || 'all', views = s.views || {};
    const shopCats = CATS.map(c => { const on = cat === c[0]; return { label: c[1], count: c[0] === 'all' ? SHOP.length : SHOP.filter(x => x[1] === c[0]).length, on, bg: on ? 'var(--text)' : 'transparent', fg: on ? 'var(--ground)' : 'var(--text)', pick: () => this.setState({ shopCat: c[0] }) }; });
    const shopItems = SHOP.filter(x => cat === 'all' || x[1] === cat).map(x => { const isBack = !!x[5] && views[x[0]] === 'back', setV = (v) => this.setState({ views: Object.assign({}, views, { [x[0]]: v }) });
      return { num: x[0].replace(/[a-d]$/, ''), backLabel: x[6] || 'Back', name: x[2], desc: x[4], dot: DOT[x[3]], img: './assets/shop/' + (isBack ? x[5] : x[0]) + (parseInt(x[0], 10) >= 26 ? '.png' : '.jpg'), alt: x[2] + ' concept, ' + (isBack ? (x[6] || 'back').toLowerCase() : 'front') + ' view: ' + x[4], hasBack: !!x[5], isFront: !isBack, isBack, frontRing: isBack ? 'var(--rule)' : 'var(--accent)', backRing: isBack ? 'var(--accent)' : 'var(--rule)', front: () => setV('front'), back: () => setV('back') }; });
    const nav = navDefs.map(n => { const active = n[2].indexOf(page) >= 0; return { href: '#' + n[0], label: n[1], active, current: active ? 'page' : undefined, go: this.go(n[0]) }; });
    const wide = s.w >= 1180;
    const TYPES = { research: 'AI research or feasibility', software: 'Software prototype or workflow tool', eval: 'Evaluation or review', marketing: 'Marketing research and planning', collab: 'Research collaboration', other: 'Something else' };
    const e = s.errs, errList = [['name', 'Enter your name'], ['email', 'Enter a valid email address'], ['type', 'Choose a type of inquiry'], ['desc', 'Describe the problem in at least 20 characters']].filter(x => e[x[0]]).map(x => ({ href: '#f-' + x[0], text: x[1] }));
    const validate = () => { const r = {}; if (!f.name.trim()) r.name = 1; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) r.email = 1; if (!f.type) r.type = 1; if (f.desc.trim().length < 20) r.desc = 1; return r; };
    const isMk = f.type === 'marketing';
    const summary = [['Name', f.name], ['Email', f.email], ['Organization', f.org], ['Inquiry', TYPES[f.type]], ['Problem', f.desc], ['Timeframe', f.time], ['Budget range', isMk ? '' : f.budget], ['Total budget', isMk ? f.total : ''], ['Advertising only', isMk ? f.ads : '']].filter(x => x[1]).map(x => ({ k: x[0], v: x[1] }));
    const email = 'info@caslabai.com';
    const inquiryMailto = 'mailto:' + email + '?subject=' + encodeURIComponent('CAS Lab inquiry: ' + (TYPES[f.type] || 'General')) + '&body=' + encodeURIComponent(summary.map(r => r.k + ': ' + r.v).join('\n\n'));
    return {
      isHome: page === 'home', isWork: page === 'work', isOffering: page === 'offering', isResearch: page === 'research', isProject: page === 'project', isHow: page === 'how', isAbout: page === 'about', isContact: page === 'contact', isLibrary: page === 'library', isShop: page === 'shop', books: BOOKS, papers, shopCats, shopItems,
      playerOn: !!curPaper, playerTitle: curPaper ? curPaper[1] : '', playerSource: 'Short browser-voice preview; full narration is not yet available', playerIcon: s.audioPlaying ? '❚❚' : '▶', playerAria: s.audioPlaying ? 'Pause preview' : 'Play preview',
      playerToggle: () => curPaper && this.playPaper(curPaper[0], curPaper[1]), playerClose: () => this.stopAudio(true),
      speeds: [0.85, 1, 1.25].map(v => ({ label: v + '×', on: (s.rate || 1) === v, ring: (s.rate || 1) === v ? 'var(--accent)' : 'var(--rule)', pick: () => { this.setState({ rate: v }); if (s.audioPlaying && curPaper) { this.stopAudio(false); setTimeout(() => this.speak(curPaper[1], v), 30); } } })),
      goHome: this.go('home'), goWork: this.go('work'), goResearch: this.go('research'), goHow: this.go('how'), goAbout: this.go('about'), goContact: this.go('contact'),
      goCollab: this.go('contact', { sent: false, form: Object.assign({}, f, { type: 'collab' }) }),
      skipMain: (ev) => { ev.preventDefault(); this.focusId('main'); }, motionPaused: !!s.motionPaused, motionLabel: s.motionPaused ? 'Resume motion' : 'Pause motion', toggleMotion: () => this.setState({ motionPaused: !this.state.motionPaused }), heroRef: this.heroRef, palettes: [['Biolume', 'Green', '#37f5a0'], ['Signal', 'Blue', '#4aa8ff'], ['Aurora', 'Violet', '#a78bff'], ['Solar', 'Gold', '#ffc233']].map(x => { const on = (s.pal || this.props.palette || 'Biolume') === x[0]; return { name: x[1], color: x[2], on, ring: on ? x[2] : 'transparent', pick: () => this.setState({ pal: x[0] }) }; }), nav, wide, narrow: !wide, menuOpen: s.menu, menuLabel: s.menu ? 'Close' : 'Menu', showMobileMenu: !wide && s.menu, toggleMenu: () => this.setState({ menu: !s.menu }),
      stages: STAGES, featured: PROJECTS.slice(0, 3), interests: ['Cognitive architectures', 'Learning and reasoning', 'Retention', 'Cooperation between systems', 'Inspectable evidence'].map((label, i) => ({ num: '0' + (i + 1), label })),
      offerings: OFFERS, off, filters, shown, noneShown: shown.length === 0, emptyText: (st(s.filter) || {}).empty || '', clearFilter: () => this.setState({ filter: 'all' }),
      proj, sections, isCube, genericProj: !isCube, cubeFrame: this.cubeFrame, cubeParts, cubeFlip: () => { const f = this._cubeFrame; if (f && f.contentWindow) this.postCube(f, { helmFlip: 1 }); }, cubeMode: { label: cubeCur[1], cue: cubeCur[2], caption: cubeCur[3] }, cubeModes, cubeSpec, cubeWords, cubeHard, demoOn: s.demo, demoBtn: s.demo ? 'Show empty state' : 'Show illustrative content', demoNote: s.demo ? 'Demo content. The text marked "Illustrative example" is invented to show the layout. It does not describe this project.' : 'This is how the page looks when no approved public content exists.', toggleDemo: () => this.setState({ demo: !s.demo }),
      steps, f, onField: (ev) => { const t = ev.target; this.setState({ form: Object.assign({}, f, { [t.name]: t.value }) }); },
      submit: (ev) => { ev.preventDefault(); const r = validate(); if (Object.keys(r).length) { this.setState({ errs: r }); this.focusId('err-summary'); } else { this.setState({ errs: {}, sent: true }); this.focusId('confirm'); } },
      hasErrors: errList.length > 0, errCount: errList.length === 1 ? '1 field' : errList.length + ' fields', errList,
      badName: !!e.name, badEmail: !!e.email, badType: !!e.type, badDesc: !!e.desc,
      errName: e.name ? 'Enter your name.' : '', errEmail: e.email ? 'Enter a valid email address, like name@example.com.' : '', errType: e.type ? 'Choose a type of inquiry.' : '', errDesc: e.desc ? 'Add a little more detail, at least 20 characters.' : '',
      descCount: f.desc.length, isMarketingForm: isMk, showBudgetRange: !isMk, showForm: !s.sent, sent: s.sent, summary,
      editForm: () => this.setState({ sent: false }), resetForm: () => this.setState({ sent: false, errs: {}, form: { name: '', email: '', org: '', type: '', desc: '', time: '', budget: '', total: '', ads: '' } }),
      emailText: email || 'No public address has been confirmed yet.', legalName: this.props.legalName || 'CAS Lab', inquiryMailto
    };
  }
}
return Component;
};
