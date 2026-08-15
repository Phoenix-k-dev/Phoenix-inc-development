(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  const nav=$('.syn-dash-tabs');
  const content=$('.syn-dash-content');
  if(!nav||!content) return;

  nav.innerHTML=`
    <div class="syn-nav-search"><input type="search" placeholder="Rechercher un réglage…" data-settings-search></div>
    <div class="syn-nav-group"><small>GÉNÉRAL</small>
      <button class="active" data-tab="overview"><span>⌂</span>Vue d’ensemble</button>
      <button data-tab="wizard"><span>✦</span>Assistant de configuration</button>
    </div>
    <div class="syn-nav-group"><small>SERVEUR</small>
      <button data-tab="builder"><span>◫</span>Server Builder</button>
      <button data-tab="structure"><span>#</span>Salons & catégories</button>
      <button data-tab="roles"><span>♟</span>Rôles & permissions</button>
    </div>
    <div class="syn-nav-group"><small>SUPPORT</small>
      <button data-tab="tickets"><span>◈</span>Tickets</button>
      <button data-tab="transcripts"><span>≡</span>Transcripts</button>
      <button data-tab="ticketstats"><span>↗</span>Statistiques tickets</button>
    </div>
    <div class="syn-nav-group"><small>MODÉRATION & SÉCURITÉ</small>
      <button data-tab="moderation"><span>⚒</span>Modération</button>
      <button data-tab="automod"><span>⚡</span>AutoMod</button>
      <button data-tab="security"><span>◇</span>Sécurité</button>
      <button data-tab="logs"><span>☷</span>Logs</button>
    </div>
    <div class="syn-nav-group"><small>COMMUNAUTÉ</small>
      <button data-tab="community"><span>♥</span>Accueil & communauté</button>
      <button data-tab="rolesmenus"><span>◎</span>Rôles interactifs</button>
      <button data-tab="levels"><span>★</span>Niveaux & XP</button>
      <button data-tab="giveaways"><span>✦</span>Giveaways</button>
    </div>
    <div class="syn-nav-group"><small>AUTOMATISATION</small>
      <button data-tab="commands"><span>/</span>Commandes</button>
      <button data-tab="customcommands"><span>{ }</span>Commandes personnalisées</button>
      <button data-tab="automation"><span>↯</span>Automatisations</button>
      <button data-tab="interserver"><span>⇄</span>Interserver</button>
    </div>
    <div class="syn-nav-group"><small>ADMINISTRATION</small>
      <button data-tab="access"><span>⌘</span>Accès Dashboard</button>
      <button data-tab="history"><span>◷</span>Historique</button>
      <button data-tab="premium"><span>◆</span>Premium & facturation</button>
    </div>`;

  const panel=(name,kicker,title,body)=>`<section class="syn-panel syn-pro-panel" data-panel="${name}" data-settings-panel><div class="syn-panel-head"><div><span class="v2-kicker">${kicker}</span><h2>${title}</h2></div></div>${body}</section>`;
  const section=(title,desc,body,attrs='')=>`<article class="syn-pro-section" ${attrs}><div class="syn-pro-section-head"><div><h3>${title}</h3><p>${desc}</p></div></div>${body}</article>`;
  const toggle=(name,desc,premium=false)=>`<label class="syn-pro-toggle" data-setting-search="${name} ${desc}"><span><b>${name}</b><small>${desc}</small></span>${premium?'<em>PREMIUM</em>':''}<input type="checkbox"><i></i></label>`;
  const field=(label,placeholder,type='text')=>`<label class="syn-pro-field" data-setting-search="${label}"><span>${label}</span><input type="${type}" placeholder="${placeholder}"></label>`;
  const select=(label,opts)=>`<label class="syn-pro-field" data-setting-search="${label}"><span>${label}</span><select>${opts.map(x=>`<option>${x}</option>`).join('')}</select></label>`;

  content.insertAdjacentHTML('beforeend',
    panel('wizard','ASSISTANT','Configurer Synapse sans rien oublier.',`
      <div class="syn-wizard-grid">
        <article class="syn-wizard-progress"><small>PROGRESSION</small><strong>6 / 9</strong><div><i style="width:67%"></i></div><p>Terminez les étapes essentielles puis affinez chaque module quand vous le souhaitez.</p></article>
        <div class="syn-wizard-steps">
          ${['Structure du serveur','Rôles & permissions','Tickets','Modération','Sécurité','Accueil communauté','Logs','Automatisations','Premium'].map((x,i)=>`<button class="${i<6?'done':''}" type="button"><span>${i<6?'✓':String(i+1).padStart(2,'0')}</span><b>${x}</b><em>${i<6?'Configuré':'À configurer'}</em></button>`).join('')}
        </div>
      </div>`)+
    panel('roles','RÔLES & PERMISSIONS','Contrôler précisément qui peut faire quoi.',`
      ${section('Rôles Discord','Modifiez les rôles créés par le Builder et leurs permissions.',`<div class="syn-pro-table"><div class="head"><span>Rôle</span><span>Membres</span><span>Position</span><span>Permissions</span><span></span></div>${['Administrateur','Modérateur','Support','Membre','Notifications'].map((r,i)=>`<div><span><i class="role-dot r${i}"></i><b>${r}</b></span><span>${[2,4,6,128,86][i]}</span><span>${i+1}</span><span>${i<2?'Avancées':'Standard'}</span><button>Modifier</button></div>`).join('')}</div><button class="syn-pro-add">+ Créer un rôle</button>`)}
      ${section('Permissions Synapse','Définissez quelles fonctions du bot chaque rôle peut utiliser.',`<div class="syn-perm-grid">${['Builder','Tickets','Modération','Sécurité','Communauté','Automatisations','Premium'].map(x=>toggle(x,`Autoriser les actions ${x.toLowerCase()}.`)).join('')}</div>`)}`)+
    panel('transcripts','TICKETS / TRANSCRIPTS','Retrouver chaque conversation de support.',`
      <div class="syn-pro-toolbar"><input placeholder="Rechercher par utilisateur, ID ou mot-clé"><select><option>Tous les statuts</option><option>Ouverts</option><option>Fermés</option></select><button>Exporter CSV</button></div>
      <div class="syn-pro-table transcript-table"><div class="head"><span>Ticket</span><span>Utilisateur</span><span>Catégorie</span><span>Fermé par</span><span>Date</span><span></span></div>${['#0048','#0047','#0046','#0045'].map((id,i)=>`<div><span><b>${id}</b></span><span>${['Kevin','Tiphany','Alex','Jordan'][i]}</span><span>${['Support','Bug','Achat','Question'][i]}</span><span>${['Phoenix','Support','Support','Phoenix'][i]}</span><span>15/08/2026</span><button>Ouvrir</button></div>`).join('')}</div>`)+
    panel('ticketstats','TICKETS / STATISTIQUES','Mesurer la qualité du support.',`
      <div class="syn-pro-stats"><article><small>TICKETS / 30J</small><strong>184</strong><span>+12 %</span></article><article><small>TEMPS DE RÉPONSE</small><strong>8m</strong><span>-21 %</span></article><article><small>RÉSOLUTION</small><strong>42m</strong><span>-8 %</span></article><article><small>OUVERTS</small><strong>7</strong><span>maintenant</span></article></div>
      ${section('Répartition','Volume par type de demande.',`<div class="syn-bars">${[['Support',82],['Bug',61],['Achat',43],['Autre',28]].map(([x,n])=>`<div><span>${x}</span><i><b style="width:${n}%"></b></i><em>${n}</em></div>`).join('')}</div>`)}`)+
    panel('automod','AUTOMOD','Filtrer automatiquement sans perdre le contrôle.',`
      ${section('Filtres principaux','Chaque filtre peut avoir sa propre sanction, ses exceptions et ses seuils.',`<div class="syn-pro-toggle-grid">${[
        ['Anti-spam','Messages répétés, flood et rafales.'],['Liens & invitations','Bloquer les invitations Discord et domaines choisis.'],['Mentions massives','Limiter @everyone, @here et mentions multiples.'],['Mots interdits','Listes personnalisées et expressions.'],['Caps excessives','Seuil configurable de majuscules.'],['Emojis excessifs','Limiter le spam emoji.'],['Pièces jointes','Contrôler fichiers et extensions.'],['Nouveaux comptes','Règles selon l’âge du compte.']
      ].map(([a,b],i)=>toggle(a,b,i>4)).join('')}</div>`)}
      ${section('Escalade automatique','Définissez la sanction selon les infractions accumulées.',`<div class="syn-escalation"><div><b>1</b><span>1ère infraction</span><select><option>Avertissement</option><option>Timeout</option></select></div><div><b>2</b><span>3 infractions</span><select><option>Timeout 30 min</option><option>Kick</option></select></div><div><b>3</b><span>5 infractions</span><select><option>Kick</option><option>Ban</option></select></div></div>`)}`)+
    panel('security','SÉCURITÉ','Protéger le serveur avant que ça dégénère.',`
      <div class="syn-pro-toggle-grid">${toggle('Anti-Raid','Détection d’arrivées massives et verrouillage automatique.',true)}${toggle('Anti-Nuke','Surveille suppressions massives de salons, rôles et webhooks.',true)}${toggle('Join Gate','Contrôle âge du compte, avatar, username et règles d’entrée.',true)}${toggle('Protection Webhooks','Détecte créations et suppressions suspectes.',true)}${toggle('Mode Panique','Verrouille instantanément les actions sensibles.',true)}${toggle('Backups automatiques','Snapshots de la structure du serveur.',true)}</div>
      ${section('Whitelists','Excluez des utilisateurs, rôles, salons ou bots de certaines protections.',`<div class="syn-pro-toolbar"><input placeholder="ID, rôle ou utilisateur"><select><option>Toutes protections</option><option>Anti-Raid</option><option>Anti-Nuke</option><option>AutoMod</option></select><button>Ajouter</button></div><div class="syn-empty-line">Aucune whitelist personnalisée.</div>`)}
      ${section('Backups','Créez et restaurez des points de sauvegarde.',`<div class="syn-backup-row"><div><b>Backup automatique</b><small>Aujourd’hui · 12:00</small></div><span>12 salons · 8 rôles</span><button>Restaurer</button></div><button class="syn-pro-add">+ Créer un backup maintenant</button>`)}`)+
    panel('logs','LOGS','Savoir exactement ce qui se passe.',`
      <div class="syn-log-grid">${['Modération','Messages supprimés','Membres','Rôles','Salons','Vocal','Tickets','Sécurité','Builder','Commandes'].map(x=>`<article data-setting-search="logs ${x}"><div><b>${x}</b><span>Canal de destination et événements</span></div><select><option># logs</option><option># mod-logs</option><option>Désactivé</option></select><button>Configurer</button></article>`).join('')}</div>`)+
    panel('rolesmenus','RÔLES INTERACTIFS','Donner des rôles sans intervention du staff.',`
      ${section('Menus de rôles','Créez des boutons ou menus déroulants.',`<div class="syn-pro-card-list"><article><div><small>PANEL</small><h3>Choisissez vos notifications</h3><p>3 rôles · menu déroulant</p></div><button>Modifier</button></article><button class="syn-create-card">+ Nouveau panneau de rôles</button></div>`)}`)+
    panel('levels','NIVEAUX & XP','Récompenser l’activité sans spammer le serveur.',`
      <div class="syn-pro-toggle-grid">${toggle('Système XP','Attribuer de l’XP aux messages.')}${toggle('XP vocal','Récompenser le temps passé en vocal.',true)}${toggle('Annonce de niveau','Message lorsqu’un membre monte de niveau.')}${toggle('Rôles récompense','Attribuer automatiquement des rôles selon le niveau.')}</div>
      ${section('Récompenses','Associez des niveaux à des rôles.',`<div class="syn-pro-table"><div class="head"><span>Niveau</span><span>Rôle</span><span>Action</span></div><div><span>5</span><span>Membre actif</span><button>Modifier</button></div><div><span>20</span><span>Habitué</span><button>Modifier</button></div><div><span>50</span><span>Vétéran</span><button>Modifier</button></div></div><button class="syn-pro-add">+ Ajouter une récompense</button>`)}`)+
    panel('giveaways','GIVEAWAYS','Créer des concours propres et configurables.',`
      ${section('Nouveau giveaway','Configurez durée, récompense, gagnants et conditions.',`<div class="syn-pro-fields">${field('Récompense','Ex. Nitro 1 mois')}${field('Durée','Ex. 7 jours')}${field('Nombre de gagnants','1','number')}${select('Salon',['# concours','# général','# annonces'])}</div><div class="syn-pro-toggle-grid">${toggle('Rôle requis','Limiter la participation à certains rôles.')}${toggle('Compte ancien','Exiger un âge minimum du compte.',true)}</div><button class="v2-btn v2-btn-violet">Créer le giveaway</button>`)}`)+
    panel('commands','COMMANDES','Gérer ce qui reste disponible en slash commands.',`
      <div class="syn-pro-toolbar"><input placeholder="Rechercher une commande"><select><option>Tous les modules</option><option>Modération</option><option>Tickets</option><option>Communauté</option></select></div><div class="syn-command-list">${['/ban','/kick','/timeout','/warn','/ticket','/clear','/role','/serverinfo'].map((x,i)=>`<article data-setting-search="${x}"><div><b>${x}</b><small>${i<4?'Modération':'Utilitaire'}</small></div><label><input type="checkbox" checked><i></i></label><button>Permissions</button></article>`).join('')}</div>`)+
    panel('customcommands','COMMANDES PERSONNALISÉES','Créer vos propres réponses et actions.',`
      ${section('Commandes existantes','Réponses texte, embeds, rôles ou actions automatisées.',`<div class="syn-pro-card-list"><article><div><small>/REGLEMENT</small><h3>Afficher le règlement</h3><p>Embed · Public</p></div><button>Modifier</button></article><button class="syn-create-card">+ Nouvelle commande personnalisée</button></div>`)}`)+
    panel('automation','AUTOMATISATIONS','Déclencher des actions sans intervention humaine.',`
      <div class="syn-automation-list"><article><span>QUAND</span><b>Un membre rejoint</b><i>→</i><span>ALORS</span><b>Donner le rôle Membre + envoyer un message</b><button>Modifier</button></article><article><span>QUAND</span><b>Un ticket est fermé</b><i>→</i><span>ALORS</span><b>Créer transcript + log staff</b><button>Modifier</button></article><button class="syn-create-card">+ Nouvelle automatisation</button></div>`)+
    panel('interserver','INTERSERVER','Relier plusieurs communautés avec des règles claires.',`
      ${section('Connexions','Associez des salons entre plusieurs serveurs Synapse.',`<div class="syn-pro-card-list"><article><div><small>CONNEXION ACTIVE</small><h3># interserver-fr</h3><p>3 serveurs connectés · modération synchronisée</p></div><button>Configurer</button></article><button class="syn-create-card">+ Nouvelle connexion</button></div>`)}`)+
    panel('access','ACCÈS DASHBOARD','Décider qui peut administrer Synapse.',`
      ${section('Rôles autorisés','Accès global ou permissions détaillées par module.',`<div class="syn-pro-table"><div class="head"><span>Rôle</span><span>Niveau</span><span>Modules</span><span></span></div><div><span>Administrateur</span><span>Complet</span><span>Tous</span><button>Modifier</button></div><div><span>Support</span><span>Restreint</span><span>Tickets · Transcripts</span><button>Modifier</button></div></div><button class="syn-pro-add">+ Autoriser un rôle</button>`)}
      ${section('Sécurité des accès','Protection supplémentaire du dashboard.',`<div class="syn-pro-toggle-grid">${toggle('Journaliser chaque modification','Conserver utilisateur, date et ancienne valeur.')}${toggle('Confirmation actions sensibles','Demander confirmation avant suppressions ou restaurations.')}${toggle('Réauthentification Discord','Redemander Discord pour les actions critiques.',true)}</div>`)}`)+
    panel('history','HISTORIQUE','Voir qui a modifié quoi et quand.',`
      <div class="syn-pro-toolbar"><input placeholder="Rechercher dans l’historique"><select><option>Tous les modules</option><option>Builder</option><option>Tickets</option><option>Modération</option></select></div><div class="syn-history-list">${[['Phoenix','Tickets','Rôle support modifié'],['Phoenix','Builder','Salon #annonces ajouté'],['Support','Tickets','Panel Support modifié'],['Phoenix','Sécurité','Anti-Raid activé']].map(([u,m,a],i)=>`<article><i></i><div><b>${a}</b><span>${u} · ${m}</span></div><time>Il y a ${i+1}h</time><button>Détails</button></article>`).join('')}</div>`)
  );

  // Enrich existing Tickets panel into a Ticket Tool-style control surface.
  const tickets=$('[data-panel="tickets"]');
  if(tickets){
    const oldSettings=tickets.querySelector('.syn-settings-grid');
    oldSettings?.insertAdjacentHTML('afterend',`
      <div class="syn-ticket-subnav"><button class="active">Panels</button><button>Formulaires</button><button>Accès staff</button><button>Workflow</button><button>Limites</button><button>Messages</button></div>
      <div class="syn-ticket-panels">
        ${section('Panels de tickets','Un serveur peut avoir plusieurs panels, chacun avec ses propres catégories et règles.',`<div class="syn-pro-card-list"><article><div><small>PANEL ACTIF</small><h3>Support général</h3><p># support · 4 catégories · 2 rôles staff</p></div><button>Modifier</button></article><article><div><small>PANEL ACTIF</small><h3>Achats & facturation</h3><p># achats · 3 catégories · 1 rôle staff</p></div><button>Modifier</button></article><button class="syn-create-card">+ Nouveau panel</button></div>`)}
        ${section('Comportement','Claim, fermeture, réouverture et limites.',`<div class="syn-pro-toggle-grid">${toggle('Claim obligatoire','Un membre du staff doit claim avant de répondre.')}${toggle('Réouverture autorisée','Permettre la réouverture après fermeture.')}${toggle('Transcripts automatiques','Sauvegarder chaque ticket à la fermeture.')}${toggle('Suppression automatique','Supprimer le salon après délai configurable.')}${toggle('Validation avant ouverture','Le staff accepte/refuse la demande avant création.')}${toggle('Motif obligatoire','Demander une raison avant ouverture.')}</div><div class="syn-pro-fields">${field('Tickets max / utilisateur','2','number')}${field('Cooldown entre tickets','10 min')}${field('Suppression après fermeture','24 h')}${select('Priorité par défaut',['Normale','Basse','Haute','Urgente'])}</div>`)}
      </div>`);
  }

  // Enrich existing moderation panel.
  const moderation=$('[data-panel="moderation"]');
  if(moderation){
    moderation.insertAdjacentHTML('beforeend',`
      ${section('Système d’avertissements','Seuils, expiration et sanctions automatiques.',`<div class="syn-pro-fields">${field('Expiration d’un warn','30 jours')}${field('Warns avant sanction','3','number')}${select('Sanction automatique',['Timeout 1h','Timeout 24h','Kick','Ban'])}${select('Notifier le membre',['DM + salon','DM uniquement','Salon uniquement'])}</div>`)}
      ${section('Casier & sanctions','Toutes les actions restent consultables et réversibles.',`<div class="syn-pro-toolbar"><input placeholder="Utilisateur ou ID"><button>Rechercher le casier</button></div><div class="syn-empty-line">Sélectionnez un membre pour afficher son historique.</div>`)}`);
  }

  // Search across navigation and settings.
  const search=$('[data-settings-search]');
  search?.addEventListener('input',()=>{
    const q=search.value.trim().toLowerCase();
    $$('.syn-nav-group button').forEach(b=>{b.style.display=!q||b.textContent.toLowerCase().includes(q)?'':'none'});
    $$('[data-setting-search]').forEach(el=>{el.classList.toggle('syn-search-match',!!q && (el.dataset.settingSearch||'').toLowerCase().includes(q))});
  });

  // Bind all new tabs.
  $$('[data-tab]',nav).forEach(btn=>btn.addEventListener('click',()=>{
    $$('[data-tab]',nav).forEach(b=>b.classList.toggle('active',b===btn));
    $$('[data-panel]',content).forEach(p=>p.classList.toggle('active',p.dataset.panel===btn.dataset.tab));
    document.body.classList.add('syn-dashboard-open');
    history.replaceState(null,'',`#${btn.dataset.tab}`);
    window.scrollTo({top:0,behavior:'smooth'});
  }));

  const hash=location.hash.slice(1);
  if(hash && $(`[data-tab="${CSS.escape(hash)}"]`,nav)) $(`[data-tab="${CSS.escape(hash)}"]`,nav).click();

  // Any visible dashboard means we are in control-center mode.
  const app=$('[data-dashboard-app]');
  const syncOpen=()=>document.body.classList.toggle('syn-dashboard-open',app && !app.hidden);
  syncOpen();
  new MutationObserver(syncOpen).observe(app,{attributes:true,attributeFilter:['hidden']});
})();
