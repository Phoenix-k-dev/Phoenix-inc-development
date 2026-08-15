(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;
  document.body.classList.add('synapse-product-v2');

  const config = window.PHOENIX_CONFIG || {};
  const invite = config.synapseInviteUrl || '';
  const dashboard = config.synapseLoginUrl || config.synapseDashboardUrl || '';
  const stripe = config.synapseStripeUrl || '';
  const discord = config.discordUrl || '';
  const logo = './assets/logo-phoenix-ph.png';

  const link = (href, cls, label, attrs='') => href
    ? `<a class="${cls}" href="${href}" target="_blank" rel="noopener" ${attrs}>${label}</a>`
    : '';

  const dashboardButton = dashboard
    ? link(dashboard,'syn-v2-btn syn-v2-btn-ghost','Ouvrir le dashboard ↗','data-dashboard-link')
    : `<span class="syn-v2-dashboard-note">Dashboard accessible après connexion Discord</span>`;

  document.body.innerHTML = `
  <div class="syn-v2">
    <header class="syn-v2-header" data-syn-v2-header>
      <a class="syn-v2-brand" href="index.html"><img src="${logo}" alt=""><span><b>Phoenix Inc.</b><small>Development</small></span></a>
      <nav class="syn-v2-nav"><a href="index.html">Accueil</a><a href="scripts.html">Scripts</a><a href="bots.html" class="active">Bots</a><a href="services.html">Web · Apps · Autres</a></nav>
      <div class="syn-v2-actions">${link(discord,'syn-v2-btn syn-v2-btn-ghost','Discord ↗')}<button class="syn-v2-menu" type="button" data-syn-v2-menu>☰</button></div>
    </header>

    <main>
      <section class="syn-v2-shell syn-v2-hero">
        <article class="syn-v2-copy">
          <span class="syn-v2-kicker">DISCORD / SYNAPSE</span>
          <h1>Construisez votre Discord.<br><span class="syn-v2-gradient">Gardez le contrôle ensuite.</span></h1>
          <p>Synapse construit la base de votre serveur avec le Builder, puis vous laisse tout gérer depuis un dashboard web : salons, rôles, permissions, tickets, modération, communauté et réglages restent modifiables après la création.</p>
          <div class="syn-v2-pills"><span class="syn-v2-pill">Builder</span><span class="syn-v2-pill">Dashboard</span><span class="syn-v2-pill">Tickets</span><span class="syn-v2-pill">Modération</span><span class="syn-v2-pill">Communauté</span><span class="syn-v2-pill">Interserver</span></div>
          <div class="syn-v2-free-entry"><b>GRATUIT POUR COMMENCER</b><span>Premium uniquement pour les fonctions avancées.</span></div>
          <div class="syn-v2-hero-actions">${link(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse à mon Discord ↗')}${dashboardButton}</div>
        </article>

        <article class="syn-v2-workflow">
          <div class="syn-v2-flow-title"><small>DU BUILDER AU DASHBOARD</small><strong>Ce que Synapse crée reste modifiable.</strong></div>
          <div class="syn-v2-flow-grid">
            <div class="syn-v2-builder compact">
              <div class="syn-v2-builder-top"><span>SERVER BUILDER</span><em>READY</em></div>
              <div class="syn-v2-builder-layout">
                <aside class="syn-v2-builder-side"><small>TEMPLATE</small><div class="syn-v2-template"><b>COMMUNITY</b><span>Base prête</span></div></aside>
                <div class="syn-v2-builder-main"><small>STRUCTURE</small><div class="syn-v2-tree"><div><b>▾ ACCUEIL</b><span># bienvenue</span><span># règlement</span></div><div><b>▾ COMMUNAUTÉ</b><span># général</span><span># médias</span></div><div><b>▾ SUPPORT</b><span># tickets</span></div></div></div>
              </div>
              <div class="syn-v2-builder-footer"><b>STRUCTURE CRÉÉE</b><span>salons · rôles · permissions</span></div>
            </div>

            <div class="syn-v2-flow-arrow">→</div>

            <div class="syn-v2-dashboard-preview">
              <div class="sdp-top"><span>SYNAPSE / DASHBOARD</span><em>CONNECTED</em></div>
              <div class="sdp-shell">
                <aside><b>Overview</b><span class="active">Builder</span><span>Tickets</span><span>Moderation</span><span>Community</span><span>Premium</span></aside>
                <div class="sdp-main"><small>MON SERVEUR</small><h3>Community Server</h3><div class="sdp-stat-row"><span><b>12</b><small>SALONS</small></span><span><b>8</b><small>RÔLES</small></span><span><b>ON</b><small>TICKETS</small></span></div><div class="sdp-edit"><span>Structure créée par le Builder</span><button>MODIFIER</button></div><div class="sdp-edit"><span>Tickets & formulaires</span><button>GÉRER</button></div><div class="sdp-edit"><span>Permissions & rôles</span><button>ÉDITER</button></div></div>
              </div>
              <div class="sdp-foot"><b>TOUT RESTE MODIFIABLE</b><span>sans refaire le serveur</span></div>
            </div>
          </div>
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
          <div><span class="syn-v2-kicker">SYNAPSE PREMIUM</span><h2>Plus de contrôle.<br>Plus d’automatisation.</h2><p>Commencez gratuitement. Passez Premium quand vous en avez besoin : sécurité avancée, automatisations et modules supplémentaires viennent compléter l’expérience sans bloquer la base gratuite.</p><div class="syn-v2-premium-price"><strong>5 €</strong><span>/ mois · / serveur · sans engagement</span></div><div class="syn-v2-hero-actions">${link(stripe,'syn-v2-btn syn-v2-btn-primary','Passer Premium avec Stripe ↗')}${dashboard ? link(dashboard,'syn-v2-btn syn-v2-btn-ghost','Gérer mon abonnement ↗') : ''}</div></div>
          <div class="syn-v2-premium-list"><span>AutoMod avancé</span><span>Anti-Raid</span><span>Backups de structure</span><span>Interserver</span><span>Temp Voice</span><span>Levels & XP</span><span>Giveaways</span><span>Commandes personnalisées</span><span>Réglages avancés</span><span>Automatisations supplémentaires</span></div>
        </div>
      </section>

      <section class="syn-v2-shell syn-v2-final"><div><span class="syn-v2-kicker">PRÊT À COMMENCER ?</span><h2>Ajoutez Synapse.<br>Construisez votre serveur.</h2><p>Une fois Synapse autorisé sur votre Discord, le dashboard devient votre espace de gestion pour modifier la structure et les modules.</p></div><div class="syn-v2-hero-actions">${link(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse ↗')}${dashboard ? link(dashboard,'syn-v2-btn syn-v2-btn-ghost','Se connecter au dashboard ↗') : ''}</div></section>
    </main>

    <footer class="syn-v2-footer"><span>© 2026 Phoenix Inc. Development</span><span>Synapse · Free + Premium · Discord platform</span></footer>
  </div>`;

  document.querySelector('[data-syn-v2-menu]')?.addEventListener('click',()=>document.querySelector('[data-syn-v2-header]')?.classList.toggle('open'));
})();
