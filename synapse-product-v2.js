(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;
  document.body.classList.add('synapse-product-v2');

  const config = window.PHOENIX_CONFIG || {};
  const invite = config.synapseInviteUrl || '';
  const discord = config.discordUrl || '';
  const logo = './assets/logo-phoenix-ph.png';
  const commands = 'synapse-commands.html';

  const external = (href, cls, label) => href ? `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}</a>` : '';
  const internal = (href, cls, label) => `<a class="${cls}" href="${href}">${label}</a>`;

  document.body.innerHTML = `
  <div class="syn-v2">
    <header class="syn-v2-header" data-syn-v2-header>
      <a class="syn-v2-brand" href="index.html" aria-label="Phoenix Inc | Development"><img src="${logo}" alt=""><span><b>Phoenix Inc |</b><small>Development</small></span></a>
      <nav class="syn-v2-nav"><a href="index.html">Accueil</a><a href="scripts.html">Scripts</a><a href="bots.html" class="active">Bots</a><a href="${commands}">Commandes</a><a href="services.html">Web · Apps · Autres</a></nav>
      <div class="syn-v2-actions">${external(discord,'syn-v2-btn syn-v2-btn-ghost','Discord ↗')}<button class="syn-v2-menu" type="button" data-syn-v2-menu>☰</button></div>
    </header>

    <main>
      <section class="syn-v2-shell syn-v2-hero">
        <article class="syn-v2-copy">
          <span class="syn-v2-kicker">DISCORD / SYNAPSE</span>
          <h1>Construisez. Analysez.<br><span class="syn-v2-gradient">Adaptez votre Discord.</span></h1>
          <p>Synapse peut créer une structure complète, analyser un serveur déjà existant et compléter ou remplacer uniquement ce dont vous avez besoin. Tickets, messages, règlement, communauté et Interserver se configurent directement depuis Discord.</p>
          <div class="syn-v2-pills"><span class="syn-v2-pill">Adaptive Builder</span><span class="syn-v2-pill">Tickets</span><span class="syn-v2-pill">Messages</span><span class="syn-v2-pill">Communauté</span><span class="syn-v2-pill">Interserver</span><span class="syn-v2-pill">Premium Discord</span></div>
          <div class="syn-v2-free-entry"><b>GRATUIT POUR COMMENCER</b><span>Le Premium ajoute les fonctions avancées directement dans Discord.</span></div>
          <div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse à votre serveur ↗')}${internal(commands,'syn-v2-btn syn-v2-btn-ghost','Voir toutes les commandes →')}</div>
        </article>

        <article class="syn-v2-workflow syn-v2-adaptive-hero">
          <div class="syn-v2-flow-title"><small>ADAPTIVE SETUP</small><strong>Synapse s’adapte aussi à un serveur déjà construit.</strong></div>
          <div class="syn-adapt-grid">
            <article><span>01</span><small>ANALYSER</small><h3>Comprendre l’existant</h3><p>Salons, catégories, rôles, permissions, règlement, bienvenue, tickets et logs sont détectés sans rien modifier.</p></article>
            <article><span>02</span><small>PROPOSER</small><h3>Choisir quoi améliorer</h3><p>Créer un serveur complet, compléter la structure ou remplacer seulement un module précis.</p></article>
            <article><span>03</span><small>APPLIQUER</small><h3>Modifier proprement</h3><p>Synapse demande confirmation avant toute suppression et évite de créer des doublons inutiles.</p></article>
          </div>
          <div class="syn-adapt-command"><code>/analyse_serveur</code><span>→ Synapse inspecte et propose un plan d’intégration.</span></div>
        </article>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">LE CŒUR DE SYNAPSE</span><h2>Un Builder qui ne travaille<br>pas uniquement avec ses templates.</h2></div><p>Les templates Synapse sont disponibles pour partir de zéro, mais le bot sait aussi intervenir sur une structure existante sans reconstruire tout le Discord.</p></div>
        <div class="syn-v2-modules">
          <article class="syn-v2-module main"><small>01 / MAIN FEATURE</small><h3>Adaptive Builder</h3><p>Analyse le serveur, détecte les éléments existants puis crée, complète ou remplace les modules demandés.</p></article>
          <article class="syn-v2-module"><small>02 / SUPPORT</small><h3>Tickets</h3><p>Analyse de l’ancien système, installation propre, remplacement confirmé, ouverture et fermeture directement dans Discord.</p></article>
          <article class="syn-v2-module"><small>03 / CONTENT</small><h3>Messages & embeds</h3><p>Annonces, règlement, messages interactifs et futures actions via boutons ou sélecteurs.</p></article>
          <article class="syn-v2-module"><small>04 / COMMUNITY</small><h3>Communauté</h3><p>Bienvenue, règlement, avis, réputation et autres modules communautaires réunis dans un seul bot.</p></article>
          <article class="syn-v2-module"><small>05 / NETWORK</small><h3>Interserver</h3><p>Codes de synchronisation, alias et salons reliés entre plusieurs serveurs Discord.</p></article>
          <article class="syn-v2-module"><small>06 / CONTROL</small><h3>Commandes Discord</h3><p>Chaque fonction reste accessible clairement via slash commands, formulaires, boutons et menus natifs Discord.</p></article>
        </div>
      </section>

      <section class="syn-v2-section syn-v2-shell syn-command-showcase">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">PILOTAGE DANS DISCORD</span><h2>Pas besoin d’un Dashboard<br>pour administrer la V1.</h2></div><p>La V1 est pensée pour être simple à héberger : Synapse se pilote avec des commandes et interfaces natives Discord. Une page dédiée récapitule toutes les commandes disponibles.</p></div>
        <div class="syn-command-preview">
          <article><code>/analyse_serveur</code><p>Analyse sans modifier.</p></article>
          <article><code>/tickets remplacer</code><p>Remplace un ancien système après confirmation.</p></article>
          <article><code>/annonce</code><p>Ouvre un formulaire de création.</p></article>
          <article><code>/generate_sync_code</code><p>Relie plusieurs Discord.</p></article>
          <article><code>/aide_synapse</code><p>Affiche l’aide directement dans Discord.</p></article>
        </div>
        <div class="syn-v2-hero-actions">${internal(commands,'syn-v2-btn syn-v2-btn-primary','Explorer toutes les commandes →')}</div>
      </section>

      <section class="syn-v2-section syn-v2-shell syn-dashboard-future">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">MISE À JOUR FUTURE</span><h2>Dashboard Web Synapse</h2></div><p>Le Dashboard complet n’est plus nécessaire pour lancer Synapse. Il reste en développement et arrivera plus tard comme interface web complémentaire pour centraliser la gestion de plusieurs serveurs.</p></div>
        <div class="syn-future-carousel" data-future-carousel>
          <div class="syn-future-track" data-future-track>
            <article><small>BUILDER</small><h3>Structure & adaptation</h3><p>Gestion visuelle des salons, catégories, rôles et permissions.</p></article>
            <article><small>TICKETS</small><h3>Ticket Studio</h3><p>Panels, boutons, formulaires, staff, transcripts et statistiques.</p></article>
            <article><small>SÉCURITÉ</small><h3>Modération & AutoMod</h3><p>Protections, logs, sanctions, whitelists et historique.</p></article>
            <article><small>MULTI-SERVEURS</small><h3>Centre de contrôle</h3><p>Basculer entre les serveurs où Synapse est installé depuis une seule interface.</p></article>
            <article><small>PREMIUM</small><h3>Abonnement & codes</h3><p>Gestion du statut Premium et des codes offerts depuis une interface dédiée.</p></article>
          </div>
          <div class="syn-future-controls"><button type="button" data-future-prev>←</button><span>PROCHAINEMENT</span><button type="button" data-future-next>→</button></div>
        </div>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-premium">
          <div><span class="syn-v2-kicker">SYNAPSE PREMIUM</span><h2>Premium,<br>directement dans Discord.</h2><p>Le paiement et l’état Premium seront intégrés à Discord pour garder un parcours simple. Les fonctions gratuites restent utilisables sans abonnement ; Premium débloque les automatismes et protections avancées.</p><div class="syn-v2-premium-price"><strong>5 €</strong><span>/ mois · / serveur · sans engagement</span></div><div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse pour commencer ↗')}<span class="syn-premium-note">Commande <code>/premium</code> prévue dans la V1</span></div></div>
          <div class="syn-v2-premium-list"><span>AutoMod avancé</span><span>Anti-Raid</span><span>Backups de structure</span><span>Interserver avancé</span><span>Temp Voice</span><span>Levels & XP</span><span>Giveaways</span><span>Commandes personnalisées</span><span>Automatisations supplémentaires</span><span>Codes Premium / lifetime</span></div>
        </div>
      </section>

      <section class="syn-v2-shell syn-v2-final"><div><span class="syn-v2-kicker">PRÊT À COMMENCER ?</span><h2>Ajoutez Synapse.<br>Laissez-le comprendre votre serveur.</h2><p>Créez une nouvelle structure ou analysez votre Discord actuel, puis choisissez exactement ce que Synapse doit améliorer.</p></div><div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse ↗')}${internal(commands,'syn-v2-btn syn-v2-btn-ghost','Voir les commandes →')}</div></section>
    </main>

    <footer class="syn-v2-footer"><span>© 2026 Phoenix Inc | Development</span><span>Synapse · Discord-first · Dashboard futur</span></footer>
  </div>`;

  document.querySelector('[data-syn-v2-menu]')?.addEventListener('click',()=>document.querySelector('[data-syn-v2-header]')?.classList.toggle('open'));

  const track=document.querySelector('[data-future-track]');
  if(track){
    let index=0;
    const cards=[...track.children];
    const move=()=>{ const card=cards[0]; if(!card) return; const gap=14; track.style.transform=`translateX(-${index*(card.getBoundingClientRect().width+gap)}px)`; };
    document.querySelector('[data-future-next]')?.addEventListener('click',()=>{index=Math.min(index+1,Math.max(0,cards.length-2));move();});
    document.querySelector('[data-future-prev]')?.addEventListener('click',()=>{index=Math.max(index-1,0);move();});
    window.addEventListener('resize',move);
  }
})();