(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;
  document.body.classList.add('synapse-product-v2');
  const config = window.PHOENIX_CONFIG || {};
  const stripe = config.synapseStripeUrl || '';
  const invite = config.synapseInviteUrl || '';
  const discord = config.discordUrl || '';
  const logo = './assets/logo-phoenix-ph.png';

  const html = `
  <div class="syn-v2">
    <header class="syn-v2-header" data-syn-v2-header>
      <a class="syn-v2-brand" href="index.html"><img src="${logo}" alt=""><span><b>Phoenix Inc.</b><small>Development</small></span></a>
      <nav class="syn-v2-nav"><a href="index.html">Accueil</a><a href="scripts.html">Scripts</a><a href="bots.html" class="active">Bots</a><a href="services.html">Web · Apps · Autres</a></nav>
      <div class="syn-v2-actions"><a class="syn-v2-btn syn-v2-btn-ghost" href="${discord}" target="_blank" rel="noopener">Discord ↗</a><a class="syn-v2-btn syn-v2-btn-orange" href="${stripe}" target="_blank" rel="noopener">Premium · Stripe ↗</a><button class="syn-v2-menu" type="button" data-syn-v2-menu>☰</button></div>
    </header>
    <main>
      <section class="syn-v2-shell syn-v2-hero">
        <article class="syn-v2-copy">
          <span class="syn-v2-kicker">DISCORD / SYNAPSE</span>
          <h1>Construisez votre Discord.<br><span class="syn-v2-gradient">Gérez tout au même endroit.</span></h1>
          <p>Synapse réunit la création de serveur, les tickets, la modération, la sécurité, la communauté, Interserver et un dashboard web dans une même plateforme. Le Builder est le point de départ : vous préparez la structure, Synapse la construit.</p>
          <div class="syn-v2-pills"><span class="syn-v2-pill">Builder</span><span class="syn-v2-pill">Tickets</span><span class="syn-v2-pill">Modération</span><span class="syn-v2-pill">Sécurité</span><span class="syn-v2-pill">Interserver</span><span class="syn-v2-pill">Dashboard</span></div>
          <div class="syn-v2-price-line"><strong>5 €</strong><span>/ mois · / serveur · sans engagement</span></div>
          <div class="syn-v2-hero-actions"><a class="syn-v2-btn syn-v2-btn-primary" href="${stripe}" target="_blank" rel="noopener">Passer Premium ↗</a><a class="syn-v2-btn syn-v2-btn-ghost" href="${invite}" target="_blank" rel="noopener">Ajouter Synapse ↗</a></div>
        </article>
        <article class="syn-v2-builder">
          <div class="syn-v2-builder-top"><span>SYNAPSE / SERVER BUILDER</span><em>READY TO BUILD</em></div>
          <div class="syn-v2-builder-layout">
            <aside class="syn-v2-builder-side"><small>TEMPLATE</small><div class="syn-v2-template"><b>COMMUNITY SERVER</b><span>Structure prête à adapter</span></div></aside>
            <div class="syn-v2-builder-main"><small>APERÇU DE LA STRUCTURE</small><div class="syn-v2-tree"><div><b>▾ ACCUEIL</b><span># bienvenue</span><span># règlement</span></div><div><b>▾ COMMUNAUTÉ</b><span># général</span><span># médias</span></div><div><b>▾ SUPPORT</b><span># tickets</span></div><div><b>▾ STAFF</b><span># modération</span></div></div></div>
          </div>
          <div class="syn-v2-builder-footer"><b>STRUCTURE PRÊTE</b><span>Templates · salons · rôles · permissions</span></div>
        </article>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">LE CŒUR DE SYNAPSE</span><h2>Le Builder d’abord.<br>Le reste autour.</h2></div><p>La création du serveur est la fonction à mettre en avant : elle évite de repartir de zéro et donne une base claire avant d’activer les autres modules.</p></div>
        <div class="syn-v2-modules">
          <article class="syn-v2-module main"><small>01 / MAIN FEATURE</small><h3>Server Builder</h3><p>Templates, catégories, salons, rôles et permissions générés depuis une configuration simple. C’est le point de départ de toute l’expérience Synapse.</p></article>
          <article class="syn-v2-module"><small>02 / SUPPORT</small><h3>Tickets</h3><p>Panneaux, formulaires, claim, fermeture, réouverture et transcripts pour structurer le support.</p></article>
          <article class="syn-v2-module"><small>03 / STAFF</small><h3>Modération</h3><p>Warn, timeout, kick, ban, clear, historique et outils de gestion pour l’équipe.</p></article>
          <article class="syn-v2-module"><small>04 / COMMUNITY</small><h3>Communauté</h3><p>Bienvenue, départs, suggestions, rôles et outils d’animation pour garder un Discord vivant.</p></article>
          <article class="syn-v2-module"><small>05 / ORIGINAL</small><h3>Interserver</h3><p>Le module historique de Synapse pour relier des salons entre plusieurs serveurs Discord.</p></article>
          <article class="syn-v2-module"><small>06 / DASHBOARD</small><h3>Configuration web</h3><p>Gérez les modules depuis une interface unique au lieu d’empiler les commandes et les fichiers.</p></article>
        </div>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-premium">
          <div><span class="syn-v2-kicker">SYNAPSE PREMIUM</span><h2>Plus de contrôle.<br>Plus d’automatisation.</h2><p>La version gratuite reste réellement utilisable. Premium débloque les fonctions avancées pour les communautés qui veulent aller plus loin dans la sécurité, l’automatisation et la gestion.</p><div class="syn-v2-premium-price"><strong>5 €</strong><span>/ mois · / serveur</span></div><div class="syn-v2-hero-actions"><a class="syn-v2-btn syn-v2-btn-primary" href="${stripe}" target="_blank" rel="noopener">S’abonner avec Stripe ↗</a></div></div>
          <div class="syn-v2-premium-list"><span>AutoMod avancé</span><span>Anti-Raid</span><span>Backups de structure</span><span>Interserver</span><span>Temp Voice</span><span>Levels & XP</span><span>Giveaways</span><span>Commandes personnalisées</span><span>Réglages avancés</span><span>Automatisations supplémentaires</span></div>
        </div>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">INCLUS GRATUITEMENT</span><h2>Une vraie base.<br>Pas une démo vide.</h2></div><p>Synapse Free permet déjà de construire et gérer une communauté. Premium complète l’expérience quand les besoins deviennent plus avancés.</p></div>
        <div class="syn-v2-free"><article><small>BUILDER</small><h3>Créer la structure</h3><p>Templates FR / EN / ES, salons, catégories, rôles et permissions.</p></article><article><small>TICKETS</small><h3>Organiser le support</h3><p>Formulaires, claim, fermeture et transcripts.</p></article><article><small>MODÉRATION</small><h3>Gérer le serveur</h3><p>Outils essentiels de modération et historique.</p></article><article><small>COMMUNAUTÉ</small><h3>Faire vivre Discord</h3><p>Welcome, goodbye, rôles, suggestions et outils essentiels.</p></article></div>
      </section>

      <section class="syn-v2-shell syn-v2-final"><div><h2>Commencer gratuitement.<br>Passer Premium quand vous en avez besoin.</h2><p>Ajoutez Synapse, construisez votre base avec le Builder, puis activez Premium lorsque vous voulez les fonctions avancées.</p></div><div class="syn-v2-hero-actions"><a class="syn-v2-btn syn-v2-btn-primary" href="${invite}" target="_blank" rel="noopener">Ajouter Synapse ↗</a><a class="syn-v2-btn syn-v2-btn-orange" href="${stripe}" target="_blank" rel="noopener">Prendre Premium ↗</a></div></section>
    </main>
    <footer class="syn-v2-footer"><span>© 2026 Phoenix Inc. Development</span><span>Synapse · Discord platform · Free + Premium</span></footer>
  </div>`;

  document.body.innerHTML = html;
  document.querySelector('[data-syn-v2-menu]')?.addEventListener('click',()=>document.querySelector('[data-syn-v2-header]')?.classList.toggle('open'));
})();
