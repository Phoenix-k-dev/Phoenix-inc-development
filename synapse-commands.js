(() => {
  const data = [
    {cat:'builder',fr:'/analyse_serveur',en:'/analyze_server',frDesc:'Analyse la structure et la DA du serveur sans rien modifier.',enDesc:'Analyzes server structure and visual style without changing anything.',access:'managers'},
    {cat:'builder',fr:'/builder template',en:'/builder template',frDesc:'Crée un serveur complet avec template, langue, style, rôles, permissions et Ticket Studio.',enDesc:'Builds a complete server with template, language, style, roles, permissions and Ticket Studio.',access:'managers'},
    {cat:'builder',fr:'/builder ajouter_salon',en:'/builder add_channel',frDesc:'Ajoute un salon en reprenant la DA de la catégorie choisie.',enDesc:'Adds a channel matching the selected category style.',access:'managers'},
    {cat:'builder',fr:'/builder ajouter_categorie',en:'/builder add_category',frDesc:'Ajoute une catégorie dans la DA détectée.',enDesc:'Adds a category matching the detected style.',access:'managers'},
    {cat:'builder',fr:'/builder categorie_complete',en:'/builder complete_category',frDesc:'Crée une catégorie et plusieurs salons en une seule commande.',enDesc:'Creates a category and several channels in one command.',access:'managers'},
    {cat:'builder',fr:'/rollback',en:'/rollback',frDesc:'Annule la dernière création du Builder Synapse : salons, catégories et rôles suivis.',enDesc:'Undoes the latest Synapse Builder creation: tracked channels, categories and roles.',access:'discordAdmin'},
    {cat:'builder',fr:'/reset',en:'/reset',frDesc:'Remet le Discord à zéro : salons, catégories et rôles supprimables. Un salon general est conservé pour les commandes.',enDesc:'Resets the Discord server: removable channels, categories and roles. One general channel is kept for commands.',access:'discordAdmin'},

    {cat:'tickets',fr:'/tickets analyser',en:'/tickets analyze',frDesc:'Analyse les tickets existants et recommande un template adapté.',enDesc:'Analyzes existing tickets and recommends a suitable template.',access:'managers'},
    {cat:'tickets',fr:'/tickets installer',en:'/tickets install',frDesc:'Installe ou améliore Ticket Studio avec détection, aperçu et confirmation.',enDesc:'Installs or improves Ticket Studio with detection, preview and confirmation.',access:'managers'},
    {cat:'tickets',fr:'/tickets voir',en:'/tickets view',frDesc:'Affiche le template actif, le panel et les types disponibles.',enDesc:'Shows the active template, panel and available ticket types.',access:'managers'},
    {cat:'tickets',fr:'/tickets type_ajouter',en:'/tickets add_type',frDesc:'Ajoute un type de ticket personnalisé.',enDesc:'Adds a custom ticket type.',access:'managers'},
    {cat:'tickets',fr:'/tickets type_retirer',en:'/tickets remove_type',frDesc:'Retire un type de ticket personnalisé.',enDesc:'Removes a custom ticket type.',access:'managers'},
    {cat:'tickets',fr:'/tickets ouvrir',en:'/tickets open',frDesc:'Ouvre un ticket privé.',enDesc:'Opens a private ticket.',access:'everyone'},
    {cat:'tickets',fr:'/tickets fermer',en:'/tickets close',frDesc:'Ferme le ticket Synapse actuel.',enDesc:'Closes the current Synapse ticket.',access:'everyone'},

    {cat:'community',fr:'/annonce',en:'/announcement',frDesc:'Publie une annonce structurée.',enDesc:'Publishes a structured announcement.',access:'staff'},
    {cat:'community',fr:'/recherche',en:'/search',frDesc:'Publie une recherche ou une demande. Accessible à tous.',enDesc:'Publishes a search or request. Available to everyone.',access:'everyone'},
    {cat:'community',fr:'/reglement',en:'/rules',frDesc:'Publie un règlement propre.',enDesc:'Publishes a clean rules message.',access:'staff'},
    {cat:'community',fr:'/avis',en:'/review',frDesc:'Laisse une note et un commentaire à un membre.',enDesc:'Leaves a rating and comment for a member.',access:'everyone'},
    {cat:'community',fr:'/reputation',en:'/reputation',frDesc:'Affiche la réputation d’un membre.',enDesc:'Shows a member reputation.',access:'everyone'},
    {cat:'community',fr:'/commandes',en:'/commands',frDesc:'Affiche les commandes directement dans Discord.',enDesc:'Shows the command list directly inside Discord.',access:'everyone'},

    {cat:'access',fr:'/permissions voir',en:'/permissions view',frDesc:'Affiche les règles d’accès actuelles.',enDesc:'Shows current access rules.',access:'managers'},
    {cat:'access',fr:'/permissions niveau',en:'/permissions level',frDesc:'Définit une commande comme publique, staff ou responsables.',enDesc:'Sets a command to everyone, staff or managers.',access:'managers'},
    {cat:'access',fr:'/permissions staff_ajouter',en:'/permissions staff_add',frDesc:'Ajoute un rôle à la liste staff Synapse.',enDesc:'Adds a role to the Synapse staff list.',access:'managers'},
    {cat:'access',fr:'/permissions staff_retirer',en:'/permissions staff_remove',frDesc:'Retire un rôle de la liste staff Synapse.',enDesc:'Removes a role from the Synapse staff list.',access:'managers'},
    {cat:'access',fr:'/permissions autoriser_role',en:'/permissions allow_role',frDesc:'Autorise un rôle précis pour une commande.',enDesc:'Allows a specific role for a command.',access:'managers'},
    {cat:'access',fr:'/permissions retirer_role',en:'/permissions remove_role',frDesc:'Retire une autorisation personnalisée.',enDesc:'Removes a custom role permission.',access:'managers'},

    {cat:'premium',fr:'/premium',en:'/premium',frDesc:'Affiche le statut et les informations Premium.',enDesc:'Shows Premium status and information.',access:'everyone'},
    {cat:'premium',fr:'/redeem',en:'/redeem',frDesc:'Active un code Premium sur le serveur.',enDesc:'Redeems a Premium code on the server.',access:'managers'},

    {cat:'interserver',fr:'/generer_code',en:'/generate_sync_code',frDesc:'Génère un code temporaire de synchronisation.',enDesc:'Generates a temporary synchronization code.',access:'discordAdmin'},
    {cat:'interserver',fr:'/lier_avec_code',en:'/link_with_code',frDesc:'Relie un salon via un code.',enDesc:'Links a channel using a code.',access:'discordAdmin'},
    {cat:'interserver',fr:'/revoquer_code',en:'/revoke_sync_code',frDesc:'Invalide un code de synchronisation.',enDesc:'Revokes a synchronization code.',access:'discordAdmin'},
    {cat:'interserver',fr:'/lier_salon',en:'/link_channel',frDesc:'Lie directement deux salons.',enDesc:'Directly links two channels.',access:'discordAdmin'},
    {cat:'interserver',fr:'/delier_salon',en:'/unlink_channel',frDesc:'Supprime une liaison entre deux salons.',enDesc:'Removes a link between two channels.',access:'discordAdmin'},
    {cat:'interserver',fr:'/lister_liaisons',en:'/list_links',frDesc:'Affiche les liaisons Interserver.',enDesc:'Shows Interserver links.',access:'discordAdmin'},
    {cat:'interserver',fr:'/definir_alias',en:'/set_alias',frDesc:'Définit un alias pour un salon lié.',enDesc:'Sets an alias for a linked channel.',access:'discordAdmin'},
    {cat:'interserver',fr:'/reinitialiser_alias',en:'/reset_alias',frDesc:'Retire l’alias personnalisé.',enDesc:'Removes the custom alias.',access:'discordAdmin'},
    {cat:'interserver',fr:'/delier_alias',en:'/unlink_alias',frDesc:'Supprime une liaison via son alias.',enDesc:'Removes a link using its alias.',access:'discordAdmin'},
    {cat:'interserver',fr:'/definir_langue',en:'/set_language',frDesc:'Change la langue des réponses Interserver.',enDesc:'Changes the Interserver reply language.',access:'discordAdmin'}
  ];

  const text = {
    fr:{nav:{home:'Accueil',scripts:'Scripts',bots:'Bots',commands:'Commandes',services:'Web · Apps · Autres'},quote:'Faire un devis',footerCopy:'Scripts FiveM, bots Discord, web, applications et développement sur mesure.',footerNote:'Conçu pour évoluer avec les projets.',kicker:'SYNAPSE / COMMANDES',title:'Tout Synapse,<br><span>directement dans Discord.</span>',lead:'Retrouvez les commandes disponibles pour construire, adapter et administrer Synapse directement depuis Discord.',helpCommand:'/commandes',helpText:'Affiche toutes les commandes directement dans Discord.',back:'Voir la fiche Synapse →',placeholder:'Rechercher une commande…',all:'Toutes',copy:'Copier',copied:'Copié ✓',empty:'Aucune commande ne correspond à votre recherche.',futureKicker:'MISE À JOUR FUTURE',futureTitle:'Dashboard Web Synapse',futureCopy:'Un Dashboard Web complet est en développement pour les futures versions de Synapse.',futureBuilder:'Structure & adaptation',security:'SÉCURITÉ',futureSecurity:'AutoMod & protections',multi:'MULTI-SERVEURS',futureMulti:'Gestion centralisée',cats:{builder:'Builder & adaptation',tickets:'Tickets',community:'Communauté',access:'Accès & permissions',premium:'Premium',interserver:'Interserver'},access:{everyone:'Tous',staff:'Staff',managers:'Responsables',discordAdmin:'Admin Discord'}},
    en:{nav:{home:'Home',scripts:'Scripts',bots:'Bots',commands:'Commands',services:'Web · Apps · More'},quote:'Get a quote',footerCopy:'FiveM scripts, Discord bots, web, applications and custom development.',footerNote:'Built to evolve with every project.',kicker:'SYNAPSE / COMMANDS',title:'All of Synapse,<br><span>directly inside Discord.</span>',lead:'Browse the commands available to build, adapt and manage Synapse directly from Discord.',helpCommand:'/commands',helpText:'Shows every command directly inside Discord.',back:'View Synapse →',placeholder:'Search a command…',all:'All',copy:'Copy',copied:'Copied ✓',empty:'No command matches your search.',futureKicker:'FUTURE UPDATE',futureTitle:'Synapse Web Dashboard',futureCopy:'A complete Web Dashboard is being developed for future Synapse versions.',futureBuilder:'Structure & adaptation',security:'SECURITY',futureSecurity:'AutoMod & protection',multi:'MULTI-SERVER',futureMulti:'Centralized management',cats:{builder:'Builder & adaptation',tickets:'Tickets',community:'Community',access:'Access & permissions',premium:'Premium',interserver:'Interserver'},access:{everyone:'Everyone',staff:'Staff',managers:'Managers',discordAdmin:'Discord Admin'}}
  };

  const grid=document.querySelector('[data-command-grid]');
  const filters=document.querySelector('[data-command-filters]');
  const search=document.querySelector('[data-command-search]');
  const toggle=document.querySelector('[data-command-lang]');
  const header=document.querySelector('.v2-header');
  if(!grid||!filters)return;
  let lang=localStorage.getItem('phoenix-lang')==='en'?'en':'fr',active='all',query='';

  function applyStatic(){const t=text[lang];document.documentElement.lang=lang;localStorage.setItem('phoenix-lang',lang);document.title=lang==='fr'?'Commandes Synapse — Phoenix Inc | Development':'Synapse Commands — Phoenix Inc | Development';document.querySelectorAll('[data-cmd-nav]').forEach(el=>{el.textContent=t.nav[el.dataset.cmdNav]||el.textContent;});document.querySelectorAll('[data-cmd-text]').forEach(el=>{const key=el.dataset.cmdText;if(t[key]!=null)el.textContent=t[key];});document.querySelectorAll('[data-cmd-html]').forEach(el=>{const key=el.dataset.cmdHtml;if(t[key]!=null)el.innerHTML=t[key];});const quote=document.querySelector('[data-cmd-quote]');if(quote)quote.textContent=t.quote;const footerCopy=document.querySelector('[data-cmd-footer-copy]');if(footerCopy)footerCopy.textContent=t.footerCopy;const footerNote=document.querySelector('[data-cmd-footer-note]');if(footerNote)footerNote.textContent=t.footerNote;if(search)search.placeholder=t.placeholder;toggle?.classList.toggle('en',lang==='en');}
  const categories=['all',...new Set(data.map(x=>x.cat))];
  function renderFilters(){const t=text[lang];filters.innerHTML=categories.map(cat=>`<button class="${cat===active?'active':''}" data-cat="${cat}">${cat==='all'?t.all:t.cats[cat]}</button>`).join('');filters.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.cat||'all';renderFilters();render();}));}
  function render(){const t=text[lang];const list=data.filter(item=>(active==='all'||item.cat===active)&&(!query||`${item[lang]} ${lang==='fr'?item.frDesc:item.enDesc} ${t.cats[item.cat]} ${t.access[item.access]}`.toLowerCase().includes(query)));grid.innerHTML=list.length?list.map(item=>`<article class="cmd-card"><div class="cmd-card-top"><span>${t.cats[item.cat]}</span></div><code>${item[lang]}</code><p>${lang==='fr'?item.frDesc:item.enDesc}</p><footer><span>${t.access[item.access]}</span><button type="button" data-copy="${item[lang].replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">${t.copy}</button></footer></article>`).join(''):`<div class="cmd-empty">${t.empty}</div>`;grid.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy||'');btn.textContent=t.copied;setTimeout(()=>btn.textContent=t.copy,1000);}catch{}}));}
  function refresh(){applyStatic();renderFilters();render();window.dispatchEvent(new CustomEvent('phoenix:langchange',{detail:{lang}}));}
  toggle?.addEventListener('click',()=>{lang=lang==='fr'?'en':'fr';refresh();});
  search?.addEventListener('input',()=>{query=search.value.trim().toLowerCase();render();});
  document.querySelector('[data-menu-toggle]')?.addEventListener('click',()=>header?.classList.toggle('open'));
  refresh();
})();