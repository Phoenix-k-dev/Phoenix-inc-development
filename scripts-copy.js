(() => {
  const copy = {
    fr: {
      title1: 'Des scripts pensés pour',
      title2: 'faire évoluer votre serveur.',
      lead: 'Découvrez nos scripts FiveM dédiés au gameplay, à l’économie, à l’administration et aux utilitaires. Parcourez le catalogue, filtrez selon vos besoins et ouvrez chaque fiche pour découvrir les fonctionnalités, la compatibilité et la disponibilité.'
    },
    en: {
      title1: 'Scripts built to',
      title2: 'move your server forward.',
      lead: 'Discover our FiveM scripts for gameplay, economy, administration and utilities. Browse the catalog, filter by what you need, and open each product page to explore features, compatibility and availability.'
    }
  };

  const apply = () => {
    const lang = localStorage.getItem('phoenix-lang') === 'en' ? 'en' : 'fr';
    document.querySelectorAll('[data-script-copy]').forEach((el) => {
      const key = el.getAttribute('data-script-copy');
      if (key && copy[lang][key]) el.textContent = copy[lang][key];
    });
  };

  document.querySelector('[data-lang-toggle-v2]')?.addEventListener('click', () => setTimeout(apply, 0));
  apply();
})();
