(() => {
  if (!document.body.classList.contains('v2-bots')) return;

  const copy = {
    fr: {
      description: "Synapse est un bot Discord adaptatif pensé pour construire, analyser et améliorer un serveur sans repartir de zéro. Son Builder peut créer une structure complète ou s'adapter à l'existant, détecter les salons, rôles et systèmes déjà présents, puis compléter ou remplacer proprement les modules demandés. Tickets, messages et embeds, communauté, Interserver, modération et Premium se pilotent directement depuis Discord.",
      tags: ['Adaptive Builder','Tickets','Messages & embeds','Communauté','Interserver','Commandes Discord'],
      releases: [
        ['V1.2','Builder adaptatif','Analyse du serveur existant, détection des modules et adaptation sans doublons.'],
        ['V1.1','Tickets intelligents','Installation ou remplacement sécurisé d’un ancien système après confirmation.'],
        ['V1.0','Interserver & commandes','Liaisons entre serveurs, annonces, règlement, avis et commandes Discord.']
      ],
      badge: 'DERNIÈRES MISES À JOUR'
    },
    en: {
      description: 'Synapse is an adaptive Discord bot built to create, analyse and improve a server without starting over. Its Builder can generate a complete structure or adapt to what already exists, detect channels, roles and existing systems, then complete or safely replace the requested modules. Tickets, messages and embeds, community tools, Interserver, moderation and Premium are controlled directly from Discord.',
      tags: ['Adaptive Builder','Tickets','Messages & embeds','Community','Interserver','Discord commands'],
      releases: [
        ['V1.2','Adaptive Builder','Analyse an existing server, detect modules and adapt without creating duplicates.'],
        ['V1.1','Smart tickets','Install or safely replace an existing ticket system after confirmation.'],
        ['V1.0','Interserver & commands','Server links, announcements, rules, reviews and Discord commands.']
      ],
      badge: 'LATEST UPDATES'
    }
  };

  const getLang = () => document.documentElement.lang === 'en' ? 'en' : 'fr';

  function apply() {
    const t = copy[getLang()];
    const description = document.querySelector('[data-v2-i18n="bots.synapseCopy"]');
    if (description) description.textContent = t.description;

    const tags = document.querySelector('.v2-bot-copy .v2-product-tags');
    if (tags) tags.innerHTML = t.tags.map(tag => `<span class="v2-tag">${tag}</span>`).join('');

    const visual = document.querySelector('.v2-bots .v2-bot-visual');
    if (visual) {
      visual.classList.add('phx-synapse-factual','phx-synapse-releases');
      visual.innerHTML = `
        <div class="phx-syn-head"><span>SYNAPSE</span><em>${t.badge}</em></div>
        <div class="phx-release-list">
          ${t.releases.map((r,i)=>`<article class="${i===0?'latest':''}"><small>${r[0]}</small><div><b>${r[1]}</b><span>${r[2]}</span></div></article>`).join('')}
        </div>`;
    }
  }

  apply();
  new MutationObserver(mutations => {
    if (mutations.some(m => m.type === 'attributes' && m.attributeName === 'lang')) setTimeout(apply,0);
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();