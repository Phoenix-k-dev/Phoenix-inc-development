(() => {
  const commands = [
    {cat:'Builder & adaptation',cmd:'/analyse_serveur',desc:'Analyse salons, catégories, rôles, permissions et modules existants sans modifier le serveur.',access:'Admin'},
    {cat:'Builder & adaptation',cmd:'/setup',desc:'Point d’entrée pour créer, compléter ou optimiser un serveur avec Synapse.',access:'Admin',future:true},
    {cat:'Builder & adaptation',cmd:'/builder',desc:'Créer ou modifier une structure, un salon, une catégorie, un rôle, un embed ou un module.',access:'Admin',future:true},
    {cat:'Tickets',cmd:'/tickets analyser',desc:'Détecte le système de tickets déjà présent et les éléments qui lui sont liés.',access:'Admin'},
    {cat:'Tickets',cmd:'/tickets installer',desc:'Installe le système de tickets Synapse sans supprimer l’existant.',access:'Admin'},
    {cat:'Tickets',cmd:'/tickets remplacer',desc:'Prépare le remplacement de l’ancien système, affiche ce qui sera retiré puis demande confirmation.',access:'Admin'},
    {cat:'Tickets',cmd:'/tickets ouvrir',desc:'Ouvre un ticket privé Synapse.',access:'Tous'},
    {cat:'Tickets',cmd:'/tickets fermer',desc:'Ferme le ticket Synapse actuel.',access:'Staff'},
    {cat:'Communauté',cmd:'/annonce',desc:'Ouvre un formulaire pour créer une annonce propre dans le salon actuel.',access:'Staff'},
    {cat:'Communauté',cmd:'/reglement',desc:'Publie ou affiche un règlement propre pouvant ensuite être remplacé par le Builder.',access:'Admin'},
    {cat:'Communauté',cmd:'/avis',desc:'Laisse une note et un commentaire à un membre.',access:'Tous'},
    {cat:'Communauté',cmd:'/reputation',desc:'Affiche la note moyenne et le nombre d’avis d’un membre.',access:'Tous'},
    {cat:'Interserver',cmd:'/generate_sync_code',desc:'Génère un code temporaire pour rendre un salon disponible à une liaison distante.',access:'Admin'},
    {cat:'Interserver',cmd:'/link_with_code',desc:'Relie un salon local à un salon d’un autre serveur avec le code de synchronisation.',access:'Admin'},
    {cat:'Interserver',cmd:'/revoke_sync_code',desc:'Invalide un code de synchronisation avant son expiration.',access:'Admin'},
    {cat:'Interserver',cmd:'/link_channel',desc:'Lie directement deux salons accessibles par Synapse.',access:'Admin'},
    {cat:'Interserver',cmd:'/unlink_channel',desc:'Retire une liaison directe entre deux salons.',access:'Admin'},
    {cat:'Interserver',cmd:'/list_links',desc:'Affiche toutes les liaisons Interserver configurées.',access:'Admin'},
    {cat:'Interserver',cmd:'/set_alias',desc:'Définit un alias pour cibler facilement un salon lié avec @alias.',access:'Admin'},
    {cat:'Interserver',cmd:'/reset_alias',desc:'Retire l’alias personnalisé d’un salon.',access:'Admin'},
    {cat:'Interserver',cmd:'/unlink_alias',desc:'Retire une liaison en ciblant le salon distant via son alias.',access:'Admin'},
    {cat:'Administration',cmd:'/set_language',desc:'Change la langue de Synapse pour le serveur.',access:'Admin'},
    {cat:'Administration',cmd:'/aide_synapse',desc:'Affiche directement dans Discord les principales commandes et modules disponibles.',access:'Tous'},
    {cat:'Premium',cmd:'/premium',desc:'Affiche l’offre Premium, l’état du serveur et les options d’abonnement directement dans Discord.',access:'Admin',future:true},
    {cat:'Premium',cmd:'/redeem',desc:'Active un code Premium unique, limité dans le temps ou à vie.',access:'Admin',future:true},
    {cat:'Administration',cmd:'/dashboard',desc:'Prévu pour une future mise à jour : ouvrira directement le Dashboard web du serveur.',access:'Admin',future:true}
  ];

  const grid = document.querySelector('[data-command-grid]');
  const filters = document.querySelector('[data-command-filters]');
  const search = document.querySelector('[data-command-search]');
  if (!grid || !filters) return;

  const cats = ['Toutes', ...new Set(commands.map(c=>c.cat))];
  let active = 'Toutes';
  let query = '';

  const renderFilters = () => {
    filters.innerHTML = cats.map(cat=>`<button class="${cat===active?'active':''}" data-cat="${cat}">${cat}</button>`).join('');
    filters.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.cat||'Toutes';renderFilters();render();}));
  };

  const render = () => {
    const list = commands.filter(item => (active==='Toutes'||item.cat===active) && (!query || `${item.cmd} ${item.desc} ${item.cat}`.toLowerCase().includes(query)));
    grid.innerHTML = list.length ? list.map(item=>`<article class="cmd-card"><div class="cmd-card-top"><span>${item.cat}</span>${item.future?'<em>À VENIR</em>':''}</div><code>${item.cmd}</code><p>${item.desc}</p><footer><span>${item.access}</span><button type="button" data-copy="${item.cmd}">Copier</button></footer></article>`).join('') : '<div class="cmd-empty">Aucune commande ne correspond à votre recherche.</div>';
    grid.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy||'');const old=btn.textContent;btn.textContent='Copié ✓';setTimeout(()=>btn.textContent=old,1000);}catch{}}));
  };

  search?.addEventListener('input',()=>{query=search.value.trim().toLowerCase();render();});
  renderFilters(); render();
})();