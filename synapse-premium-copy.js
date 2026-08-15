(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const copy = {
    fr: {
      kicker: 'SYNAPSE PREMIUM',
      title: 'Plus de contrôle.\nToujours dans Discord.',
      lead: 'Le Builder complet reste gratuit. Premium ajoute les outils avancés pour sauvegarder, protéger, automatiser et faire vivre votre serveur.',
      price: '3,99 €',
      cadence: '/ mois · / serveur · sans engagement',
      button: 'Passer Premium sur Discord ↗',
      hint: 'Ou consultez le statut depuis votre serveur :',
      benefits: [
        'Builder Pro · backups de structure',
        'Restauration des éléments manquants',
        'Templates personnels enregistrés',
        'AutoMod anti-spam, liens & mentions',
        'Filtre de mots / expressions',
        'Anti-Raid configurable',
        'Levels & XP + classement',
        'Salons vocaux temporaires',
        'Giveaways avec tirage automatique',
        'Commandes personnalisées',
        'Messages récurrents automatisés',
        'Activation serveur via Discord'
      ]
    },
    en: {
      kicker: 'SYNAPSE PREMIUM',
      title: 'More control.\nStill inside Discord.',
      lead: 'The complete Builder stays free. Premium adds advanced tools to back up, protect, automate and grow your server.',
      price: '€3.99',
      cadence: '/ month · / server · cancel anytime',
      button: 'Get Premium on Discord ↗',
      hint: 'Or check the status from your server:',
      benefits: [
        'Builder Pro · structure backups',
        'Restore missing server elements',
        'Saved personal templates',
        'AutoMod for spam, links & mentions',
        'Blocked words / expressions filter',
        'Configurable Anti-Raid',
        'Levels & XP + leaderboard',
        'Temporary voice channels',
        'Giveaways with automatic draws',
        'Custom commands',
        'Recurring automated messages',
        'Server-wide activation via Discord'
      ]
    }
  };

  let applying = false;
  function apply() {
    if (applying) return;
    const premium = document.querySelector('.syn-v2-premium');
    if (!premium) return;
    applying = true;

    const lang = localStorage.getItem('phoenix-lang') === 'en' || document.documentElement.lang === 'en' ? 'en' : 'fr';
    const t = copy[lang];
    const left = premium.firstElementChild;
    const list = premium.querySelector('.syn-v2-premium-list');

    const kicker = left?.querySelector('.syn-v2-kicker');
    if (kicker) kicker.textContent = t.kicker;
    const title = left?.querySelector('h2');
    if (title) title.innerHTML = t.title.replace('\n', '<br>');
    const lead = left?.querySelector('p');
    if (lead) lead.textContent = t.lead;
    const price = premium.querySelector('.syn-v2-premium-price strong');
    if (price) price.textContent = t.price;
    const cadence = premium.querySelector('.syn-v2-premium-price span');
    if (cadence) cadence.textContent = t.cadence;
    const premiumButton = left?.querySelector('a[href*="application-directory"]');
    if (premiumButton) premiumButton.textContent = t.button;
    const hint = premium.querySelector('.syn-premium-command-hint span');
    if (hint) hint.textContent = t.hint;
    if (list) list.innerHTML = t.benefits.map(item => `<span>${item}</span>`).join('');

    applying = false;
  }

  const observer = new MutationObserver(() => apply());
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['lang'] });
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  setTimeout(apply, 0);
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();
