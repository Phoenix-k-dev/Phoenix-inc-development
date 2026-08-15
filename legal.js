(() => {
  const translations = {
    privacy: {
      en: {
        title: 'Privacy Policy.',
        intro: 'This policy explains how Phoenix Inc | Development processes data related to the website, contact forms and the Discord bot Synapse.',
        updated: 'Last updated: August 15, 2026',
        other: 'Terms of Service →'
      }
    },
    terms: {
      en: {
        title: 'Terms of Service.',
        intro: 'These terms govern the use of the Phoenix Inc | Development website, Synapse and related services.',
        updated: 'Last updated: August 15, 2026',
        other: 'Privacy Policy →'
      }
    }
  };

  const page = location.pathname.includes('privacy') ? 'privacy' : 'terms';
  const button = document.querySelector('[data-legal-lang]');
  if (!button) return;

  button.addEventListener('click', () => {
    const isEn = document.documentElement.lang === 'en';
    document.documentElement.lang = isEn ? 'fr' : 'en';
    if (!isEn) {
      const t = translations[page].en;
      const hero = document.querySelector('.legal-hero');
      const h1 = hero?.querySelector('h1');
      const intro = hero?.querySelector('p');
      const meta = hero?.querySelector('.legal-meta span');
      const other = hero?.querySelector('.legal-meta a');
      if (h1) h1.textContent = t.title;
      if (intro) intro.textContent = t.intro;
      if (meta) meta.textContent = t.updated;
      if (other) other.textContent = t.other;
      button.textContent = 'EN / FR';
    } else {
      location.reload();
    }
  });
})();