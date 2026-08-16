(() => {
  const render = () => {
    const en = localStorage.getItem('phoenix-lang') === 'en' || document.documentElement.lang === 'en';

    // Only target actual page footers. Never inject legal links inside
    // component-level <footer> elements such as Synapse command cards.
    document.querySelectorAll('.v2-footer, .syn-v2-footer, body > footer').forEach(footer => {
      if (footer.closest('.cmd-card')) return;

      let wrap = footer.querySelector(':scope > [data-legal-links], :scope .v2-footer-bottom > [data-legal-links]');
      if (!wrap) {
        wrap = document.createElement('nav');
        wrap.dataset.legalLinks = '';
        const bottom = footer.querySelector('.v2-footer-bottom') || footer;
        bottom.appendChild(wrap);
      }

      wrap.setAttribute('aria-label', en ? 'Legal information' : 'Informations légales');
      wrap.style.cssText = [
        'display:flex',
        'gap:18px',
        'flex-wrap:wrap',
        'align-items:center',
        'font-size:11px',
        'margin-top:10px'
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
  window.addEventListener('phoenix:langchange', render);
})();