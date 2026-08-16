(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;
  document.body.classList.add('synapse-product-v2');

  const config = window.PHOENIX_CONFIG || {};
  const invite = config.synapseInviteUrl || '';
  const discord = config.discordUrl || '';
  const premiumStore = config.synapseDiscordStoreUrl || `https://discord.com/application-directory/${config.discordApplicationId || '1535652568150057011'}/store`;
  const logo = './assets/logo-phoenix-ph.png';
  const commands = 'synapse-commands.html';
  const docs = config.synapseDocsUrl || 'synapse-docs.html';

  const external = (href, cls, label) => href ? `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}</a>` : '';
  const internal = (href, cls, label) => `<a class="${cls}" href="${href}">${label}</a>`;

  const dashboardPreview = (kicker,title,desc,type) => `
    <article class="syn-future-preview-slide">
      <div class="syn-future-dashboard-shot ${type}">
        <aside class="syn-shot-servers"><i></i><i></i><i class="active"></i><i></i><i></i></aside>
        <nav class="syn-shot-nav">
          <div><img src="${logo}" alt=""><b>SYNAPSE</b></div>
          <small>${kicker}</small>
          <span class="active">Vue d’ensemble</span><span>Configuration</span><span>Modules</span><span>Automatisations</span><span>Logs</span>
        </nav>
        <main class="syn-shot-main">
          <header><div><small>${kicker}</small><strong>${title}</strong></div><em>CONNECTED</em></header>
          <div class="syn-shot-stat-row"><span></span><span></span><span></span></div>
          <section class="syn-shot-panel"><div></div><div></div><div></div><div></div></section>
        </main>
      </div>
      <div class="syn-future-preview-copy"><small>${kicker}</small><h3>${title}</h3><p>${desc}</p></div>
    </article>`;

  document.body.innerHTML = `
  <div class="syn-v2">
    <header class="syn-v2-header" data-syn-v2-header>
      <a class="syn-v2-brand" href="index.html" aria-label="Phoenix Inc | Development"><img src="${logo}" alt=""><span><b>Phoenix Inc |</b><small>Development</small></span></a>
      <nav class="syn-v2-nav"><a href="index.html">Accueil</a><a href="scripts.html">Scripts</a><a href="bots.html" class="active">Bots</a><a href="${commands}">Commandes</a><a href="${docs}">Documentation</a><a href="services.html">Web · Apps · Autres</a></nav>
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
          <div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse à votre serveur ↗')}${internal(commands,'syn-v2-btn syn-v2-btn-ghost','Voir toutes les commandes →')}${internal(docs,'syn-v2-btn syn-v2-btn-ghost','Lire la documentation →')}</div>
        </article>

        <article class="syn-v2-workflow syn-v2-adaptive-hero">
          <div class="syn-v2-flow-title"><small>ADAPTIVE SETUP</small><strong>Synapse s’adapte aussi à un serveur déjà construit.</strong></div>
          <div class="syn-adapt-grid">
            <article><span>01</span><small>ANALYSER</small><h3>Comprendre l’existant</h3><p>Salons, catégories, rôles, permissions, règlement, bienvenue, tickets et logs sont détectés sans rien modifier.</p></article>
            <article><span>02</span><small>PROPOSER</small><h3>Choisir quoi améliorer</h3><p>Créer un serveur complet, compléter la structure ou remplacer seulement un module précis.</p></article>
            <article><span>03</span><small>APPLIQUER</small><h3>Modifier proprement</h3><p>Synapse demande confirmation avant toute suppression et évite de créer des doublons inutiles.</p></article>
          </div>
          <div class="syn-adapt-command"><code>/scan</code><span>→ Synapse inspecte et propose un plan d’intégration.</span></div>
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
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">PILOTAGE DANS DISCORD</span><h2>Pilotez Synapse<br>directement dans Discord.</h2></div><p>Commandes slash, boutons, sélecteurs et formulaires natifs permettent de configurer rapidement Synapse sans quitter votre serveur.</p></div>
        <div class="syn-command-preview">
          <article><code>/scan</code><p>Analyse sans modifier.</p></article>
          <article><code>/builder setup</code><p>Crée ou adapte une structure complète.</p></article>
          <article><code>/ticket setup</code><p>Installe ou améliore Ticket Studio.</p></article>
          <article><code>/interserver code</code><p>Relie plusieurs Discord.</p></article>
          <article><code>/commandes</code><p>Affiche l’aide directement dans Discord.</p></article>
        </div>
        <div class="syn-v2-hero-actions">${internal(commands,'syn-v2-btn syn-v2-btn-primary','Explorer toutes les commandes →')}${internal(docs,'syn-v2-btn syn-v2-btn-ghost','Documentation publique →')}</div>
      </section>

      <section class="syn-v2-section syn-v2-shell syn-dashboard-future">
        <div class="syn-v2-head"><div><span class="syn-v2-kicker">MISE À JOUR FUTURE</span><h2>Dashboard Web Synapse</h2></div><p>Un Dashboard Web complet est en développement pour une future mise à jour de Synapse. Il permettra de retrouver les réglages du bot dans une interface visuelle centralisée.</p></div>
        <div class="syn-future-preview" data-future-preview>
          <div class="syn-future-preview-track" data-future-track>
            ${dashboardPreview('BUILDER','Structure & adaptation','Salons, catégories, rôles, permissions et analyse de l’existant.','builder')}
            ${dashboardPreview('TICKETS','Ticket Studio','Panels, boutons, formulaires, rôles staff, transcripts et statistiques.','tickets')}
            ${dashboardPreview('SÉCURITÉ','Modération & AutoMod','Protections, sanctions, logs, rôles sécurisés et règles automatiques.','security')}
            ${dashboardPreview('MULTI-SERVEURS','Centre de contrôle','Passez rapidement d’un serveur à l’autre depuis une seule interface.','servers')}
          </div>
          <div class="syn-future-preview-footer"><span>APERÇU DU DASHBOARD EN DÉVELOPPEMENT</span><div data-future-dots></div></div>
        </div>
      </section>

      <section class="syn-v2-section syn-v2-shell">
        <div class="syn-v2-premium">
          <div><span class="syn-v2-kicker">SYNAPSE PREMIUM</span><h2>Premium,<br>directement dans Discord.</h2><p>Le paiement et l’état Premium sont pensés pour rester dans l’écosystème Discord. Les fonctions gratuites restent utilisables sans abonnement ; Premium débloque les automatismes et protections avancées.</p><div class="syn-v2-premium-price"><strong>3,99 €</strong><span>/ mois · / serveur · sans engagement</span></div><div class="syn-v2-hero-actions">${external(premiumStore,'syn-v2-btn syn-v2-btn-primary','Passer Premium sur Discord ↗')}</div><div class="syn-premium-command-hint"><span>Ou depuis votre serveur :</span><code>/premium</code></div></div>
          <div class="syn-v2-premium-list"><span>AutoMod avancé</span><span>Anti-Raid</span><span>Backups de structure</span><span>Interserver avancé</span><span>Temp Voice</span><span>Levels & XP</span><span>Giveaways</span><span>Commandes personnalisées</span><span>Automatisations supplémentaires</span></div>
        </div>
      </section>

      <section class="syn-v2-shell syn-v2-final"><div><span class="syn-v2-kicker">PRÊT À COMMENCER ?</span><h2>Ajoutez Synapse.<br>Laissez-le comprendre votre serveur.</h2><p>Créez une nouvelle structure ou analysez votre Discord actuel, puis choisissez exactement ce que Synapse doit améliorer.</p></div><div class="syn-v2-hero-actions">${external(invite,'syn-v2-btn syn-v2-btn-primary','Ajouter Synapse ↗')}${internal(commands,'syn-v2-btn syn-v2-btn-ghost','Voir les commandes →')}${internal(docs,'syn-v2-btn syn-v2-btn-ghost','Documentation →')}</div></section>
    </main>

    <footer class="syn-v2-footer"><span>© 2026 Phoenix Inc | Development</span><span>Synapse · Discord-first · Source privée</span></footer>
  </div>`;

  document.querySelector('[data-syn-v2-menu]')?.addEventListener('click',()=>document.querySelector('[data-syn-v2-header]')?.classList.toggle('open'));

  const future = document.querySelector('[data-future-preview]');
  const track = future?.querySelector('[data-future-track]');
  const slides = track ? [...track.children] : [];
  const dots = future?.querySelector('[data-future-dots]');
  if(track && slides.length && dots){
    let index=0;
    let timer;
    slides.forEach((_,i)=>{
      const dot=document.createElement('button');
      dot.type='button';
      dot.setAttribute('aria-label',`Aperçu ${i+1}`);
      dot.addEventListener('click',()=>{index=i;render();restart();});
      dots.appendChild(dot);
    });
    const render=()=>{
      track.style.transform=`translateX(-${index*100}%)`;
      [...dots.children].forEach((dot,i)=>dot.classList.toggle('active',i===index));
    };
    const restart=()=>{
      clearInterval(timer);
      timer=setInterval(()=>{index=(index+1)%slides.length;render();},4200);
    };
    future.addEventListener('mouseenter',()=>clearInterval(timer));
    future.addEventListener('mouseleave',restart);
    render();
    restart();
  }
})();
