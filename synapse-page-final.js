(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const cfg = window.PHOENIX_CONFIG || {};
  const discord = cfg.discordUrl || 'https://discord.gg/xfWVss2KCv';
  const github = cfg.githubUrl || 'https://github.com/Phoenix-k-dev';
  const invite = cfg.synapseInviteUrl || '#';
  const commands = 'synapse-commands.html';

  const copy = {
    fr: {
      navHome:'Accueil', navScripts:'Scripts', navBots:'Bots', navCommands:'Commandes', navServices:'Web · Apps · Autres', quote:'Faire un devis',
      heroTitle:'Construisez. Analysez.', heroGradient:'Adaptez votre Discord.',
      heroLead:'Synapse peut créer une structure complète, analyser un serveur déjà existant et compléter ou remplacer uniquement ce dont vous avez besoin. Tickets, messages, règlement, communauté et Interserver se configurent directement depuis Discord.',
      freeStart:'GRATUIT POUR COMMENCER', freeStartCopy:'Le Premium ajoute les fonctions avancées directement dans Discord.', addServer:'Ajouter Synapse à votre serveur ↗', viewAll:'Voir toutes les commandes →', community:'Communauté',
      adaptTitle:'Synapse s’adapte aussi à un serveur déjà construit.',
      a1k:'ANALYSER',a1t:'Comprendre l’existant',a1c:'Salons, catégories, rôles, permissions, règlement, bienvenue, tickets et logs sont détectés sans rien modifier.',
      a2k:'PROPOSER',a2t:'Choisir quoi améliorer',a2c:'Créer un serveur complet, compléter la structure ou remplacer seulement un module précis.',
      a3k:'APPLIQUER',a3t:'Modifier proprement',a3c:'Synapse demande confirmation avant toute suppression et évite de créer des doublons inutiles.',
      analyseHint:'→ Synapse inspecte et propose un plan d’intégration.',
      coreK:'LE CŒUR DE SYNAPSE', coreT:'Un Builder qui ne travaille pas uniquement avec ses templates.', coreC:'Les templates Synapse sont disponibles pour partir de zéro, mais le bot sait aussi intervenir sur une structure existante sans reconstruire tout le Discord.',
      m1:'Analyse le serveur, détecte les éléments existants puis crée, complète ou remplace les modules demandés.',
      m2:'Analyse de l’ancien système, installation propre, remplacement confirmé, ouverture et fermeture directement dans Discord.',
      m3:'Annonces, règlement, messages interactifs et futures actions via boutons ou sélecteurs.',
      m4:'Bienvenue, règlement, avis, réputation et autres modules communautaires réunis dans un seul bot.',
      m5:'Codes de synchronisation, alias et salons reliés entre plusieurs serveurs Discord.',
      m6t:'Commandes Discord',m6:'Chaque fonction reste accessible clairement via slash commands, formulaires, boutons et menus natifs Discord.',
      controlK:'PILOTAGE DANS DISCORD',controlT:'Pilotez Synapse directement dans Discord.',controlC:'Commandes slash, boutons, sélecteurs et formulaires natifs permettent de configurer rapidement Synapse sans quitter votre serveur.',
      c1:'Analyse sans modifier.',c2:'Remplace un ancien système après confirmation.',c3:'Ouvre un formulaire de création.',c4:'Relie plusieurs Discord.',c5:'Affiche l’aide directement dans Discord.', explore:'Explorer toutes les commandes →',
      futureK:'MISE À JOUR FUTURE',futureT:'Dashboard Web Synapse',futureC:'Un Dashboard Web complet est en développement pour une future mise à jour de Synapse. Il permettra de retrouver les réglages du bot dans une interface visuelle centralisée.',
      overview:'Vue d’ensemble',configuration:'Configuration',modules:'Modules',automations:'Automatisations',logs:'Logs',connected:'CONNECTED',
      builderT:'Structure & adaptation',builderC:'Salons, catégories, rôles, permissions et analyse de l’existant.',
      ticketsT:'Ticket Studio',ticketsC:'Panels, boutons, formulaires, rôles staff, transcripts et statistiques.',
      securityK:'SÉCURITÉ',securityT:'Modération & AutoMod',securityC:'Protections, sanctions, logs, rôles sécurisés et règles automatiques.',
      serversK:'MULTI-SERVEURS',serversT:'Centre de contrôle',serversC:'Passez rapidement d’un serveur à l’autre depuis une seule interface.',futureFoot:'APERÇU DU DASHBOARD EN DÉVELOPPEMENT',
      finalK:'PRÊT À COMMENCER ?',finalT:'Ajoutez Synapse. Laissez-le comprendre votre serveur.',finalC:'Créez une nouvelle structure ou analysez votre Discord actuel, puis choisissez exactement ce que Synapse doit améliorer.',finalAdd:'Ajouter Synapse ↗',finalCommands:'Voir les commandes →',
      footerCopy:'Scripts FiveM, bots Discord, web, applications et développement sur mesure.',footerNote:'Conçu pour évoluer avec les projets.'
    },
    en: {
      navHome:'Home', navScripts:'Scripts', navBots:'Bots', navCommands:'Commands', navServices:'Web · Apps · More', quote:'Get a quote',
      heroTitle:'Build. Analyze.', heroGradient:'Adapt your Discord.',
      heroLead:'Synapse can create a complete structure, analyze an existing server and add or replace only what you actually need. Tickets, messages, rules, community tools and Interserver are configured directly from Discord.',
      freeStart:'FREE TO GET STARTED', freeStartCopy:'Premium adds advanced features directly inside Discord.', addServer:'Add Synapse to your server ↗', viewAll:'View all commands →', community:'Community',
      adaptTitle:'Synapse also adapts to an already-built server.',
      a1k:'ANALYZE',a1t:'Understand what exists',a1c:'Channels, categories, roles, permissions, rules, welcome setup, tickets and logs are detected without changing anything.',
      a2k:'PROPOSE',a2t:'Choose what to improve',a2c:'Build a complete server, extend the existing structure or replace only one specific module.',
      a3k:'APPLY',a3t:'Change things safely',a3c:'Synapse asks for confirmation before destructive actions and avoids creating unnecessary duplicates.',
      analyseHint:'→ Synapse inspects the server and proposes an integration plan.',
      coreK:'THE CORE OF SYNAPSE', coreT:'A Builder that does more than templates.', coreC:'Synapse templates are available when starting from scratch, but the bot can also work with an existing structure without rebuilding the whole Discord server.',
      m1:'Analyzes the server, detects existing resources, then creates, completes or replaces only the requested modules.',
      m2:'Analyzes an existing ticket system, installs cleanly, replaces only after confirmation, and handles opening and closing inside Discord.',
      m3:'Announcements, rules, interactive messages and actions through buttons or selectors.',
      m4:'Welcome, rules, reviews, reputation and other community modules brought together in one bot.',
      m5:'Synchronization codes, aliases and linked channels across several Discord servers.',
      m6t:'Discord commands',m6:'Every feature remains clearly accessible through slash commands, forms, buttons and native Discord menus.',
      controlK:'CONTROL INSIDE DISCORD',controlT:'Manage Synapse directly in Discord.',controlC:'Slash commands, buttons, selectors and native forms let you configure Synapse quickly without leaving your server.',
      c1:'Analyze without changing anything.',c2:'Replace an existing system after confirmation.',c3:'Open a creation form.',c4:'Connect multiple Discord servers.',c5:'Display help directly in Discord.', explore:'Explore all commands →',
      futureK:'FUTURE UPDATE',futureT:'Synapse Web Dashboard',futureC:'A complete web dashboard is being developed for a future Synapse update. It will bring the bot settings into one centralized visual interface.',
      overview:'Overview',configuration:'Configuration',modules:'Modules',automations:'Automations',logs:'Logs',connected:'CONNECTED',
      builderT:'Structure & adaptation',builderC:'Channels, categories, roles, permissions and analysis of the existing setup.',
      ticketsT:'Ticket Studio',ticketsC:'Panels, buttons, forms, staff roles, transcripts and statistics.',
      securityK:'SECURITY',securityT:'Moderation & AutoMod',securityC:'Protection, sanctions, logs, secured roles and automatic rules.',
      serversK:'MULTI-SERVER',serversT:'Control center',serversC:'Quickly switch from one server to another from a single interface.',futureFoot:'DEVELOPMENT DASHBOARD PREVIEW',
      finalK:'READY TO START?',finalT:'Add Synapse. Let it understand your server.',finalC:'Create a new structure or analyze your current Discord, then choose exactly what Synapse should improve.',finalAdd:'Add Synapse ↗',finalCommands:'View commands →',
      footerCopy:'FiveM scripts, Discord bots, web, applications and custom development.',footerNote:'Built to evolve with every project.'
    }
  };

  let lang = localStorage.getItem('phoenix-lang') === 'en' ? 'en' : 'fr';
  const set = (el, text) => { if (el && typeof text === 'string') el.textContent = text; };
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  function buildHeader() {
    const old = $('.syn-v2-header, .v2-header');
    if (!old) return;
    const header = document.createElement('header');
    header.className = 'v2-header';
    header.dataset.siteHeader = '';
    header.innerHTML = `
      <a class="v2-brand" href="index.html" aria-label="Phoenix Inc | Development"><img src="./assets/logo-phoenix-ph.png" alt=""><span><b>Phoenix Inc |</b><small>Development</small></span></a>
      <nav class="v2-nav" aria-label="Navigation principale">
        <a href="index.html" data-shell="home"></a><a href="scripts.html" data-shell="scripts"></a><a href="bots.html" class="active" data-shell="bots"></a><a href="synapse-commands.html" data-shell="commands"></a><a href="services.html" data-shell="services"></a>
      </nav>
      <div class="v2-header-actions">
        <a class="v2-icon-link" href="${discord}" target="_blank" rel="noopener">Discord ↗</a>
        <button class="v2-lang" type="button" data-lang-toggle-v2 aria-label="Changer de langue"><span>FR</span><i></i><span>EN</span></button>
        <a class="v2-btn v2-btn-small v2-btn-primary" href="index.html#quote"><span data-shell="quote"></span> ↗</a>
        <button class="v2-menu" type="button" data-menu-toggle aria-label="Menu"><span></span><span></span></button>
      </div>`;
    old.replaceWith(header);
    $('[data-lang-toggle-v2]', header)?.addEventListener('click', switchLanguage);
    $('[data-menu-toggle]', header)?.addEventListener('click', () => header.classList.toggle('open'));
  }

  function buildFooter() {
    const old = $('.syn-v2-footer, .v2-footer');
    if (!old) return;
    const footer = document.createElement('footer');
    footer.className = 'v2-footer';
    footer.innerHTML = `
      <div class="v2-footer-main">
        <a class="v2-brand" href="index.html"><img src="./assets/logo-phoenix-ph.png" alt=""><span><b>Phoenix Inc |</b><small>Development</small></span></a>
        <p data-shell="footerCopy"></p>
        <div class="v2-footer-links"><a href="scripts.html" data-shell="scripts"></a><a href="bots.html" data-shell="bots"></a><a href="services.html" data-shell="services"></a><a href="${discord}" target="_blank" rel="noopener">Discord</a><a href="${github}" target="_blank" rel="noopener">GitHub</a></div>
      </div>
      <div class="v2-footer-bottom"><span>© 2026 Phoenix Inc | Development</span><span data-shell="footerNote"></span></div>`;
    old.replaceWith(footer);
  }

  function translateShell(t) {
    set($('[data-shell="home"]'), t.navHome); set($('[data-shell="scripts"]'), t.navScripts); set($('[data-shell="bots"]'), t.navBots);
    set($('[data-shell="commands"]'), t.navCommands); set($('[data-shell="services"]'), t.navServices); set($('[data-shell="quote"]'), t.quote);
    $$('[data-shell="scripts"]').forEach(el=>set(el,t.navScripts)); $$('[data-shell="bots"]').forEach(el=>set(el,t.navBots)); $$('[data-shell="services"]').forEach(el=>set(el,t.navServices));
    set($('[data-shell="footerCopy"]'), t.footerCopy); set($('[data-shell="footerNote"]'), t.footerNote);
    $('[data-lang-toggle-v2]')?.classList.toggle('en', lang === 'en');
  }

  function translatePage(t) {
    const hero = $('.syn-v2-copy');
    if (hero) {
      const h1 = $('h1', hero); if (h1) h1.innerHTML = `${t.heroTitle}<br><span class="syn-v2-gradient">${t.heroGradient}</span>`;
      set($(':scope > p', hero), t.heroLead);
      const pills = $$('.syn-v2-pill', hero); if (pills[3]) set(pills[3], t.community);
      set($('.syn-v2-free-entry b', hero), t.freeStart); set($('.syn-v2-free-entry span', hero), t.freeStartCopy);
      const buttons = $$('.syn-v2-hero-actions a', hero); if(buttons[0]) set(buttons[0],t.addServer); if(buttons[1]) set(buttons[1],t.viewAll);
    }

    const adaptive = $('.syn-v2-adaptive-hero');
    if (adaptive) {
      set($('.syn-v2-flow-title strong',adaptive),t.adaptTitle);
      const cards = $$('.syn-adapt-grid article',adaptive);
      [[t.a1k,t.a1t,t.a1c],[t.a2k,t.a2t,t.a2c],[t.a3k,t.a3t,t.a3c]].forEach((v,i)=>{const c=cards[i];if(!c)return;set($('small',c),v[0]);set($('h3',c),v[1]);set($('p',c),v[2]);});
      set($('.syn-adapt-command span',adaptive),t.analyseHint);
    }

    const sections = $$('.syn-v2-section');
    const core = sections.find(s => $('.syn-v2-modules',s));
    if(core){set($('.syn-v2-kicker',core),t.coreK);set($('.syn-v2-head h2',core),t.coreT);set($('.syn-v2-head>p',core),t.coreC);const mods=$$('.syn-v2-module',core);[t.m1,t.m2,t.m3,t.m4,t.m5,t.m6].forEach((x,i)=>mods[i]&&set($('p',mods[i]),x));if(mods[5])set($('h3',mods[5]),t.m6t);}

    const control = $('.syn-command-showcase');
    if(control){set($('.syn-v2-kicker',control),t.controlK);set($('.syn-v2-head h2',control),t.controlT);set($('.syn-v2-head>p',control),t.controlC);const ps=$$('.syn-command-preview p',control);[t.c1,t.c2,t.c3,t.c4,t.c5].forEach((x,i)=>ps[i]&&set(ps[i],x));set($('.syn-v2-hero-actions a',control),t.explore);}

    const future = $('.syn-dashboard-future');
    if(future){set($('.syn-v2-kicker',future),t.futureK);set($('.syn-v2-head h2',future),t.futureT);set($('.syn-v2-head>p',future),t.futureC);
      const slides = $$('.syn-future-preview-slide',future);
      const data=[['BUILDER',t.builderT,t.builderC],['TICKETS',t.ticketsT,t.ticketsC],[t.securityK,t.securityT,t.securityC],[t.serversK,t.serversT,t.serversC]];
      slides.forEach((slide,i)=>{const d=data[i];if(!d)return;const nav=$('.syn-shot-nav',slide);if(nav){const sm=$(':scope > small',nav);set(sm,d[0]);const spans=$$(':scope > span',nav);[t.overview,t.configuration,t.modules,t.automations,t.logs].forEach((x,j)=>spans[j]&&set(spans[j],x));}set($('.syn-shot-main header small',slide),d[0]);set($('.syn-shot-main header strong',slide),d[1]);set($('.syn-shot-main header em',slide),t.connected);set($('.syn-future-preview-copy small',slide),d[0]);set($('.syn-future-preview-copy h3',slide),d[1]);set($('.syn-future-preview-copy p',slide),d[2]);});
      set($('.syn-future-preview-footer>span',future),t.futureFoot);
    }

    const final = $('.syn-v2-final');
    if(final){set($('.syn-v2-kicker',final),t.finalK);const h2=$('h2',final);if(h2)h2.innerHTML=t.finalT.replace('. ','.<br>');set($('p',final),t.finalC);const btns=$$('.syn-v2-hero-actions a',final);if(btns[0])set(btns[0],t.finalAdd);if(btns[1])set(btns[1],t.finalCommands);}
  }

  function applyLanguage(emit=true){
    document.documentElement.lang = lang;
    localStorage.setItem('phoenix-lang',lang);
    const t=copy[lang];
    translateShell(t); translatePage(t);
    if(emit) window.dispatchEvent(new CustomEvent('phoenix:langchange',{detail:{lang}}));
  }

  function switchLanguage(){ lang = lang === 'fr' ? 'en' : 'fr'; applyLanguage(true); }

  function init(){
    buildHeader(); buildFooter(); applyLanguage(false);
    // Let theme-toggle and legal-links hydrate the newly shared site shell.
    requestAnimationFrame(()=>window.dispatchEvent(new CustomEvent('phoenix:langchange',{detail:{lang}})));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();