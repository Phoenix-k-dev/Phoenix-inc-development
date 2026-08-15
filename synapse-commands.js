(() => {
  const commands = [
    {cat:'Builder & adaptation',cmd:'/analyse_serveur',desc:'Analyse la structure, le style visuel, les rôles staff et les modules détectables sans modifier le serveur.',access:'Responsables'},
    {cat:'Builder & adaptation',cmd:'/builder template',desc:'Crée une structure complète depuis un template puis un preset visuel, avec aperçu privé avant validation.',access:'Responsables'},
    {cat:'Builder & adaptation',cmd:'/builder ajouter_salon',desc:'Ajoute un salon en analysant en priorité la DA des salons voisins de la catégorie choisie. Aucune analyse préalable n’est nécessaire.',access:'Responsables'},
    {cat:'Builder & adaptation',cmd:'/builder ajouter_categorie',desc:'Ajoute une catégorie en reprenant automatiquement le style global détecté du serveur.',access:'Responsables'},

    {cat:'Tickets',cmd:'/tickets analyser',desc:'Analyse les salons et catégories liés aux tickets puis recommande un template adapté au type de serveur.',access:'Responsables'},
    {cat:'Tickets',cmd:'/tickets installer',desc:'Détecte l’existant, propose mettre à jour / compléter / remplacer, puis affiche les templates et un aperçu avant installation.',access:'Responsables'},
    {cat:'Tickets',cmd:'/tickets voir',desc:'Affiche le template actif, le panel, la catégorie et les identifiants des types de tickets.',access:'Responsables'},
    {cat:'Tickets',cmd:'/tickets type_ajouter',desc:'Complète le template actif avec un bouton/type de ticket personnalisé et actualise automatiquement le panel.',access:'Responsables'},
    {cat:'Tickets',cmd:'/tickets type_retirer',desc:'Retire un type de ticket personnalisé et actualise automatiquement le panel.',access:'Responsables'},
    {cat:'Tickets',cmd:'/tickets ouvrir',desc:'Ouvre un ticket privé selon le type de demande configuré sur le serveur.',access:'Tous'},
    {cat:'Tickets',cmd:'/tickets fermer',desc:'Ferme le ticket Synapse actuel.',access:'Tous*'},

    {cat:'Communauté',cmd:'/annonce',desc:'Ouvre un formulaire pour publier une annonce structurée dans le salon actuel.',access:'Staff'},
    {cat:'Communauté',cmd:'/recherche',desc:'Publie une recherche structurée via un formulaire Synapse.',access:'Staff'},
    {cat:'Communauté',cmd:'/reglement',desc:'Publie un règlement propre dans le salon actuel.',access:'Staff'},
    {cat:'Communauté',cmd:'/avis',desc:'Laisse une note de 1 à 5 et un commentaire à un membre.',access:'Tous'},
    {cat:'Communauté',cmd:'/reputation',desc:'Affiche la note moyenne et le nombre d’avis d’un membre.',access:'Tous'},
    {cat:'Administration',cmd:'/aide_synapse',desc:'Affiche dans Discord les principales fonctions disponibles.',access:'Tous'},

    {cat:'Accès & permissions',cmd:'/permissions voir',desc:'Affiche les niveaux d’accès Synapse configurés sur le serveur.',access:'Responsables'},
    {cat:'Accès & permissions',cmd:'/permissions staff_ajouter',desc:'Déclare un rôle comme rôle staff Synapse.',access:'Responsables'},
    {cat:'Accès & permissions',cmd:'/permissions staff_retirer',desc:'Retire un rôle de la liste staff Synapse.',access:'Responsables'},
    {cat:'Accès & permissions',cmd:'/permissions niveau',desc:'Définit une commande comme publique, staff ou réservée aux responsables.',access:'Responsables'},
    {cat:'Accès & permissions',cmd:'/permissions autoriser_role',desc:'Autorise explicitement un rôle à utiliser une commande ou un module.',access:'Responsables'},
    {cat:'Accès & permissions',cmd:'/permissions retirer_role',desc:'Retire une autorisation de rôle personnalisée.',access:'Responsables'},

    {cat:'Premium',cmd:'/premium',desc:'Affiche le statut Premium du serveur et les options disponibles.',access:'Tous'},
    {cat:'Premium',cmd:'/redeem',desc:'Active un code Premium Synapse sur le serveur.',access:'Responsables'},

    {cat:'Interserver',cmd:'/generate_sync_code',desc:'Génère un code temporaire pour lier un salon avec un autre serveur.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/link_with_code',desc:'Relie un salon local à un salon distant via un code de synchronisation.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/revoke_sync_code',desc:'Invalide un code de synchronisation avant son expiration.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/link_channel',desc:'Lie directement deux salons accessibles par Synapse.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/unlink_channel',desc:'Retire une liaison directe entre deux salons.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/list_links',desc:'Affiche les liaisons Interserver configurées.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/set_alias',desc:'Définit un alias personnalisé pour un salon lié.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/reset_alias',desc:'Retire l’alias personnalisé d’un salon.',access:'Admin Discord'},
    {cat:'Interserver',cmd:'/unlink_alias',desc:'Retire une liaison en ciblant le salon distant via son alias.',access:'Admin Discord'},
    {cat:'Administration',cmd:'/set_language',desc:'Change la langue des réponses historiques Interserver pour le serveur.',access:'Admin Discord'}
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
    const list = commands.filter(item => (active==='Toutes'||item.cat===active) && (!query || `${item.cmd} ${item.desc} ${item.cat} ${item.access}`.toLowerCase().includes(query)));
    grid.innerHTML = list.length ? list.map(item=>`<article class="cmd-card"><div class="cmd-card-top"><span>${item.cat}</span></div><code>${item.cmd}</code><p>${item.desc}</p><footer><span>${item.access}</span><button type="button" data-copy="${item.cmd}">Copier</button></footer></article>`).join('') : '<div class="cmd-empty">Aucune commande ne correspond à votre recherche.</div>';
    grid.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy||'');const old=btn.textContent;btn.textContent='Copié ✓';setTimeout(()=>btn.textContent=old,1000);}catch{}}));
  };

  search?.addEventListener('input',()=>{query=search.value.trim().toLowerCase();render();});
  renderFilters(); render();
})();