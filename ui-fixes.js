(() => {
  const config = window.PHOENIX_CONFIG || {};

  const track = document.querySelector('.v2-marquee-track');
  if (track && !track.querySelector('.v2-marquee-group')) {
    const items = [...track.children].map(el => el.outerHTML).join('');
    track.innerHTML = `<div class="v2-marquee-group">${items}</div><div class="v2-marquee-group" aria-hidden="true">${items}</div>`;
  }

  const factualStudio = `
    <div class="v2-studio-top"><span><i></i><i></i><i></i></span><b>PHOENIX / DEVELOPMENT</b></div>
    <div class="phx-service-board">
      <div class="phx-board-head"><small>ACTIVITÉS</small><strong>Des produits et du sur-mesure.</strong></div>
      <div class="phx-board-grid">
        <a href="scripts.html"><span>01</span><b>Scripts FiveM</b><small>Gameplay · Economy · Utility</small><em>CATALOGUE →</em></a>
        <a href="bots.html"><span>02</span><b>Discord / Synapse</b><small>Builder · Tickets · Dashboard</small><em>DÉCOUVRIR →</em></a>
        <a href="services.html#web"><span>03</span><b>Sites web</b><small>Vitrines · Dashboards · UX/UI</small><em>SUR MESURE →</em></a>
        <a href="services.html#apps"><span>04</span><b>Apps & outils</b><small>Desktop · Mobile · Custom</small><em>PROJET →</em></a>
      </div>
    </div>`;

  const homeStudio = document.querySelector('.v2-home .v2-studio-panel');
  if (homeStudio) homeStudio.innerHTML = factualStudio;

  const botVisual = document.querySelector('.v2-bots .v2-bot-visual');
  if (botVisual) {
    botVisual.classList.add('phx-synapse-factual');
    botVisual.innerHTML = `
      <div class="phx-syn-head"><span>SYNAPSE</span><em>ONLINE</em></div>
      <div class="phx-syn-step"><small>01 / BUILD</small><b>Créer la structure du serveur</b><span>Templates · salons · rôles · permissions</span></div>
      <div class="phx-syn-arrow">↓</div>
      <div class="phx-syn-step"><small>02 / MANAGE</small><b>Tout modifier dans le dashboard</b><span>Builder · tickets · modération · communauté</span></div>
      <div class="phx-syn-foot"><span>FREE POUR COMMENCER</span><span>PREMIUM EN OPTION</span></div>`;
  }

  document.querySelectorAll('.v2-showcase .v2-spotlight-card').forEach(card => {
    if (!card.querySelector('h3')?.textContent.includes('Synapse')) return;
    const media = card.querySelector('.v2-spotlight-media');
    if (!media) return;
    media.innerHTML = `<div class="phx-carousel-synapse"><div class="pcs-top"><b>SYNAPSE</b><span>DISCORD PLATFORM</span></div><div class="pcs-flow"><article><small>SERVER BUILDER</small><b>Structure prête</b><span>Salons · rôles · permissions</span></article><i>→</i><article><small>DASHBOARD</small><b>Tout reste modifiable</b><span>Tickets · modules · réglages</span></article></div><div class="pcs-bottom"><span>FREE</span><em>Premium disponible quand nécessaire</em></div></div>`;
  });

  const showcaseTitle = document.querySelector('[data-v2-i18n="home.showcaseTitle"]');
  const showcaseCopy = document.querySelector('[data-v2-i18n="home.showcaseCopy"]');
  const applyHomeCopy = () => {
    const en = document.documentElement.lang === 'en';
    if (showcaseTitle) showcaseTitle.textContent = en ? 'Selected work, right now.' : 'À découvrir en ce moment.';
    if (showcaseCopy) showcaseCopy.textContent = en
      ? 'Products and projects currently worth a closer look. Open a category to browse everything available.'
      : 'Une sélection de produits et projets à découvrir. Ouvre ensuite une catégorie pour parcourir tout ce qui est disponible.';
  };
  applyHomeCopy();
  new MutationObserver(applyHomeCopy).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  const oldStripeCard = document.querySelector('[data-config-link="synapseStripeUrl"].v2-social-card');
  if (oldStripeCard) {
    oldStripeCard.removeAttribute('href');
    oldStripeCard.setAttribute('aria-disabled','true');
    oldStripeCard.querySelector('small')?.replaceChildren(document.createTextNode('SYNAPSE / PREMIUM'));
    const b = oldStripeCard.querySelector('b');
    if (b) b.textContent = 'Premium se gère dans Synapse';
  }
})();
