(() => {
  const render = () => {
    const en = localStorage.getItem('phoenix-lang') === 'en' || document.documentElement.lang === 'en';

    document.querySelectorAll('.v2-footer, .syn-v2-footer, footer').forEach(footer => {
      let wrap = footer.querySelector('[data-legal-links]');
      if (!wrap) {
        wrap = document.createElement('nav');
        wrap.dataset.legalLinks = '';
        wrap.setAttribute('aria-label', en ? 'Legal information' : 'Informations légales');
        const bottom = footer.querySelector('.v2-footer-bottom') || footer.lastElementChild || footer;
        bottom.appendChild(wrap);
      }

      wrap.style.cssText = [
        'display:flex',
        'gap:18px',
        'flex-wrap:wrap',
        'align-items:center',
        'font-size:11px',
        'margin-top:10px',
        'opacity:.82'
      ].join(';');

      const links = [
        [en ? 'privacy-en.html' : 'privacy.html', en ? 'Privacy Policy' : 'Politique de confidentialité'],
        [en ? 'terms-en.html' : 'terms.html', en ? 'Terms of Use' : 'Conditions d’utilisation']
      ];

      wrap.innerHTML = links
        .map(([href, label]) => `<a href="${href}" style="color:inherit;text-decoration:none">${label}</a>`)
        .join('');
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();

  window.addEventListener('storage', event => {
    if (event.key === 'phoenix-lang') render();
  });

  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
})();
