(() => {
  const config = window.PHOENIX_CONFIG || {};
  const products = Array.isArray(window.PHOENIX_PRODUCTS) ? window.PHOENIX_PRODUCTS : [];
  const translations = {
    fr: {
      "nav.home":"Accueil","nav.scripts":"Scripts","nav.bots":"Bots","nav.services":"Web · Apps · Autres","nav.quote":"Faire un devis",
      "footer.copy":"Scripts FiveM, bots Discord, web, applications et développement sur mesure.","footer.note":"Conçu pour évoluer avec les projets.",
      "home.eyebrow":"Développement indépendant • France","home.line1":"Des outils qui","home.line2":"servent vraiment.","home.lead":"Scripts FiveM, bots Discord, sites web, applications et développement sur mesure. Une vitrine claire pour découvrir les produits, puis des pages dédiées pour aller droit à l’essentiel.","home.ctaScripts":"Explorer les scripts","home.ctaQuote":"Parler d’un projet",
      "home.showcaseKicker":"VITRINE / EN CE MOMENT","home.showcaseTitle":"Un aperçu. Pas tout le catalogue.","home.showcaseCopy":"Le carrousel mélange produits, bot et prestations. Pour chercher précisément, les catégories dédiées prennent le relais.",
      "home.garage":"Garages, places de parking, véhicules persistants et marché d’occasion entre joueurs dans un système pensé pour rester lisible et agréable à utiliser.","home.banking":"Banque complète avec comptes, cartes, virements, factures, épargne et outils financiers, réunis dans une interface cohérente.","home.synapse":"Builder de serveur, tickets, modération, sécurité, communauté et Interserver dans une même plateforme Discord.","home.viewProduct":"Voir le produit","home.discoverBot":"Découvrir le bot","home.serviceTitle":"Web, apps & autres","home.serviceCopy":"Site vitrine, dashboard, application ou idée atypique : le projet part du besoin, pas d’un template imposé.","home.servicesCta":"Voir les prestations",
      "home.categoriesKicker":"CATÉGORIES","home.categoriesTitle":"Chaque chose à sa place.","home.categoriesCopy":"Plus besoin de descendre toute la page pour trouver ce que tu cherches. Choisis une famille, puis filtre dedans.","home.catScripts":"Scripts","home.catScriptsCopy":"Gameplay, économie, administration, utilitaires.","home.catBots":"Bots","home.catBotsCopy":"Synapse et les futurs outils Discord.","home.catWebCopy":"Vitrines, dashboards et expériences web.","home.catAppsCopy":"Desktop, mobile et outils métier.","home.catCustom":"Autres","home.catCustomCopy":"Les projets qui ne rentrent dans aucune case.",
      "home.networkKicker":"RÉSEAUX & BOUTIQUES","home.networkTitle":"Retrouver Phoenix ailleurs.","home.networkCopy":"Support, code, boutique et soutien réunis dans un seul endroit.","home.tebex":"Tebex — bientôt","home.tipeee":"Tipeee — lien à ajouter",
      "home.faqTitle":"Avant de demander.","home.faqCopy":"Les réponses rapides restent ici. Pour un problème précis, Discord prend le relais.",
      "faq.q1":"Les scripts sont-ils standalone ?","faq.a1":"La compatibilité est indiquée sur chaque fiche. Phoenix Inc. privilégie des systèmes autonomes ou clairement documentés.","faq.q2":"Comment obtenir du support ?","faq.a2":"Le Discord centralise le support, les questions avant achat et le suivi des projets.","faq.q3":"Vous faites aussi du sur-mesure ?","faq.a3":"Oui. FiveM, Discord, web, applications ou besoin atypique : le devis sert justement à cadrer le projet.","faq.q4":"Où acheter les scripts ?","faq.a4":"Les produits commerciaux seront reliés à Tebex dès que leurs packages seront publiés.",
      "quote.kicker":"DEVIS / PROJET","quote.title":"Une idée ? On la cadre.","quote.copy":"Décris le besoin, le type de projet et ton budget indicatif. Le bouton prépare un e-mail propre avec toutes les informations.","quote.name":"Nom / pseudo","quote.email":"E-mail","quote.type":"Type de projet","quote.budget":"Budget indicatif","quote.message":"Le besoin","quote.note":"Aucune donnée n’est stockée ici : le formulaire prépare simplement ton e-mail.","quote.send":"Préparer le devis",
      "scripts.title1":"Trouve le script.","scripts.title2":"Pas l’aiguille.","scripts.lead":"Recherche, catégorie, tags et tri sont réunis ici. La page est alimentée par une seule liste de produits pour que les prochains scripts s’ajoutent sans refaire tout le site.","scripts.sortFeatured":"Mis en avant","scripts.sortPopular":"Popularité","scripts.sortRecent":"Plus récents","scripts.sortPriceAsc":"Prix croissant","scripts.sortPriceDesc":"Prix décroissant","scripts.sortName":"Nom A → Z","scripts.category":"CATÉGORIE","scripts.reset":"RÉINITIALISER LES FILTRES","scripts.buy":"Voir sur Tebex","scripts.ask":"Poser une question",
      "bots.title1":"Des bots qui font","bots.title2":"plus qu’une commande.","bots.lead":"Les outils Discord Phoenix sont rangés ici. Synapse ouvre la catégorie avec une plateforme pensée pour construire puis gérer une communauté depuis un même écosystème.","bots.synapseCopy":"Synapse est une plateforme Discord tout-en-un. Son Builder permet de créer rapidement la structure d’un serveur à partir de templates, catégories, salons, rôles, permissions et réglages. Une fois la base prête, les tickets, la modération, la sécurité, la communauté et Interserver se gèrent depuis le même ensemble d’outils.","bots.details":"Voir la fiche complète","bots.invite":"Inviter Synapse","bots.futureKicker":"LA SUITE","bots.futureTitle":"La catégorie est prête à grandir.","bots.futureCopy":"Les futurs bots pourront être ajoutés ici sous forme de cartes, sans alourdir la page d’accueil.","bots.stat1":"Création de serveur","bots.stat2":"Modules réunis","bots.stat3":"Questions & aide",
      "services.title1":"Quand le produit","services.title2":"n’existe pas encore.","services.lead":"Site web, application ou besoin atypique : chaque prestation a sa catégorie, mais la méthode reste la même — comprendre le besoin, simplifier, construire, livrer.","services.webTitle":"Sites web","services.webCopy":"Sites vitrines, pages produit, dashboards et interfaces web responsive. Le travail porte autant sur la lisibilité et le parcours que sur l’apparence.","services.appsTitle":"Applications","services.appsCopy":"Applications desktop, mobile ou outils internes quand un simple site ne suffit pas. L’interface est pensée autour de l’usage réel.","services.customTitle":"Autres / sur mesure","services.customCopy":"Automatisation, outil métier, intégration particulière ou idée qui ne rentre dans aucune catégorie : on part du problème à résoudre.","services.processKicker":"MÉTHODE","services.processTitle":"Du brief à quelque chose d’utilisable.","services.processCopy":"Pas besoin d’arriver avec un cahier des charges de 90 pages. Le devis sert aussi à clarifier ce qui doit être construit.","services.p1t":"Cadrer","services.p1c":"Objectif, utilisateurs, fonctions importantes et contraintes.","services.p2t":"Concevoir","services.p2c":"Structure, parcours, interface et choix techniques.","services.p3t":"Développer","services.p3c":"Construction par étapes avec une base claire et maintenable.","services.p4t":"Livrer","services.p4c":"Tests, corrections, livraison et accompagnement selon le projet.","services.start":"Démarrer un devis"
    },
    en: {
      "nav.home":"Home","nav.scripts":"Scripts","nav.bots":"Bots","nav.services":"Web · Apps · Other","nav.quote":"Request a quote",
      "footer.copy":"FiveM scripts, Discord bots, web, applications and custom development.","footer.note":"Built to evolve with the projects.",
      "home.eyebrow":"Independent development • France","home.line1":"Tools that","home.line2":"actually help.","home.lead":"FiveM scripts, Discord bots, websites, applications and custom development. A clear showcase to discover the work, then dedicated pages to get straight to the point.","home.ctaScripts":"Explore scripts","home.ctaQuote":"Discuss a project",
      "home.showcaseKicker":"SHOWCASE / RIGHT NOW","home.showcaseTitle":"A preview. Not the whole catalog.","home.showcaseCopy":"The carousel mixes products, bot and services. Dedicated categories take over when you want to search precisely.",
      "home.garage":"Garages, parking spaces, persistent vehicles and a player-to-player used vehicle marketplace in a system designed to stay clear and pleasant to use.","home.banking":"Complete banking with accounts, cards, transfers, invoices, savings and financial tools in one consistent interface.","home.synapse":"Server Builder, tickets, moderation, security, community and Interserver inside one Discord platform.","home.viewProduct":"View product","home.discoverBot":"Discover the bot","home.serviceTitle":"Web, apps & more","home.serviceCopy":"Showcase site, dashboard, application or unusual idea: the project starts from the need, not from a forced template.","home.servicesCta":"View services",
      "home.categoriesKicker":"CATEGORIES","home.categoriesTitle":"Everything in its place.","home.categoriesCopy":"No more scrolling through the whole site to find what you need. Pick a family, then filter inside it.","home.catScripts":"Scripts","home.catScriptsCopy":"Gameplay, economy, administration, utilities.","home.catBots":"Bots","home.catBotsCopy":"Synapse and future Discord tools.","home.catWebCopy":"Showcase sites, dashboards and web experiences.","home.catAppsCopy":"Desktop, mobile and business tools.","home.catCustom":"Other","home.catCustomCopy":"Projects that do not fit in a standard box.",
      "home.networkKicker":"NETWORK & STORES","home.networkTitle":"Find Phoenix elsewhere.","home.networkCopy":"Support, code, store and creator support in one place.","home.tebex":"Tebex — coming soon","home.tipeee":"Tipeee — add link",
      "home.faqTitle":"Before asking.","home.faqCopy":"Quick answers stay here. For a specific issue, Discord takes over.",
      "faq.q1":"Are the scripts standalone?","faq.a1":"Compatibility is stated on each product page. Phoenix Inc. favors autonomous systems or clearly documented integrations.","faq.q2":"How do I get support?","faq.a2":"Discord centralizes support, pre-purchase questions and project follow-up.","faq.q3":"Do you also build custom projects?","faq.a3":"Yes. FiveM, Discord, web, applications or an unusual need: the quote process is there to frame the project.","faq.q4":"Where can I buy scripts?","faq.a4":"Commercial products will be linked to Tebex as soon as their packages are published.",
      "quote.kicker":"QUOTE / PROJECT","quote.title":"Got an idea? Let’s frame it.","quote.copy":"Describe the need, project type and indicative budget. The button prepares a clean email with all the information.","quote.name":"Name / handle","quote.email":"Email","quote.type":"Project type","quote.budget":"Indicative budget","quote.message":"The need","quote.note":"Nothing is stored here: the form simply prepares your email.","quote.send":"Prepare quote",
      "scripts.title1":"Find the script.","scripts.title2":"Skip the haystack.","scripts.lead":"Search, category, tags and sorting all live here. The page is powered by a single product list so future scripts can be added without rebuilding the site.","scripts.sortFeatured":"Featured","scripts.sortPopular":"Popularity","scripts.sortRecent":"Newest","scripts.sortPriceAsc":"Price low to high","scripts.sortPriceDesc":"Price high to low","scripts.sortName":"Name A → Z","scripts.category":"CATEGORY","scripts.reset":"RESET FILTERS","scripts.buy":"View on Tebex","scripts.ask":"Ask a question",
      "bots.title1":"Bots that do","bots.title2":"more than commands.","bots.lead":"Phoenix Discord tools live here. Synapse opens the category with a platform designed to build and then manage a community inside one ecosystem.","bots.synapseCopy":"Synapse is an all-in-one Discord platform. Its Builder quickly creates a server structure from templates, categories, channels, roles, permissions and settings. Once the foundation is ready, tickets, moderation, security, community and Interserver are managed from the same toolset.","bots.details":"View full page","bots.invite":"Invite Synapse","bots.futureKicker":"WHAT’S NEXT","bots.futureTitle":"The category is ready to grow.","bots.futureCopy":"Future bots can be added here as cards without making the homepage heavier.","bots.stat1":"Server creation","bots.stat2":"Unified modules","bots.stat3":"Questions & help",
      "services.title1":"When the product","services.title2":"doesn’t exist yet.","services.lead":"Website, application or unusual need: each service gets its category, but the method stays the same — understand, simplify, build, deliver.","services.webTitle":"Websites","services.webCopy":"Showcase sites, product pages, dashboards and responsive web interfaces. The work focuses on clarity and flow as much as appearance.","services.appsTitle":"Applications","services.appsCopy":"Desktop, mobile or internal tools when a simple website is not enough. The interface is designed around real usage.","services.customTitle":"Other / custom","services.customCopy":"Automation, business tool, special integration or an idea that does not fit any category: we start from the problem to solve.","services.processKicker":"METHOD","services.processTitle":"From brief to something usable.","services.processCopy":"You do not need a 90-page specification. The quote process also helps clarify what actually needs to be built.","services.p1t":"Frame","services.p1c":"Goal, users, important functions and constraints.","services.p2t":"Design","services.p2c":"Structure, flow, interface and technical choices.","services.p3t":"Build","services.p3c":"Step-by-step development with a clear, maintainable base.","services.p4t":"Deliver","services.p4c":"Testing, fixes, delivery and follow-up depending on the project.","services.start":"Start a quote"
    }
  };

  const getLang = () => localStorage.getItem("phoenix-lang") === "en" ? "en" : "fr";
  let lang = getLang();

  const applyTranslations = () => {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-v2-i18n]").forEach(el => {
      const value = translations[lang]?.[el.dataset.v2I18n];
      if (value != null) el.textContent = value;
    });
    document.querySelector("[data-lang-toggle-v2]")?.classList.toggle("en", lang === "en");
    const search = document.querySelector("[data-product-search]");
    if (search) search.placeholder = lang === "fr" ? "Rechercher un script, une fonction, un tag…" : "Search a script, feature or tag…";
    initFilters();
    renderProducts();
    hydrateConfigLinks();
  };

  const hydrateConfigLinks = () => {
    document.querySelectorAll("[data-config-link]").forEach(el => {
      const key = el.dataset.configLink;
      const url = config[key];
      if (url) {
        el.href = url;
        el.classList.remove("disabled");
        el.removeAttribute("aria-disabled");
      } else {
        el.removeAttribute("href");
        el.classList.add("disabled");
        el.setAttribute("aria-disabled", "true");
        const label = el.querySelector("b");
        if (key === "tipeeeUrl" && label) label.textContent = lang === "fr" ? "Tipeee — lien à ajouter" : "Tipeee — add link";
        if (key === "tebexUrl" && label) label.textContent = lang === "fr" ? "Tebex — bientôt" : "Tebex — coming soon";
      }
    });
  };

  document.querySelector("[data-lang-toggle-v2]")?.addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    localStorage.setItem("phoenix-lang", lang);
    applyTranslations();
  });

  const header = document.querySelector("[data-site-header]");
  document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => header?.classList.toggle("open"));

  const initShowcase = () => {
    const root = document.querySelector("[data-showcase]");
    if (!root) return;
    const track = root.querySelector(".v2-showcase-track");
    const slides = [...track.children];
    const dotsRoot = root.querySelector("[data-showcase-dots]");
    let index = 0;
    let timer;
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Slide ${i + 1}`);
      b.addEventListener("click", () => go(i));
      dotsRoot.appendChild(b);
    });
    const dots = [...dotsRoot.children];
    const go = i => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, n) => d.classList.toggle("active", n === index));
    };
    const start = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 6500); };
    root.querySelector("[data-showcase-prev]")?.addEventListener("click", () => { go(index - 1); start(); });
    root.querySelector("[data-showcase-next]")?.addEventListener("click", () => { go(index + 1); start(); });
    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", start);
    go(0); start();
  };

  let activeCategory = "all";
  let activeTag = "all";

  const formatPrice = product => {
    if (product.price === 0) return lang === "fr" ? "Gratuit" : "Free";
    if (typeof product.price !== "number") return lang === "fr" ? "Prix à définir" : "Price TBD";
    return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { style:"currency", currency:"EUR" }).format(product.price);
  };
  const categoryLabel = category => lang === "en" && category === "Économie" ? "Economy" : category;
  const statusLabel = status => status === "completed" ? (lang === "fr" ? "TERMINÉ" : "COMPLETED") : (lang === "fr" ? "À VENIR" : "COMING SOON");

  const initFilters = () => {
    const categoryRoot = document.querySelector("[data-category-filters]");
    const tagRoot = document.querySelector("[data-tag-filters]");
    if (!categoryRoot || !tagRoot) return;
    const categories = [...new Set(products.map(p => p.category))];
    const tags = [...new Set(products.flatMap(p => p.tags))].sort((a,b) => a.localeCompare(b));
    const makeChip = (label, value, kind) => {
      const b = document.createElement("button");
      b.className = "v2-chip";
      b.type = "button";
      b.textContent = label;
      b.dataset.value = value;
      b.addEventListener("click", () => {
        if (kind === "category") activeCategory = value; else activeTag = value;
        syncChips(); renderProducts();
      });
      return b;
    };
    categoryRoot.replaceChildren(makeChip(lang === "fr" ? "Tout" : "All", "all", "category"), ...categories.map(c => makeChip(categoryLabel(c), c, "category")));
    tagRoot.replaceChildren(makeChip(lang === "fr" ? "Tous" : "All", "all", "tag"), ...tags.map(t => makeChip(t, t, "tag")));
    syncChips();
  };
  const syncChips = () => {
    document.querySelectorAll("[data-category-filters] .v2-chip").forEach(b => b.classList.toggle("active", b.dataset.value === activeCategory));
    document.querySelectorAll("[data-tag-filters] .v2-chip").forEach(b => b.classList.toggle("active", b.dataset.value === activeTag));
  };

  const renderProducts = () => {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;
    const query = (document.querySelector("[data-product-search]")?.value || "").trim().toLowerCase();
    const sort = document.querySelector("[data-product-sort]")?.value || "featured";
    let list = products.filter(p => {
      const haystack = [p.name, p.category, ...(p.tags || []), p.description?.fr, p.description?.en].join(" ").toLowerCase();
      return (activeCategory === "all" || p.category === activeCategory) && (activeTag === "all" || p.tags.includes(activeTag)) && (!query || haystack.includes(query));
    });
    const nullSafePrice = p => typeof p.price === "number" ? p.price : Number.POSITIVE_INFINITY;
    list.sort((a,b) => {
      if (sort === "popular") return (b.popularity || 0) - (a.popularity || 0) || (a.featuredRank || 99) - (b.featuredRank || 99);
      if (sort === "recent") return (b.recentRank || 0) - (a.recentRank || 0);
      if (sort === "priceAsc") return nullSafePrice(a) - nullSafePrice(b);
      if (sort === "priceDesc") { const ap = typeof a.price === "number" ? a.price : -1; const bp = typeof b.price === "number" ? b.price : -1; return bp - ap; }
      if (sort === "name") return a.name.localeCompare(b.name);
      return (a.featuredRank || 99) - (b.featuredRank || 99);
    });
    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML = `<div class="v2-empty">${lang === "fr" ? "Aucun script ne correspond à ces filtres." : "No script matches these filters."}</div>`;
    } else {
      list.forEach(product => {
        const article = document.createElement("article");
        article.className = "v2-product-card";
        article.innerHTML = `<div class="v2-product-media"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="v2-product-badges"><span class="v2-badge">${categoryLabel(product.category).toUpperCase()}</span><span class="v2-badge ready">${statusLabel(product.status)}</span></div></div><div class="v2-product-body"><small class="v2-kicker">PHOENIX / FIVEM</small><h3>${product.name}</h3><p>${product.description?.[lang] || product.description?.fr || ""}</p><div class="v2-product-tags">${product.tags.map(tag => `<span class="v2-tag">${tag}</span>`).join("")}</div><div class="v2-product-footer"><div class="v2-product-price">${formatPrice(product)}<small>${lang === "fr" ? "FICHE PRODUIT" : "PRODUCT PAGE"}</small></div><button class="v2-card-button" type="button" data-open-product="${product.id}">${lang === "fr" ? "VOIR LE SCRIPT" : "VIEW SCRIPT"} →</button></div></div>`;
        grid.appendChild(article);
      });
    }
    const count = document.querySelector("[data-product-count]");
    if (count) count.textContent = `${list.length} ${list.length > 1 ? "scripts" : "script"}`;
    grid.querySelectorAll("[data-open-product]").forEach(btn => btn.addEventListener("click", () => openProduct(btn.dataset.openProduct)));
  };

  document.querySelector("[data-product-search]")?.addEventListener("input", renderProducts);
  document.querySelector("[data-product-sort]")?.addEventListener("change", renderProducts);
  document.querySelector("[data-reset-filters]")?.addEventListener("click", () => {
    activeCategory = "all"; activeTag = "all";
    const search = document.querySelector("[data-product-search]"); if (search) search.value = "";
    const sort = document.querySelector("[data-product-sort]"); if (sort) sort.value = "featured";
    initFilters(); renderProducts();
  });

  const openProduct = id => {
    const product = products.find(p => p.id === id);
    const modal = document.querySelector("[data-product-modal]");
    if (!product || !modal) return;
    modal.querySelector("[data-modal-image]").src = product.image;
    modal.querySelector("[data-modal-image]").alt = product.name;
    modal.querySelector("[data-modal-title]").textContent = product.name;
    modal.querySelector("[data-modal-kicker]").textContent = `FIVEM / ${categoryLabel(product.category).toUpperCase()}`;
    modal.querySelector("[data-modal-tags]").innerHTML = product.tags.map(t => `<span class="v2-tag">${t}</span>`).join("");
    modal.querySelector("[data-modal-description]").textContent = product.description?.[lang] || product.description?.fr || "";
    modal.querySelector("[data-modal-features]").innerHTML = (product.features?.[lang] || product.features?.fr || []).map(f => `<span>✓ ${f}</span>`).join("");
    modal.querySelector("[data-modal-price]").innerHTML = `${formatPrice(product)}<small>${lang === "fr" ? " PRIX / DISPONIBILITÉ" : " PRICE / AVAILABILITY"}</small>`;
    const buy = modal.querySelector("[data-modal-buy]");
    const url = config[product.tebexKey];
    if (url) { buy.href = url; buy.classList.remove("disabled"); buy.removeAttribute("aria-disabled"); }
    else { buy.removeAttribute("href"); buy.classList.add("disabled"); buy.setAttribute("aria-disabled","true"); buy.querySelector("span").textContent = lang === "fr" ? "Tebex bientôt" : "Tebex soon"; }
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow = "hidden";
    history.replaceState(null, "", `${location.pathname}?product=${encodeURIComponent(product.id)}`);
  };
  const closeProduct = () => {
    const modal = document.querySelector("[data-product-modal]"); if (!modal) return;
    modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow = ""; history.replaceState(null, "", location.pathname);
  };
  document.querySelectorAll("[data-modal-close]").forEach(btn => btn.addEventListener("click", closeProduct));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeProduct(); });

  const initQuote = () => {
    const form = document.querySelector("[data-quote-form]"); if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(form);
      const subject = lang === "fr" ? `Demande de devis — ${fd.get("type")}` : `Quote request — ${fd.get("type")}`;
      const body = [`Nom / Name: ${fd.get("name")}`,`Email: ${fd.get("email")}`,`Type: ${fd.get("type")}`,`Budget: ${fd.get("budget") || "-"}`,"",`${lang === "fr" ? "Besoin" : "Project"}:`,fd.get("message")].join("\n");
      location.href = `mailto:${config.contactEmail || "phoenixinc.dev@gmail.com"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  };

  initShowcase(); initFilters(); initQuote(); applyTranslations();
  const requested = new URLSearchParams(location.search).get("product");
  if (requested) setTimeout(() => openProduct(requested), 0);
})();
