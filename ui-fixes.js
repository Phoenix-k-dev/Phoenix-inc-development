(() => {
  const config = window.PHOENIX_CONFIG || {};

  const copy = {
    fr: {
      activities: 'ACTIVITÉS',
      products: 'Des produits et du sur-mesure.',
      scripts: 'Scripts FiveM',
      scriptsMeta: 'Gameplay · Economy · Utility',
      scriptsCta: 'CATALOGUE →',
      synapse: 'Discord / Synapse',
      synapseMeta: 'Builder · Tickets · Dashboard',
      synapseCta: 'DÉCOUVRIR →',
      web: 'Sites web',
      webMeta: 'Vitrines · Dashboards · UX/UI',
      webCta: 'SUR MESURE →',
      apps: 'Apps & outils',
      appsMeta: 'Desktop · Mobile · Custom',
      appsCta: 'PROJET →',
      synBuild: 'Créer la structure du serveur',
      synBuildMeta: 'Templates · salons · rôles · permissions',
      synManage: 'Tout modifier dans le dashboard',
      synManageMeta: 'Builder · tickets · modération · communauté',
      synFree: 'FREE POUR COMMENCER',
      synPremium: 'PREMIUM EN OPTION',
      carouselReady: 'Structure prête',
      carouselReadyMeta: 'Salons · rôles · permissions',
      carouselManage: 'Tout reste modifiable',
      carouselManageMeta: 'Tickets · modules · réglages',
      carouselPremium: 'Premium disponible quand nécessaire',
      showcaseTitle: 'À découvrir en ce moment.',
      showcaseCopy: 'Une sélection de produits et projets à découvrir. Ouvre ensuite une catégorie pour parcourir tout ce qui est disponible.',
      premiumDisabled: 'Premium se gère dans Synapse'
    },
    en: {
      activities: 'ACTIVITIES',
      products: 'Products and custom work.',
      scripts: 'FiveM Scripts',
      scriptsMeta: 'Gameplay · Economy · Utility',
      scriptsCta: 'CATALOGUE →',
      synapse: 'Discord / Synapse',
      synapseMeta: 'Builder · Tickets · Dashboard',
      synapseCta: 'DISCOVER →',
      web: 'Websites',
      webMeta: 'Showcases · Dashboards · UX/UI',
      webCta: 'CUSTOM →',
      apps: 'Apps & tools',
      appsMeta: 'Desktop · Mobile · Custom',
      appsCta: 'PROJECT →',
      synBuild: 'Build the server structure',
      synBuildMeta: 'Templates · channels · roles · permissions',
      synManage: 'Manage everything in the dashboard',
      synManageMeta: 'Builder · tickets · moderation · community',
      synFree: 'FREE TO START',
      synPremium: 'PREMIUM OPTIONAL',
      carouselReady: 'Structure ready',
      carouselReadyMeta: 'Channels · roles · permissions',
      carouselManage: 'Everything stays editable',
      carouselManageMeta: 'Tickets · modules · settings',
      carouselPremium: 'Premium available when needed',
      showcaseTitle: 'Selected work, right now.',
      showcaseCopy: 'Products and projects currently worth a closer look. Open a category to browse everything available.',
      premiumDisabled: 'Manage Premium inside Synapse'
    }
  };

  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const t = () => copy[lang()];

  const track = document.querySelector('.v2-marquee-track');
  if (track && !track.querySelector('.v2-marquee-group')) {
    const items = [...track.children].map(el => el.outerHTML).join('');
    track.innerHTML = `<div class="v2-marquee-group">${items}</div><div class="v2-marquee-group" aria-hidden="true">${items}</div>`;
  }

  function renderFactualBlocks() {
    const c = t();
    const homeStudio = document.querySelector('.v2-home .v2-studio-panel');
    if (homeStudio) {
      homeStudio.innerHTML = `
        <div class="v2-studio-top"><span><i></i><i></i><i></i></span><b>PHOENIX / DEVELOPMENT</b></div>
        <div class="phx-service-board">
          <div class="phx-board-head"><small>${c.activities}</small><strong>${c.products}</strong></div>
          <div class="phx-board-grid">
            <a href="scripts.html"><span>01</span><b>${c.scripts}</b><small>${c.scriptsMeta}</small><em>${c.scriptsCta}</em></a>
            <a href="bots.html"><span>02</span><b>${c.synapse}</b><small>${c.synapseMeta}</small><em>${c.synapseCta}</em></a>
            <a href="services.html#web"><span>03</span><b>${c.web}</b><small>${c.webMeta}</small><em>${c.webCta}</em></a>
            <a href="services.html#apps"><span>04</span><b>${c.apps}</b><small>${c.appsMeta}</small><em>${c.appsCta}</em></a>
          </div>
        </div>`;
    }

    const botVisual = document.querySelector('.v2-bots .v2-bot-visual');
    if (botVisual) {
      botVisual.classList.add('phx-synapse-factual');
      botVisual.innerHTML = `
        <div class="phx-syn-head"><span>SYNAPSE</span><em>ONLINE</em></div>
        <div class="phx-syn-step"><small>01 / BUILD</small><b>${c.synBuild}</b><span>${c.synBuildMeta}</span></div>
        <div class="phx-syn-arrow">↓</div>
        <div class="phx-syn-step"><small>02 / MANAGE</small><b>${c.synManage}</b><span>${c.synManageMeta}</span></div>
        <div class="phx-syn-foot"><span>${c.synFree}</span><span>${c.synPremium}</span></div>`;
    }

    document.querySelectorAll('.v2-showcase .v2-spotlight-card').forEach(card => {
      if (!card.querySelector('h3')?.textContent.includes('Synapse')) return;
      const media = card.querySelector('.v2-spotlight-media');
      if (!media) return;
      media.innerHTML = `<div class="phx-carousel-synapse"><div class="pcs-top"><b>SYNAPSE</b><span>DISCORD PLATFORM</span></div><div class="pcs-flow"><article><small>SERVER BUILDER</small><b>${c.carouselReady}</b><span>${c.carouselReadyMeta}</span></article><i>→</i><article><small>DASHBOARD</small><b>${c.carouselManage}</b><span>${c.carouselManageMeta}</span></article></div><div class="pcs-bottom"><span>FREE</span><em>${c.carouselPremium}</em></div></div>`;
    });

    const showcaseTitle = document.querySelector('[data-v2-i18n="home.showcaseTitle"]');
    const showcaseCopy = document.querySelector('[data-v2-i18n="home.showcaseCopy"]');
    if (showcaseTitle) showcaseTitle.textContent = c.showcaseTitle;
    if (showcaseCopy) showcaseCopy.textContent = c.showcaseCopy;

    const oldStripeCard = document.querySelector('[data-config-link="synapseStripeUrl"].v2-social-card');
    if (oldStripeCard) {
      oldStripeCard.removeAttribute('href');
      oldStripeCard.setAttribute('aria-disabled','true');
      oldStripeCard.querySelector('small')?.replaceChildren(document.createTextNode('SYNAPSE / PREMIUM'));
      const b = oldStripeCard.querySelector('b');
      if (b) b.textContent = c.premiumDisabled;
    }
  }

  renderFactualBlocks();
  new MutationObserver(mutations => {
    if (mutations.some(m => m.type === 'attributes' && m.attributeName === 'lang')) renderFactualBlocks();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();