(() => {
  const run = () => {
    document.querySelectorAll('.v2-footer, footer').forEach(footer => {
      if (footer.querySelector('[data-legal-links]')) return;
      const wrap = document.createElement('div');
      wrap.dataset.legalLinks = '';
      wrap.style.cssText = 'display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:12px;margin-top:14px;';
      wrap.innerHTML = '<a href="privacy.html" style="color:inherit;text-decoration:none">Confidentialité</a><a href="terms.html" style="color:inherit;text-decoration:none">Conditions d’utilisation</a>';
      const bottom = footer.querySelector('.v2-footer-bottom') || footer.lastElementChild || footer;
      bottom.appendChild(wrap);
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
})();
