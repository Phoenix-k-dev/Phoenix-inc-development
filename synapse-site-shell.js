(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const config = window.PHOENIX_CONFIG || {};

  function normalizeHeader() {
    const header = document.querySelector('.syn-v2-header');
    if (!header) return;

    header.classList.add('v2-header');
    header.setAttribute('data-site-header', '');

    const brand = header.querySelector('.syn-v2-brand');
    brand?.classList.add('v2-brand');

    const nav = header.querySelector('.syn-v2-nav');
    nav?.classList.add('v2-nav');

    const actions = header.querySelector('.syn-v2-actions');
    if (!actions) return;
    actions.classList.add('v2-header-actions');

    const discord = actions.querySelector('a[href*="discord.gg"]');
    if (discord) {
      discord.className = 'v2-icon-link';
      discord.textContent = 'Discord ↗';
      discord.setAttribute('target', '_blank');
      discord.setAttribute('rel', 'noopener');
    }

    let quote = actions.querySelector('[data-syn-site-quote]');
    if (!quote) {
      quote = document.createElement('a');
      quote.className = 'v2-btn v2-btn-small v2-btn-primary';
      quote.href = 'index.html#quote';
      quote.dataset.synSiteQuote = '';
      quote.innerHTML = '<span>Faire un devis</span> ↗';
    }

    const lang = actions.querySelector('[data-syn-product-lang]');
    const theme = actions.querySelector('[data-theme-toggle]');
    const menu = actions.querySelector('.syn-v2-menu');

    // Keep the same visual order as every other Phoenix Inc page:
    // Discord · theme · FR/EN · quote · mobile menu.
    if (discord) actions.appendChild(discord);
    if (theme) actions.appendChild(theme);
    if (lang) actions.appendChild(lang);
    actions.appendChild(quote);
    if (menu) actions.appendChild(menu);
  }

  function normalizeFooter() {
    const oldFooter = document.querySelector('.syn-v2-footer');
    if (!oldFooter || oldFooter.dataset.siteShellReady) return;

    oldFooter.dataset.siteShellReady = 'true';
    oldFooter.className = 'v2-footer syn-v2-footer';
    oldFooter.innerHTML = `
      <div class="v2-footer-main">
        <a class="v2-brand" href="index.html" aria-label="Phoenix Inc | Development">
          <img src="./assets/logo-phoenix-ph.png" alt="">
          <span><b>Phoenix Inc |</b><small>Development</small></span>
        </a>
        <p>Scripts FiveM, bots Discord, web, applications et développement sur mesure.</p>
        <div class="v2-footer-links">
          <a href="scripts.html">Scripts</a>
          <a href="bots.html">Bots</a>
          <a href="services.html">Web · Apps · Autres</a>
          <a href="${config.discordUrl || 'https://discord.gg/xfWVss2KCv'}" target="_blank" rel="noopener">Discord</a>
          <a href="${config.githubUrl || 'https://github.com/Phoenix-k-dev'}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="v2-footer-bottom">
        <span>© 2026 Phoenix Inc | Development</span>
        <span>Conçu pour évoluer avec les projets.</span>
      </div>`;
  }

  function apply() {
    normalizeHeader();
    normalizeFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();

  // theme-toggle and language controls are injected just after the product shell.
  setTimeout(apply, 0);
  setTimeout(apply, 120);
  window.addEventListener('phoenix:langchange', apply);
})();