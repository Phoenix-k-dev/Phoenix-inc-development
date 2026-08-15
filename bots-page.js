(() => {
  if (!document.body.classList.contains('v2-bots')) return;

  const config = window.PHOENIX_CONFIG || {};
  const translations = {
    fr: {
      'nav.home':'Accueil','nav.scripts':'Scripts','nav.bots':'Bots','nav.services':'Web · Apps · Autres','nav.quote':'Faire un devis',
      'footer.copy':'Scripts FiveM, bots Discord, web, applications et développement sur mesure.','footer.note':'Conçu pour évoluer avec les projets.',
      'bots.title1':'Des bots qui font','bots.title2':'plus qu’une commande.','bots.lead':'Découvrez les outils Discord Phoenix Inc | Development. Synapse ouvre la gamme avec une plateforme pensée pour construire, organiser et faire évoluer votre serveur depuis Discord.',
      'bots.synapseCopy':'Synapse est un bot Discord adaptatif pensé pour construire, analyser et améliorer un serveur sans repartir de zéro.',
      'bots.details':'Voir la fiche complète','bots.invite':'Inviter Synapse','bots.futureKicker':'LA SUITE','bots.futureTitle':'D’autres outils viendront compléter la gamme.','bots.futureCopy':'Synapse est le premier bot de la gamme Phoenix Inc | Development. Les prochaines solutions Discord seront présentées ici au fur et à mesure de leur sortie.','bots.stat1':'Création de serveur','bots.stat2':'Modules réunis','bots.stat3':'Questions & aide'
    },
    en: {
      'nav.home':'Home','nav.scripts':'Scripts','nav.bots':'Bots','nav.services':'Web · Apps · Other','nav.quote':'Request a quote',
      'footer.copy':'FiveM scripts, Discord bots, web, applications and custom development.','footer.note':'Built to evolve with the projects.',
      'bots.title1':'Bots that do','bots.title2':'more than one command.','bots.lead':'Discover Discord tools by Phoenix Inc | Development. Synapse leads the range with a platform built to create, organise and evolve your server directly from Discord.',
      'bots.synapseCopy':'Synapse is an adaptive Discord bot built to create, analyse and improve a server without starting over.',
      'bots.details':'View full page','bots.invite':'Invite Synapse','bots.futureKicker':'WHAT’S NEXT','bots.futureTitle':'More tools will join the range.','bots.futureCopy':'Synapse is the first bot in the Phoenix Inc | Development range. Future Discord solutions will be showcased here as they are released.','bots.stat1':'Server creation','bots.stat2':'Unified modules','bots.stat3':'Questions & help'
    }
  };

  let lang = localStorage.getItem('phoenix-lang') === 'en' ? 'en' : 'fr';

  const hydrateLinks = () => {
    document.querySelectorAll('[data-config-link]').forEach(el => {
      const key = el.dataset.configLink;
      const url = config[key];
      if (url) {
        el.href = url;
        el.classList.remove('disabled');
        el.removeAttribute('aria-disabled');
      }
    });
  };

  const apply = () => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-v2-i18n]').forEach(el => {
      const value = translations[lang]?.[el.dataset.v2I18n];
      if (value != null) el.textContent = value;
    });
    document.querySelector('[data-lang-toggle-v2]')?.classList.toggle('en', lang === 'en');
    hydrateLinks();
  };

  document.querySelector('[data-lang-toggle-v2]')?.addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('phoenix-lang', lang);
    apply();
  });

  const header = document.querySelector('[data-site-header]');
  document.querySelector('[data-menu-toggle]')?.addEventListener('click', () => header?.classList.toggle('open'));

  apply();
})();
