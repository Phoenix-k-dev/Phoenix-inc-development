(() => {
  const data = [
    {cat:'builder',fr:'/scan',en:'/scan',frDesc:'Analyse la structure et la DA du serveur sans rien modifier.',enDesc:'Analyzes the server structure and visual style without changing anything.',access:'managers'},
    {cat:'builder',fr:'/builder setup',en:'/builder setup',frDesc:'Crée un serveur complet depuis un template, avec langue, style, rôles et permissions.',enDesc:'Builds a complete server from a template with language, style, roles and permissions.',access:'managers'},
    {cat:'builder',fr:'/builder salon',en:'/builder salon',frDesc:'Ajoute un salon en reprenant la DA de la catégorie choisie.',enDesc:'Adds a channel matching the selected category style.',access:'managers'},
    {cat:'builder',fr:'/builder categorie',en:'/builder categorie',frDesc:'Ajoute une catégorie dans la DA détectée.',enDesc:'Adds a category matching the detected style.',access:'managers'},
    {cat:'builder',fr:'/builder section',en:'/builder section',frDesc:'Crée une catégorie et plusieurs salons en une seule commande.',enDesc:'Creates a category and several channels in one command.',access:'managers'},
    {cat:'builder',fr:'/rollback',en:'/rollback',frDesc:'Annule la dernière création suivie par le Builder Synapse.',enDesc:'Undoes the latest tracked Synapse Builder creation.',access:'discordAdmin'},
    {cat:'builder',fr:'/reset',en:'/reset',frDesc:'Réinitialise proprement le Discord tout en conservant un salon pour les commandes.',enDesc:'Safely resets the Discord server while keeping one channel for commands.',access:'discordAdmin'},

    {cat:'tickets',fr:'/ticket scan',en:'/ticket scan',frDesc:'Analyse le système de tickets existant.',enDesc:'Analyzes the existing ticket system.',access:'managers'},
    {cat:'tickets',fr:'/ticket setup',en:'/ticket setup',frDesc:'Installe ou améliore Ticket Studio avec aperçu et confirmation.',enDesc:'Installs or improves Ticket Studio with preview and confirmation.',access:'managers'},
    {cat:'tickets',fr:'/ticket info',en:'/ticket info',frDesc:'Affiche la configuration Ticket Studio active.',enDesc:'Shows the active Ticket Studio configuration.',access:'managers'},
    {cat:'tickets',fr:'/ticket creer',en:'/ticket creer',frDesc:'Crée un type de ticket personnalisé.',enDesc:'Creates a custom ticket type.',access:'managers'},
    {cat:'tickets',fr:'/ticket retirer',en:'/ticket retirer',frDesc:'Retire un type de ticket personnalisé.',enDesc:'Removes a custom ticket type.',access:'managers'},
    {cat:'tickets',fr:'/ticket couleur',en:'/ticket couleur',frDesc:'Change la couleur d’un bouton Ticket Studio existant.',enDesc:'Changes the color of an existing Ticket Studio button.',access:'managers'},
    {cat:'tickets',fr:'/ticket ouvrir',en:'/ticket ouvrir',frDesc:'Ouvre un ticket privé.',enDesc:'Opens a private ticket.',access:'everyone'},
    {cat:'tickets',fr:'/ticket fermer',en:'/ticket fermer',frDesc:'Ferme le ticket Synapse actuel.',enDesc:'Closes the current Synapse ticket.',access:'everyone'},

    {cat:'community',fr:'/annonce',en:'/annonce',frDesc:'Publie une annonce structurée.',enDesc:'Publishes a structured announcement.',access:'staff'},
    {cat:'community',fr:'/recherche',en:'/recherche',frDesc:'Publie une recherche ou une demande.',enDesc:'Publishes a search or request.',access:'everyone'},
    {cat:'community',fr:'/reglement',en:'/reglement',frDesc:'Publie un règlement propre.',enDesc:'Publishes a clean rules message.',access:'staff'},
    {cat:'community',fr:'/avis',en:'/avis',frDesc:'Laisse une note et un commentaire à un membre.',enDesc:'Leaves a rating and comment for a member.',access:'everyone'},
    {cat:'community',fr:'/reputation',en:'/reputation',frDesc:'Affiche la réputation d’un membre.',enDesc:'Shows a member reputation.',access:'everyone'},
    {cat:'community',fr:'/commandes',en:'/commandes',frDesc:'Affiche le catalogue des commandes directement dans Discord.',enDesc:'Shows the command catalogue directly inside Discord.',access:'everyone'},

    {cat:'access',fr:'/permissions voir',en:'/permissions voir',frDesc:'Affiche les règles d’accès actuelles.',enDesc:'Shows current access rules.',access:'managers'},
    {cat:'access',fr:'/permissions niveau',en:'/permissions niveau',frDesc:'Définit le niveau Public, Staff ou Responsables.',enDesc:'Sets the Public, Staff or Managers access level.',access:'managers'},
    {cat:'access',fr:'/permissions staff-add',en:'/permissions staff-add',frDesc:'Ajoute un rôle à la liste staff Synapse.',enDesc:'Adds a role to the Synapse staff list.',access:'managers'},
    {cat:'access',fr:'/permissions staff-remove',en:'/permissions staff-remove',frDesc:'Retire un rôle de la liste staff Synapse.',enDesc:'Removes a role from the Synapse staff list.',access:'managers'},
    {cat:'access',fr:'/permissions autoriser',en:'/permissions autoriser',frDesc:'Autorise explicitement un rôle pour une commande.',enDesc:'Explicitly allows a role for a command.',access:'managers'},
    {cat:'access',fr:'/permissions retirer',en:'/permissions retirer',frDesc:'Retire une autorisation personnalisée.',enDesc:'Removes a custom role permission.',access:'managers'},

    {cat:'premium',fr:'/premium',en:'/premium',frDesc:'Affiche le statut, le prix et les avantages Premium.',enDesc:'Shows Premium status, price and benefits.',access:'everyone'},
    {cat:'premium',fr:'/redeem',en:'/redeem',frDesc:'Active un code cadeau Premium sur le serveur.',enDesc:'Redeems a Premium gift code on the server.',access:'managers'},
    {cat:'premium',fr:'/backup_creer',en:'/backup_creer',frDesc:'Crée une sauvegarde complète de la structure.',enDesc:'Creates a complete structure backup.',access:'managers'},
    {cat:'premium',fr:'/backup_liste',en:'/backup_liste',frDesc:'Liste les sauvegardes disponibles.',enDesc:'Lists available backups.',access:'managers'},
    {cat:'premium',fr:'/backup_restaurer',en:'/backup_restaurer',frDesc:'Restaure les éléments manquants depuis une sauvegarde.',enDesc:'Restores missing elements from a backup.',access:'managers'},
    {cat:'premium',fr:'/template_sauver',en:'/template_sauver',frDesc:'Enregistre la structure comme template personnel.',enDesc:'Saves the current structure as a personal template.',access:'managers'},
    {cat:'premium',fr:'/template_liste',en:'/template_liste',frDesc:'Liste les templates personnels.',enDesc:'Lists personal templates.',access:'managers'},
    {cat:'premium',fr:'/template_appliquer',en:'/template_appliquer',frDesc:'Applique un template personnel au serveur.',enDesc:'Applies a personal template to the server.',access:'managers'},
    {cat:'premium',fr:'/automod',en:'/automod',frDesc:'Configure AutoMod : spam, liens et mentions.',enDesc:'Configures AutoMod: spam, links and mentions.',access:'managers'},
    {cat:'premium',fr:'/mot_bloque_ajouter',en:'/mot_bloque_ajouter',frDesc:'Ajoute un mot ou une expression au filtre AutoMod.',enDesc:'Adds a word or expression to the AutoMod filter.',access:'managers'},
    {cat:'premium',fr:'/mot_bloque_retirer',en:'/mot_bloque_retirer',frDesc:'Retire un mot ou une expression du filtre AutoMod.',enDesc:'Removes a word or expression from the AutoMod filter.',access:'managers'},
    {cat:'premium',fr:'/antiraid',en:'/antiraid',frDesc:'Configure la protection Anti-Raid.',enDesc:'Configures Anti-Raid protection.',access:'managers'},
    {cat:'premium',fr:'/levels',en:'/levels',frDesc:'Configure le système Levels & XP.',enDesc:'Configures Levels & XP.',access:'managers'},
    {cat:'premium',fr:'/rank',en:'/rank',frDesc:'Affiche le niveau et le rang d’un membre.',enDesc:'Shows a member level and rank.',access:'everyone'},
    {cat:'premium',fr:'/leaderboard',en:'/leaderboard',frDesc:'Affiche le classement XP du serveur.',enDesc:'Shows the server XP leaderboard.',access:'everyone'},
    {cat:'premium',fr:'/tempvoice',en:'/tempvoice',frDesc:'Configure les salons vocaux temporaires.',enDesc:'Configures temporary voice channels.',access:'managers'},
    {cat:'premium',fr:'/giveaway',en:'/giveaway',frDesc:'Lance un giveaway Premium.',enDesc:'Launches a Premium giveaway.',access:'managers'},
    {cat:'premium',fr:'/custom_ajouter',en:'/custom_ajouter',frDesc:'Ajoute une commande personnalisée.',enDesc:'Adds a custom command.',access:'managers'},
    {cat:'premium',fr:'/custom_retirer',en:'/custom_retirer',frDesc:'Supprime une commande personnalisée.',enDesc:'Removes a custom command.',access:'managers'},
    {cat:'premium',fr:'/custom',en:'/custom',frDesc:'Exécute une commande personnalisée du serveur.',enDesc:'Runs a server custom command.',access:'everyone'},
    {cat:'premium',fr:'/automation_ajouter',en:'/automation_ajouter',frDesc:'Planifie un message récurrent.',enDesc:'Schedules a recurring message.',access:'managers'},
    {cat:'premium',fr:'/automation_liste',en:'/automation_liste',frDesc:'Liste les automatisations planifiées.',enDesc:'Lists scheduled automations.',access:'managers'},
    {cat:'premium',fr:'/automation_retirer',en:'/automation_retirer',frDesc:'Supprime une automatisation.',enDesc:'Removes an automation.',access:'managers'},

    {cat:'interserver',fr:'/interserver code',en:'/interserver code',frDesc:'Génère un code temporaire de synchronisation.',enDesc:'Generates a temporary synchronization code.',access:'discordAdmin'},
    {cat:'interserver',fr:'/interserver link',en:'/interserver link',frDesc:'Relie un salon avec un code de synchronisation.',enDesc:'Links a channel using a synchronization code.',access:'discordAdmin'},
    {cat:'interserver',fr:'/interserver unlink',en:'/interserver unlink',frDesc:'Supprime une liaison Interserver.',enDesc:'Removes an Interserver link.',access:'discordAdmin'},
    {cat:'interserver',fr:'/interserver list',en:'/interserver list',frDesc:'Affiche les liaisons Interserver actives.',enDesc:'Shows active Interserver links.',access:'discordAdmin'},
    {cat:'interserver',fr:'/interserver alias',en:'/interserver alias',frDesc:'Définit un alias pour une liaison.',enDesc:'Sets an alias for a link.',access:'discordAdmin'},
    {cat:'interserver',fr:'/interserver unalias',en:'/interserver unalias',frDesc:'Retire un alias personnalisé.',enDesc:'Removes a custom alias.',access:'discordAdmin'},
    {cat:'interserver',fr:'/interserver language',en:'/interserver language',frDesc:'Change la langue des réponses Interserver.',enDesc:'Changes the Interserver reply language.',access:'discordAdmin'}
  ];

  const text={
    fr:{nav:{home:'Accueil',scripts:'Scripts',bots:'Bots',commands:'Commandes',services:'Web · Apps · Autres'},quote:'Faire un devis',footerCopy:'Scripts FiveM, bots Discord, web, applications et développement sur mesure.',footerNote:'Conçu pour évoluer avec les projets.',kicker:'SYNAPSE / COMMANDES',title:'Tout Synapse,<br><span>directement dans Discord.</span>',lead:'Le catalogue complet des commandes Synapse accessibles aux utilisateurs, avec leur rôle et leur niveau d’accès.',helpCommand:'/commandes',helpText:'Affiche aussi le catalogue directement dans Discord.',back:'Voir la fiche Synapse →',placeholder:'Rechercher une commande…',all:'Toutes',copy:'Copier',copied:'Copié ✓',empty:'Aucune commande ne correspond à votre recherche.',futureKicker:'MISE À JOUR FUTURE',futureTitle:'Dashboard Web Synapse',futureCopy:'Un Dashboard Web complet est en développement pour les futures versions de Synapse.',futureBuilder:'Structure & adaptation',security:'SÉCURITÉ',futureSecurity:'AutoMod & protections',multi:'MULTI-SERVEURS',futureMulti:'Gestion centralisée',cats:{builder:'Builder & adaptation',tickets:'Ticket Studio',community:'Communauté',access:'Accès & permissions',premium:'Premium',interserver:'Interserver'},access:{everyone:'Tous',staff:'Staff',managers:'Responsables',discordAdmin:'Admin Discord'}},
    en:{nav:{home:'Home',scripts:'Scripts',bots:'Bots',commands:'Commands',services:'Web · Apps · More'},quote:'Get a quote',footerCopy:'FiveM scripts, Discord bots, web, applications and custom development.',footerNote:'Built to evolve with every project.',kicker:'SYNAPSE / COMMANDS',title:'All of Synapse,<br><span>directly inside Discord.</span>',lead:'The complete catalogue of customer-facing Synapse commands, with their purpose and access level.',helpCommand:'/commandes',helpText:'Also displays the catalogue directly inside Discord.',back:'View Synapse →',placeholder:'Search a command…',all:'All',copy:'Copy',copied:'Copied ✓',empty:'No command matches your search.',futureKicker:'FUTURE UPDATE',futureTitle:'Synapse Web Dashboard',futureCopy:'A complete Web Dashboard is being developed for future Synapse versions.',futureBuilder:'Structure & adaptation',security:'SECURITY',futureSecurity:'AutoMod & protection',multi:'MULTI-SERVER',futureMulti:'Centralized management',cats:{builder:'Builder & adaptation',tickets:'Ticket Studio',community:'Community',access:'Access & permissions',premium:'Premium',interserver:'Interserver'},access:{everyone:'Everyone',staff:'Staff',managers:'Managers',discordAdmin:'Discord Admin'}}
  };

  const grid=document.querySelector('[data-command-grid]');
  const filters=document.querySelector('[data-command-filters]');
  const search=document.querySelector('[data-command-search]');
  const toggle=document.querySelector('[data-command-lang]');
  const header=document.querySelector('.v2-header');
  if(!grid||!filters)return;
  let lang=localStorage.getItem('phoenix-lang')==='en'?'en':'fr',active='all',query='';

  function applyStatic(){const t=text[lang];document.documentElement.lang=lang;localStorage.setItem('phoenix-lang',lang);document.title=lang==='fr'?'Commandes Synapse — Phoenix Inc | Development':'Synapse Commands — Phoenix Inc | Development';document.querySelectorAll('[data-cmd-nav]').forEach(el=>{el.textContent=t.nav[el.dataset.cmdNav]||el.textContent;});document.querySelectorAll('[data-cmd-text]').forEach(el=>{const key=el.dataset.cmdText;if(t[key]!=null)el.textContent=t[key];});document.querySelectorAll('[data-cmd-html]').forEach(el=>{const key=el.dataset.cmdHtml;if(t[key]!=null)el.innerHTML=t[key];});const quote=document.querySelector('[data-cmd-quote]');if(quote)quote.textContent=t.quote;if(search)search.placeholder=t.placeholder;toggle?.classList.toggle('en',lang==='en');}
  const categories=['all',...new Set(data.map(x=>x.cat))];
  function renderFilters(){const t=text[lang];filters.innerHTML=categories.map(cat=>`<button class="${cat===active?'active':''}" data-cat="${cat}">${cat==='all'?t.all:t.cats[cat]}</button>`).join('');filters.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.cat||'all';renderFilters();render();}));}
  function render(){const t=text[lang];const list=data.filter(item=>(active==='all'||item.cat===active)&&(!query||`${item[lang]} ${lang==='fr'?item.frDesc:item.enDesc} ${t.cats[item.cat]} ${t.access[item.access]}`.toLowerCase().includes(query)));grid.innerHTML=list.length?list.map(item=>`<article class="cmd-card"><div class="cmd-card-top"><span>${t.cats[item.cat]}</span></div><code>${item[lang]}</code><p>${lang==='fr'?item.frDesc:item.enDesc}</p><footer><span>${t.access[item.access]}</span><button type="button" data-copy="${item[lang].replace(/&/g,'&amp;').replace(/\"/g,'&quot;')}">${t.copy}</button></footer></article>`).join(''):`<div class="cmd-empty">${t.empty}</div>`;grid.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy||'');btn.textContent=t.copied;setTimeout(()=>btn.textContent=t.copy,1000);}catch{}}));}
  function refresh(){applyStatic();renderFilters();render();}
  toggle?.addEventListener('click',()=>{lang=lang==='fr'?'en':'fr';refresh();});
  search?.addEventListener('input',()=>{query=search.value.trim().toLowerCase();render();});
  document.querySelector('[data-menu-toggle]')?.addEventListener('click',()=>header?.classList.toggle('open'));
  refresh();
})();