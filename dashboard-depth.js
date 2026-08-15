(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const content=$('.syn-dash-content'); if(!content) return;

  const ensurePanel = (id, html) => {
    const panel = $(`[data-panel="${id}"]`, content);
    if (!panel) return null;
    panel.innerHTML = html;
    return panel;
  };

  const sw=(label,desc,checked=false)=>`<label class="syn-depth-switch"><span><b>${label}</b><small>${desc}</small></span><input type="checkbox" ${checked?'checked':''}><i></i></label>`;
  const select=(label,opts)=>`<label class="syn-depth-field"><span>${label}</span><select>${opts.map(x=>`<option>${x}</option>`).join('')}</select></label>`;
  const input=(label,ph,value='')=>`<label class="syn-depth-field"><span>${label}</span><input placeholder="${ph}" value="${value}"></label>`;

  // Secured roles — explicit role selection and policy.
  ensurePanel('securedroles', `
    <div class="syn-panel-head"><div><span class="v2-kicker">SÉCURITÉ / RÔLES</span><h2>Rôles sécurisés</h2><p>Choisissez précisément quels rôles Synapse doit surveiller et comment réagir.</p></div></div>
    <section class="syn-depth-section">
      <div class="syn-depth-title"><div><h3>Rôles protégés</h3><p>Ajoutez les rôles sensibles. Synapse contrôle les attributions, retraits et modifications.</p></div><button class="v2-btn v2-btn-violet" type="button">+ Ajouter un rôle</button></div>
      <div class="syn-role-protection-list">
        ${['Administrateur','Modérateur','Support'].map((r,i)=>`<article><div class="syn-role-identity"><i class="r${i}"></i><div><b>${r}</b><small>${i===0?'Critique':'Sensible'}</small></div></div><div class="syn-role-policy"><span>Attribution</span><b>${i===0?'Bloquée hors whitelist':'Surveillée'}</b></div><div class="syn-role-policy"><span>Modification</span><b>Journalisée</b></div><button type="button">Configurer</button></article>`).join('')}
      </div>
    </section>
    <section class="syn-depth-section">
      <div class="syn-depth-title"><div><h3>Comportement automatique</h3><p>Ces protections sont recommandées et activées par défaut.</p></div></div>
      <div class="syn-depth-switch-grid">${sw('Retirer une attribution non autorisée','Synapse retire immédiatement un rôle protégé donné sans permission.',true)}${sw('Restaurer un rôle supprimé','Recrée automatiquement un rôle protégé supprimé accidentellement.',true)}${sw('Alerter les administrateurs','Envoie une alerte dans le salon sécurité.',true)}${sw('Sanction automatique','Applique une sanction si une action malveillante est détectée.',false)}</div>
    </section>
    <section class="syn-depth-section">
      <div class="syn-depth-title"><div><h3>Qui peut gérer ces rôles ?</h3><p>Whitelist par utilisateurs ou rôles Discord.</p></div></div>
      <div class="syn-depth-fields">${select('Rôle autorisé',['Administrateur','Fondateur','Owner'])}${select('Action autorisée',['Toutes les actions','Attribution uniquement','Retrait uniquement'])}</div>
      <button class="syn-depth-add" type="button">+ Ajouter une autorisation</button>
    </section>`);

  // Full message/embed editor with visual preview.
  ensurePanel('messages', `
    <div class="syn-panel-head"><div><span class="v2-kicker">MESSAGES</span><h2>Messages & embeds</h2><p>Construisez visuellement vos messages Discord, boutons, sélecteurs et actions.</p></div><button class="v2-btn v2-btn-ghost" type="button">Récupérer un message</button></div>
    <div class="syn-message-studio">
      <section class="syn-message-editor">
        <div class="syn-editor-block"><div class="syn-depth-title"><div><h3>Destination</h3><p>Choisissez où le message sera publié.</p></div></div><div class="syn-depth-fields">${select('Salon',['# règlement','# annonces','# bienvenue','# rôles'])}${input('Nom du brouillon','Ex. Règlement principal','Règlement principal')}</div></div>
        <div class="syn-editor-tabs"><button class="active">Contenu</button><button>Embed</button><button>Image</button><button>Boutons</button><button>Sélecteur</button><button>Actions</button></div>
        <div class="syn-editor-block syn-embed-editor">
          <div class="syn-depth-fields">${input('Auteur','Synapse')}${input('Titre','Règlement du serveur','Règlement du serveur')}${input('Couleur','#8b6cff','#8b6cff')}${input('URL du titre','https://')}</div>
          <label class="syn-depth-field full"><span>Description</span><textarea rows="8" data-embed-description>Bienvenue sur le serveur. Merci de lire le règlement puis de cliquer sur « J’accepte » pour accéder au reste du Discord.</textarea></label>
          <div class="syn-depth-fields">${input('Image','URL ou fichier')}${input('Miniature','URL ou fichier')}${input('Footer','Phoenix Inc | Development','Phoenix Inc | Development')}${input('Timestamp','Automatique')}</div>
        </div>
        <div class="syn-editor-block">
          <div class="syn-depth-title"><div><h3>Boutons</h3><p>Chaque bouton peut avoir son texte, emoji, couleur et action.</p></div><button class="syn-depth-add" type="button">+ Ajouter un bouton</button></div>
          <div class="syn-message-actions">
            <article><input value="✅"><input value="J’accepte"><select><option>Vert</option><option>Violet</option><option>Rouge</option><option>Gris</option></select><select><option>Donner un rôle</option><option>Retirer un rôle</option><option>Ouvrir un ticket</option><option>Ouvrir un lien</option></select><select><option>Membre</option><option>Visiteur</option></select><button>×</button></article>
            <article><input value="📖"><input value="Voir le règlement"><select><option>Gris</option><option>Violet</option></select><select><option>Ouvrir un lien</option></select><input value="https://"><button>×</button></article>
          </div>
        </div>
        <div class="syn-editor-block"><div class="syn-depth-switch-grid">${sw('Message éphémère après action','La confirmation n’est visible que par l’utilisateur.',true)}${sw('Une seule interaction','Empêche de cliquer plusieurs fois sur le même bouton.',true)}${sw('Journaliser les interactions','Ajoute les actions dans les logs Synapse.',true)}${sw('Retirer l’ancien rôle','Utile pour les sélecteurs où un seul choix est autorisé.',false)}</div></div>
        <div class="syn-editor-footer"><button class="v2-btn v2-btn-ghost">Enregistrer le brouillon</button><button class="v2-btn v2-btn-violet">Publier / Mettre à jour</button></div>
      </section>
      <aside class="syn-message-preview">
        <div class="syn-preview-head"><span>APERÇU DISCORD</span><em>LIVE</em></div>
        <div class="syn-discord-preview-card"><div class="syn-preview-user"><img src="./assets/logo-phoenix-ph.png" alt=""><div><b>Synapse <small>APP</small></b><span>Aujourd’hui à 18:42</span></div></div><div class="syn-preview-embed"><i></i><div><small>Synapse</small><h3>Règlement du serveur</h3><p data-preview-description>Bienvenue sur le serveur. Merci de lire le règlement puis de cliquer sur « J’accepte » pour accéder au reste du Discord.</p><div class="syn-preview-image">IMAGE / BANNIÈRE</div><footer>Phoenix Inc | Development</footer></div></div><div class="syn-preview-buttons"><button>✅ J’accepte</button><button>📖 Voir le règlement</button></div></div>
        <div class="syn-preview-note">L’aperçu suit les modifications de l’éditeur. Les rôles, liens et actions sont appliqués au clic une fois le message publié.</div>
      </aside>
    </div>`);

  // Rich recurring messages.
  ensurePanel('recurring', `
    <div class="syn-panel-head"><div><span class="v2-kicker">AUTOMATISATION</span><h2>Messages récurrents</h2><p>Planifiez des messages complets avec embeds, boutons et plages horaires.</p></div></div>
    <section class="syn-depth-section"><div class="syn-depth-fields">${input('Nom','Rappel Twitch')}${select('Salon',['# annonces','# général','# twitch'])}${select('Mode',['Répétition','Heure ciblée','Calendrier'])}${input('Intervalle','6 heures')}</div>
    <div class="syn-weekdays">${['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(x=>`<button class="active">${x}</button>`).join('')}</div>
    <div class="syn-depth-fields">${input('Début de plage','09:00')}${input('Fin de plage','23:00')}${select('Fuseau horaire',['Europe/Paris','UTC','America/New_York'])}${select('Si message précédent existe',['Garder','Supprimer avant nouvel envoi'])}</div>
    <div class="syn-depth-switch-grid">${sw('Forcer l’envoi','Envoie même si aucun nouveau message n’a été publié depuis le dernier envoi.',false)}${sw('Utiliser un embed','Permet titre, image, couleur et boutons.',true)}</div>
    <button class="v2-btn v2-btn-violet">Créer le message récurrent</button></section>`);

  // Interserver linking wizard.
  ensurePanel('interserver', `
    <div class="syn-panel-head"><div><span class="v2-kicker">INTERSERVER</span><h2>Relier plusieurs serveurs</h2><p>Configurez les connexions Interserver depuis le Dashboard ou directement depuis Discord.</p></div></div>
    <div class="syn-interserver-flow">
      <section class="syn-inter-step active"><span>01</span><div><h3>Choisir le salon source</h3><p>Sélectionnez le salon de ce serveur qui participera à l’Interserver.</p><div class="syn-depth-fields">${select('Serveur source',['Serveur Démo','Synapse RP'])}${select('Salon source',['# interserver','# général','# communauté'])}</div><button class="v2-btn v2-btn-violet" data-inter-next>Générer un code de liaison</button></div></section>
      <section class="syn-inter-step"><span>02</span><div><h3>Code de liaison</h3><p>Ce code temporaire permet de confirmer la connexion depuis l’autre serveur.</p><div class="syn-link-code"><b data-inter-code>SYN-8F4K-29QX</b><button>Copier</button></div><small>Expire dans 10 minutes · usage unique</small></div></section>
      <section class="syn-inter-step"><span>03</span><div><h3>Choisir la destination</h3><p>Sélectionnez un autre Discord où Synapse est installé, puis le salon cible.</p><div class="syn-depth-fields">${select('Serveur cible',['Choisir un serveur…','Second serveur','Serveur partenaire'])}${select('Salon cible',['Choisir un salon…','# interserver','# discussion'])}</div>${input('Code à confirmer','SYN-XXXX-XXXX','')}</div></section>
      <section class="syn-inter-step"><span>04</span><div><h3>Règles de synchronisation</h3><div class="syn-depth-switch-grid">${sw('Synchroniser les messages','Relaye les messages entre les salons connectés.',true)}${sw('Synchroniser les pièces jointes','Images, vidéos et fichiers.',true)}${sw('Afficher le serveur d’origine','Ajoute le nom et l’icône du serveur source.',true)}${sw('Modération synchronisée','Permet de supprimer un message relayé partout.',false)}</div><div class="syn-depth-fields">${select('Rôle autorisé à écrire',['@everyone','Membre','Interserver'])}${select('Rôle modérateur',['Modérateur','Administrateur'])}</div><button class="v2-btn v2-btn-violet">Valider la connexion</button></div></section>
    </div>
    <section class="syn-depth-section"><div class="syn-depth-title"><div><h3>Connexions actives</h3><p>Modifiez ou coupez une liaison sans passer par Discord.</p></div></div><div class="syn-inter-active"><article><div><b>Serveur Démo / #interserver</b><span>↔</span><b>Second serveur / #interserver</b></div><small>2 serveurs · messages + pièces jointes · actif</small><button>Configurer</button></article></div></section>`);

  // Dashboard deep-link helper for eventual Discord /dashboard command.
  window.SYNAPSE_DASHBOARD_LINK = guildId => {
    const base = `${location.origin}${location.pathname.replace(/dashboard\.html.*$/,'dashboard.html')}`;
    return guildId ? `${base}?guild=${encodeURIComponent(guildId)}` : base;
  };

  const params = new URLSearchParams(location.search);
  const guildFromUrl = params.get('guild');
  if (guildFromUrl) sessionStorage.setItem('synapse-guild-id', guildFromUrl);

  // Live embed preview.
  const description=$('[data-embed-description]');
  const preview=$('[data-preview-description]');
  description?.addEventListener('input',()=>{ if(preview) preview.textContent=description.value || 'Description de votre embed…'; });
})();