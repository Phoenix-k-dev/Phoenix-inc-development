(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const config = window.PHOENIX_CONFIG || {};
  const copy = {
    fr: {
      home: 'Accueil', scripts: 'Scripts', bots: 'Bots', commands: 'Commandes', services: 'Web · Apps · Autres', quote: 'Faire un devis',
      footerCopy: 'Scripts FiveM, bots Discord, web, applications et développement sur mesure.',
      footerNote: 'Conçu pour évoluer avec les projets.'
    },
    en: {
      home: 'Home', scripts: 'Scripts', bots: 'Bots', commands: 'Commands', services: 'Web · Apps · More', quote: 'Get a quote',
      footerCopy: 'FiveM scripts, Discord bots, web, applications and custom development.',
      footerNote: 'Built to evolve with every project.'
    }
  };

  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'fr';

  function normalizeHeader() {
    const header = document.querySelector('.syn-v2-header');
    if (!header) return;
    const t = copy[lang()];

    header.classList.add('v2-header');
    header.setAttribute('data-site-header', '');

    const brand = header.querySelector('.syn-v2-brand');
    brand?.classList.add('v2-brand');

    const nav = header.querySelector('.syn-v2-nav');
    if (nav) {
      nav.classList.add('v2-nav');
      const links = [...nav.querySelectorAll('a')];
      const byFile = file => links.find(a => (a.getAttribute('href') || '').endsWith(file));
      if (byFile('index.html')) byFile('index.html').textContent = t.home;
      if (byFile('scripts.html')) byFile('scripts.html').textContent = t.scripts;
      if (byFile('bots.html')) byFile('bots.html').textContent = t.bots;
      if (byFile('synapse-commands.html')) byFile('synapse-commands.html').textContent = t.commands;
      if (byFile('services.html')) byFile('services.html').textContent = t.services;
    }

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
    }
    quote.innerHTML = `<span>${t.quote}</span> ↗`;

    const langButton = actions.querySelector('[data-syn-product-lang]');
    if (langButton) langButton.classList.add('v2-lang');
    const theme = actions.querySelector('[data-theme-toggle]');
    const menu = actions.querySelector('.syn-v2-menu');

    // Same order and same shell as the rest of the website.
    if (discord) actions.appendChild(discord);
    if (theme) actions.appendChild(theme);
    if (langButton) actions.appendChild(langButton);
    actions.appendChild(quote);
    if (menu) actions.appendChild(menu);
  }

  function normalizeFooter() {
    const footer = document.querySelector('.syn-v2-footer');
    if (!footer) return;
    const t = copy[lang()];

    footer.dataset.siteShellReady = 'true';
    footer.className = 'v2-footer syn-v2-footer';
    footer.innerHTML = `
      <div class="v2-footer-main">
        <a class="v2-brand" href="index.html" aria-label="Phoenix Inc | Development">
          <img src="./assets/logo-phoenix-ph.png" alt="">
          <span><b>Phoenix Inc |</b><small>Development</small></span>
        </a>
        <p>${t.footerCopy}</p>
        <div class="v2-footer-links">
          <a href="scripts.html">${t.scripts}</a>
          <a href="bots.html">${t.bots}</a>
          <a href="services.html">${t.services}</a>
          <a href="${config.discordUrl || 'https://discord.gg/xfWVss2KCv'}" target="_blank" rel="noopener">Discord</a>
          <a href="${config.githubUrl || 'https://github.com/Phoenix-k-dev'}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="v2-footer-bottom">
        <span>© 2026 Phoenix Inc | Development</span>
        <span>${t.footerNote}</span>
      </div>`;

    window.dispatchEvent(new CustomEvent('phoenix:footerready'));
  }

  function apply() {
    normalizeHeader();
    normalizeFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();

  setTimeout(apply, 0);
  setTimeout(apply, 120);
  window.addEventListener('phoenix:langchange', apply);
})();