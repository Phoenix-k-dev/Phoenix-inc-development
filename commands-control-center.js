(() => {
  if (!document.body.classList.contains('v2-command-page')) return;

  const copy={
    fr:{kicker:'COMMANDES SYNAPSE',title:'Toutes <span>les commandes,</span><br>au même endroit.',lead:'Gérez votre serveur avec Synapse grâce à un ensemble de commandes puissantes et intuitives. Builder, tickets, permissions, communauté, Premium et Interserver : tout est là.',all:'Toutes',back:'← Toutes les catégories',help:'Besoin d’aide ?',helpText:'Utilisez /commandes dans Discord pour obtenir cette liste directement.',docs:'Voir la fiche Synapse →'},
    en:{kicker:'SYNAPSE COMMANDS',title:'Every <span>command,</span><br>in one place.',lead:'Manage your server with Synapse through a clear set of powerful commands. Builder, tickets, permissions, community, Premium and Interserver: everything is here.',all:'All',back:'← All categories',help:'Need help?',helpText:'Use /commandes in Discord to open this list directly.',docs:'View Synapse →'}
  };
  const categoryCopy={
    fr:{builder:['Builder','Créez et structurez votre serveur en quelques commandes.','/builder setup','◆'],tickets:['Tickets','Un système de tickets complet et personnalisable.','/ticket setup','▣'],community:['Communauté','Animez votre serveur et vos interactions communautaires.','/annonce','●'],access:['Permissions','Gérez simplement les rôles et les accès Synapse.','/permissions voir','◆'],premium:['Premium','Sauvegardes, AutoMod, niveaux, automatisations et plus.','/premium','★'],interserver:['Interserver','Reliez plusieurs serveurs et salons entre eux.','/interserver link','∞']},
    en:{builder:['Builder','Create and structure your server in just a few commands.','/builder setup','◆'],tickets:['Tickets','A complete and customizable ticket system.','/ticket setup','▣'],community:['Community','Engage your server and community interactions.','/annonce','●'],access:['Permissions','Manage Synapse roles and access easily.','/permissions voir','◆'],premium:['Premium','Backups, AutoMod, levels, automations and more.','/premium','★'],interserver:['Interserver','Connect multiple servers and channels together.','/interserver link','∞']}
  };
  const lang=()=>document.documentElement.lang==='en'?'en':'fr';

  function countCards(cat){
    return [...document.querySelectorAll('.cmd-grid .cmd-card')].filter(card=>{
      const label=(card.querySelector('.cmd-card-top span')?.textContent||'').toLowerCase();
      if(cat==='access')return label.includes('permission')||label.includes('accès')||label.includes('access');
      if(cat==='community')return label.includes('commun');
      return label.includes(cat);
    }).length;
  }

  function build(){
    const hero=document.querySelector('.cmd-hero');
    const toolbar=document.querySelector('.cmd-toolbar');
    const grid=document.querySelector('.cmd-grid');
    const filters=document.querySelector('[data-command-filters]');
    if(!hero||!toolbar||!grid||!filters||document.querySelector('.cmd-control-center'))return;

    const center=document.createElement('section');center.className='cmd-control-center';
    const intro=document.createElement('aside');intro.className='cmd-control-intro';
    intro.innerHTML='<div class="cmd-control-intro-copy"><small data-cc-kicker></small><h1 data-cc-title></h1><p data-cc-lead></p></div>';
    const nav=document.createElement('aside');nav.className='cmd-control-sidebar';nav.innerHTML='<div class="cmd-control-brand"><small>SYNAPSE</small><strong>Commandes<br>Synapse</strong></div><div class="cmd-control-nav" data-control-nav></div>';
    const main=document.createElement('div');main.className='cmd-control-main';
    const top=document.createElement('div');top.className='cmd-control-top';top.innerHTML='<button type="button" data-cc-back hidden></button>';
    const overview=document.createElement('section');overview.className='cmd-category-overview';overview.dataset.categoryOverview='';
    const help=document.createElement('div');help.className='cmd-control-help';help.innerHTML='<div><strong data-cc-help></strong><span data-cc-help-text></span></div><a href="synapse-bot.html" data-cc-docs></a>';

    hero.insertAdjacentElement('beforebegin',center);
    hero.remove();
    center.append(intro,nav,main);
    main.append(top,toolbar,overview,grid,help);

    document.querySelector('[data-command-search]')?.addEventListener('input',()=>setTimeout(sync,0));
    sync();
  }

  function filtersList(){return [...document.querySelectorAll('[data-command-filters] button')];}
  function activeFilter(filters){return filters.find(b=>b.classList.contains('active'))||filters[0];}

  function renderNav(filters){
    const nav=document.querySelector('[data-control-nav]');if(!nav)return;
    nav.innerHTML='';
    filters.forEach(source=>{
      const btn=document.createElement('button');btn.type='button';btn.className=source.classList.contains('active')?'active':'';btn.dataset.navCat=source.dataset.cat||'';
      const label=document.createElement('span');label.textContent=source.textContent;
      const mark=document.createElement('span');mark.textContent=source.dataset.cat==='all'?'⌂':'›';
      btn.append(label,mark);btn.addEventListener('click',()=>{source.click();setTimeout(sync,0)});nav.appendChild(btn);
    });
  }

  function renderOverview(filters){
    const overview=document.querySelector('[data-category-overview]');if(!overview)return;
    const t=categoryCopy[lang()];
    const cats=filters.filter(f=>f.dataset.cat&&f.dataset.cat!=='all');
    overview.innerHTML=cats.map(source=>{const cat=source.dataset.cat;const [title,desc,example,icon]=t[cat]||[source.textContent,'','', '◆'];const count=countCards(cat);return `<button type="button" class="cmd-category-card cmd-category-${cat}" data-open-cat="${cat}"><span class="cmd-category-icon">${icon}</span><span class="cmd-category-count">${count||''}</span><strong>${title}</strong><p>${desc}</p><code>${example}</code></button>`}).join('');
    overview.querySelectorAll('[data-open-cat]').forEach(btn=>btn.addEventListener('click',()=>{filters.find(f=>f.dataset.cat===btn.dataset.openCat)?.click();setTimeout(sync,0)}));
  }

  function sync(){
    const filters=filtersList();if(!filters.length)return;
    const active=activeFilter(filters);const isAll=(active.dataset.cat||'all')==='all';
    const search=document.querySelector('[data-command-search]');const hasSearch=!!search?.value.trim();
    const overview=document.querySelector('[data-category-overview]');const grid=document.querySelector('.cmd-grid');const back=document.querySelector('[data-cc-back]');
    const t=copy[lang()];

    const set=(sel,val,html=false)=>{const el=document.querySelector(sel);if(el)html?el.innerHTML=val:el.textContent=val};
    set('[data-cc-kicker]',t.kicker);set('[data-cc-title]',t.title,true);set('[data-cc-lead]',t.lead);set('[data-cc-help]',t.help);set('[data-cc-help-text]',t.helpText);set('[data-cc-docs]',t.docs);
    if(back){back.textContent=t.back;back.hidden=isAll&&!hasSearch;back.onclick=()=>{filters.find(f=>f.dataset.cat==='all')?.click();if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}setTimeout(sync,0)}}

    renderNav(filters);renderOverview(filters);
    const showOverview=isAll&&!hasSearch;
    if(overview){overview.hidden=!showOverview;overview.style.display=showOverview?'grid':'none'}
    if(grid){grid.hidden=showOverview;grid.style.display=showOverview?'none':'grid'}
    document.querySelector('.cmd-control-center')?.classList.toggle('showing-overview',showOverview);
  }

  const init=()=>{build();setTimeout(sync,80);setTimeout(sync,240)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.addEventListener('phoenix:langchange',()=>setTimeout(sync,0));
  window.addEventListener('storage',e=>{if(e.key==='phoenix-lang')setTimeout(sync,0)});
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-command-filters] button'))setTimeout(sync,0)});
})();