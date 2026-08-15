(() => {
  const render = () => {
    const en = localStorage.getItem('phoenix-lang') === 'en' || document.documentElement.lang === 'en';
    document.querySelectorAll('.v2-footer, footer').forEach(footer => {
      let wrap = footer.querySelector('[data-legal-links]');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.dataset.legalLinks = '';
        wrap.style.cssText = 'display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:12px;margin-top:14px;';
        const bottom = footer.querySelector('.v2-footer-bottom') || footer.lastElementChild || footer;
        bottom.appendChild(wrap);
      }

      const links = [
        [en ? 'privacy-en.html' : 'privacy.html', en ? 'Privacy Policy' : 'Politique de confidentialité'],
        [en ? 'terms-en.html' : 'terms.html', en ? 'Terms of Use' : 'Conditions d’utilisation']
      ];

      if (document.body.classList.contains('synapse-saas-page')) {
        links.push(
          ['synapse-privacy.html', en ? 'Synapse Privacy' : 'Confidentialité Synapse'],
          ['synapse-terms.html', en ? 'Synapse Terms' : 'Conditions Synapse']
        );
      }

      wrap.innerHTML = links.map(([href,label]) => `<a href="${href}" style="color:inherit;text-decoration:none">${label}</a>`).join('');
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();

  window.addEventListener('storage', event => {
    if (event.key === 'phoenix-lang') render();
  });

  const observer = new MutationObserver(() => render());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();