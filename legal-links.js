(() => {
  const render = () => {
    const en = localStorage.getItem('phoenix-lang') === 'en' || document.documentElement.lang === 'en';
    const violet = document.documentElement.dataset.theme === 'light' ? '#795df5' : '#9d8aff';

    document.querySelectorAll('.v2-footer, .syn-v2-footer, body > footer').forEach(footer => {
      if (footer.closest('.cmd-card')) return;

      const bottom = footer.querySelector('.v2-footer-bottom') || footer;
      bottom.style.setProperty('color', violet, 'important');

      // Keep the Phoenix brand identical to the header.
      const brand = footer.querySelector('.v2-brand, .syn-v2-brand');
      if (brand) {
        const strong = brand.querySelector('b');
        const small = brand.querySelector('small');
        if (strong) strong.style.removeProperty('color');
        if (small) small.style.setProperty('color', '#ff6b2c', 'important');
      }

      let wrap = footer.querySelector(':scope > [data-legal-links], :scope .v2-footer-bottom > [data-legal-links]');
      if (!wrap) {
        wrap = document.createElement('nav');
        wrap.dataset.legalLinks = '';
        bottom.appendChild(wrap);
      }

      wrap.setAttribute('aria-label', en ? 'Legal information' : 'Informations légales');
      wrap.style.cssText = [
        'display:flex',
        'gap:18px',
        'flex-wrap:wrap',
        'align-items:center',
        'font-size:11px',
        'margin:0',
        `color:${violet}`
      ].join(';');

      const links = [
        [en ? 'privacy-en.html' : 'privacy.html', en ? 'Privacy Policy' : 'Politique de confidentialité'],
        [en ? 'terms-en.html' : 'terms.html', en ? 'Terms of Use' : 'Conditions d’utilisation']
      ];

      wrap.innerHTML = links
        .map(([href, label]) => `<a href="${href}" style="color:inherit;text-decoration:none;font-weight:700">${label}</a>`)
        .join('');
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();

  window.addEventListener('storage', event => {
    if (event.key === 'phoenix-lang' || event.key === 'phoenix-theme') render();
  });
  window.addEventListener('phoenix:langchange', render);
  window.addEventListener('phoenix:footerready', render);
  document.addEventListener('click', event => {
    if (event.target.closest?.('[data-theme-toggle]')) setTimeout(render, 0);
  });
})();