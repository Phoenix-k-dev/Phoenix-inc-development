(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;
  document.body.classList.add('synapse-product-v2');

  const config = window.PHOENIX_CONFIG || {};
  const invite = config.synapseInviteUrl || '';
  const dashboard = config.synapseDashboardUrl || 'dashboard.html';
  const stripe = config.synapseStripeUrl || '';
  const discord = config.discordUrl || '';
  const logo = './assets/logo-phoenix-ph.png';

  const external = (href, cls, label, attrs='') => href ? `<a class="${cls}" href="${href}" target="_blank" rel="noopener" ${attrs}>${label}</a>` : '';
  const internal = (href, cls, label, attrs='') => href ? `<a class="${cls}" href="${href}" ${attrs}>${label}</a>` : '';
  const dashboardButton = internal(dashboard,'syn-v2-btn syn-v2-btn-ghost','Ouvrir le dashboard ↗','data-dashboard-link');

  document.body.innerHTML = `
  <div class="syn-v2">
    <header class="syn-v2-header" data-syn-v2-header>
      <a class="syn-v2-brand" href="index.html" aria-label="Phoenix Inc | Development"><img src="${logo}" alt=""><span><b>Phoenix Inc |</b><small>Development</small></span></a>
      <nav class="syn-v2-nav"><a href="index.html">Accueil</a><a href="scripts.html">Scripts</a><a href="bots.html" class="active">Bots</a><a href="dashboard.html">Dashboard</a><a href="services.html">Web · Apps · Autres</a></nav>
      <div class="syn-v2-actions">${external(discord,'syn-v2-btn syn-v2-btn-ghost','Discord ↗')}<button class="syn-v2-menu" type="button" data-syn-v2-menu>☰</button></div>
    </header>

    <main>
      <section class="syn-v2-shell syn-v2-hero">
        <article class="syn-v2-copy">
          <span class="syn-v2-kicker">DISCORD / SYNAPSE</span>
          <h1>Construisez votre Discord.<br><span class="syn-v2-gradient">Gardez le contrôle ensuite.</span></h1>
          <p>Synapse construit la base de votre serveur avec le Builder, puis vous laisse tout gérer depuis le dashboard intégré : salons, rôles, permissions, tickets, modération, communauté et réglages restent modifiables après la création.</p>
          <div class="syn-v2-pills"><span class="syn-v2-pill">Builder</span><span class="syn-v2-pill">Dashboard</span><span class="syn-v2-pill">Tickets</span><span class="syn-v2-pill">Modération</span><span class="syn-v2-pill">Communauté</span><span class="syn-v2-pill">Interserver</span></div>
          <div class="syn-v2-free-entry"><b>GRATUIT POUR COMMENCER</b><span>Premium uniquement pour les fonctions avancées.</span></div>
          <div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse à mon Discord ↗')}${dashboardButton}</div>
        </article>

        <article class="syn-v2-workflow syn-v2-workflow-real">
          <div class="syn-v2-flow-title"><small>EXEMPLE CONCRET</small><strong>Synapse crée le serveur. Le dashboard garde tout modifiable.</strong></div>
          <div class="syn-real-flow">
            <div class="syn-discord-mock">
              <div class="sdm-servers">
                <span class="sdm-home">◆</span>
                <span class="active"><img src="${logo}" alt=""></span>
                <span>G</span><span>+</span>
              </div>
              <div class="sdm-channels">
                <div class="sdm-server-title">Community Server <b>⌄</b></div>
                <div class="sdm-channel-group"><small>ACCUEIL</small><span class="active"># bienvenue</span><span># règlement</span></div>
                <div class="sdm-channel-group"><small>COMMUNAUTÉ</small><span># général</span><span># médias</span></div>
                <div class="sdm-channel-group"><small>SUPPORT</small><span># ouvrir-un-ticket</span></div>
                <div class="sdm-channel-group"><small>VOCAL</small><span>🔊 Général</span></div>
                <div class="sdm-profile"><i></i><div><b>Phoenix</b><small>En ligne</small></div><span>⚙</span></div>
              </div>
              <div class="sdm-chat">
                <div class="sdm-chat-top"><b># bienvenue</b><span>Bienvenue sur le serveur</span><em>⌕ ☰</em></div>
                <div class="sdm-messages">
                  <div class="sdm-welcome-icon">#</div>
                  <h3>Bienvenue dans # bienvenue !</h3>
                  <p>C'est le début du salon #bienvenue.</p>
                  <article><span class="sdm-avatar bot"><img src="${logo}" alt=""></span><div><b>Synapse <em>APP</em></b><small>Aujourd'hui à 12:42</small><p>La structure du serveur est prête. Les salons, rôles et permissions peuvent maintenant être ajustés depuis votre Dashboard Synapse.</p></div></article>
                </div>
                <div class="sdm-input">Envoyer un message dans #bienvenue <span>☺</span></div>
              </div>
              <div class="sdm-members">
                <small>EN LIGNE — 3</small>
                <span><i class="owner"></i><b>Phoenix</b><em>👑</em></span>
                <span><i class="bot"></i><b>Synapse</b><em>BOT</em></span>
                <span><i></i><b>Modérateur</b></span>
                <small>HORS LIGNE — 2</small>
                <span class="offline"><i></i><b>Membre</b></span>
              </div>
            </div>

            <div class="syn-real-link"><span>SYNC</span><b>→</b><small>mêmes données</small></div>

            <div class="syn-dashboard-real">
              <div class="sdr-top"><div><img src="${logo}" alt=""><span><b>SYNAPSE</b><small>Dashboard</small></span></div><em>CONNECTED</em></div>
              <div class="sdr-body">
                <aside><b>Overview</b><span class="active">Builder</span><span>Structure</span><span>Tickets</span><span>Moderation</span><span>Community</span><span>Premium</span></aside>
                <main>
                  <div class="sdr-heading"><div><small>COMMUNITY SERVER</small><h3>Structure</h3></div><button>Enregistrer</button></div>
                  <div class="sdr-stats"><span><b>12</b><small>SALONS</small></span><span><b>8</b><small>RÔLES</small></span><span><b>ON</b><small>TICKETS</small></span></div>
                  <div class="sdr-list"><article><div><i>#</i><span><b>bienvenue</b><small>ACCUEIL</small></span></div><button>Modifier</button></article><article><div><i>#</i><span><b>général</b><small>COMMUNAUTÉ</small></span></div><button>Modifier</button></article><article><div><i>♟</i><span><b>Modérateur</b><small>RÔLE</small></span></div><button>Permissions</button></article><article><div><i>◈</i><span><b>Tickets</b><small>MODULE</small></span></div><button>Gérer</button></article></div>
                </main>
              </div>
              <div class="sdr-footer"><b>Tout ce qui est créé reste modifiable</b><span>Builder · salons · rôles · permissions · modules</span></div>
            </div>
          </div>
          <div class="syn-real-caption"><span>1. Le Builder génère une vraie structure Discord.</span><span>2. Le dashboard reprend cette structure et permet de la modifier ensuite.</span></div>
        </article>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">LE CŒUR DE SYNAPSE</span><h2>Le Builder crée.<br>Le dashboard prend le relais.</h2></div><p>Les templates servent de point de départ, pas de cage. Une fois la structure générée, vous pouvez ajuster ce qui a été créé directement depuis le dashboard.</p></div>
        <div class="syn-v2-modules">
          <article class="syn-v2-module main"><small>01 / MAIN FEATURE</small><h3>Server Builder</h3><p>Templates, catégories, salons, rôles et permissions générés depuis une configuration simple. La structure obtenue reste ensuite entièrement modifiable dans le dashboard.</p></article>
          <article class="syn-v2-module"><small>02 / DASHBOARD</small><h3>Gestion web</h3><p>Modifiez Builder, tickets, salons, rôles, permissions et réglages depuis une interface unique.</p></article>
          <article class="syn-v2-module"><small>03 / SUPPORT</small><h3>Tickets</h3><p>Panneaux, formulaires, claim, fermeture, réouverture et transcripts.</p></article>
          <article class="syn-v2-module"><small>04 / STAFF</small><h3>Modération</h3><p>Warn, timeout, kick, ban, clear, historique et outils de gestion.</p></article>
          <article class="syn-v2-module"><small>05 / COMMUNITY</small><h3>Communauté</h3><p>Bienvenue, départs, suggestions, rôles et outils d’animation.</p></article>
          <article class="syn-v2-module"><small>06 / ORIGINAL</small><h3>Interserver</h3><p>Le module historique pour relier des salons entre plusieurs serveurs Discord.</p></article>
        </div>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">INCLUS GRATUITEMENT</span><h2>Tout ce qu’il faut<br>pour démarrer.</h2></div><p>Synapse permet déjà de construire et gérer une communauté. Le Premium rajoute et complète l’expérience quand les besoins deviennent plus avancés.</p></div>
        <div class="syn-v2-free"><article><small>BUILDER</small><h3>Créer la structure</h3><p>Templates FR / EN / ES, salons, catégories, rôles et permissions.</p></article><article><small>DASHBOARD</small><h3>Modifier ensuite</h3><p>Retouchez ce que le Builder a créé et gérez les modules depuis le web.</p></article><article><small>TICKETS</small><h3>Organiser le support</h3><p>Formulaires, claim, fermeture, réouverture et transcripts.</p></article><article><small>MODÉRATION</small><h3>Gérer le serveur</h3><p>Les outils essentiels pour administrer proprement la communauté.</p></article></div>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-premium">
          <div><span class="syn-v2-kicker">SYNAPSE PREMIUM</span><h2>Plus de contrôle.<br>Plus d’automatisation.</h2><p>Commencez gratuitement. Passez Premium quand vous en avez besoin : sécurité avancée, automatisations et modules supplémentaires viennent compléter l’expérience sans bloquer la base gratuite.</p><div class="syn-v2-premium-price"><strong>5 €</strong><span>/ mois · / serveur · sans engagement</span></div><div class="syn-v2-hero-actions">${external(stripe,'syn-v2-btn syn-v2-btn-primary','Passer Premium avec Stripe ↗')}${internal('dashboard.html#premium','syn-v2-btn syn-v2-btn-ghost','Gérer mon abonnement ↗')}</div></div>
          <div class="syn-v2-premium-list"><span>AutoMod avancé</span><span>Anti-Raid</span><span>Backups de structure</span><span>Interserver</span><span>Temp Voice</span><span>Levels & XP</span><span>Giveaways</span><span>Commandes personnalisées</span><span>Réglages avancés</span><span>Automatisations supplémentaires</span></div>
        </div>
      </section>

      <section class="syn-v2-shell syn-v2-final"><div><span class="syn-v2-kicker">PRÊT À COMMENCER ?</span><h2>Ajoutez Synapse.<br>Construisez votre serveur.</h2><p>Une fois Synapse autorisé sur votre Discord, le dashboard intégré devient votre espace de gestion pour modifier la structure et les modules.</p></div><div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse ↗')}${internal(dashboard,'syn-v2-btn syn-v2-btn-ghost','Ouvrir le dashboard ↗')}</div></section>
    </main>

    <footer class="syn-v2-footer"><span>© 2026 Phoenix Inc | Development</span><span>Synapse · Free + Premium · Discord platform</span></footer>
  </div>`;

  document.querySelector('[data-syn-v2-menu]')?.addEventListener('click',()=>document.querySelector('[data-syn-v2-header]')?.classList.toggle('open'));
})();