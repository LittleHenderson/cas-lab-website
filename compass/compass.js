(() => {
  const btn = document.getElementById('motion-toggle');
  if (!btn) return;

  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let paused = prefersReduced;

  const apply = () => {
    document.documentElement.dataset.motionPaused = String(paused);
    btn.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'Resume motion' : 'Pause motion';
    btn.textContent = label;
    btn.setAttribute('aria-label', label);
  };

  btn.addEventListener('click', () => {
    paused = !paused;
    apply();
  });

  apply();
})();
