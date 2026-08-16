(() => {
  if (!document.body.classList.contains('v2-command-page')) return;

  const labels={
    fr:{title:'Commandes Synapse',tip:'Astuce',tipText:'Utilisez /commandes dans Discord pour retrouver cette liste directement.',overview:'Vue d’ensemble',back:'← Toutes les catégories',help:'Besoin d’aide ?',helpText:'Utilisez /commandes dans Discord pour obtenir cette liste directement.',docs:'Voir la fiche Synapse →'},
    en:{title:'Synapse Commands',tip:'Tip',tipText:'Use /commandes in Discord to open this list directly.',overview:'Overview',back:'← All categories',help:'Need help?',helpText:'Use /commandes in Discord to get this list directly.',docs:'View Synapse →'}
  };
  const categoryCopy={
    fr:{
      builder:{title:'Builder',desc:'Créez et structurez votre serveur en quelques commandes.',example:'/builder setup',icon:'◆'},
      tickets:{title:'Tickets',desc:'Un système de tickets complet et personnalisable.',example:'/ticket setup',icon:'▣'},
      community:{title:'Communauté',desc:'Animez votre serveur et vos interactions communautaires.',example:'/annonce',icon:'●'},
      access:{title:'Permissions',desc:'Gérez les rôles et les accès Synapse simplement.',example:'/permissions voir',icon:'◆'},
      premium:{title:'Premium',desc:'Sauvegardes, AutoMod, niveaux, automatisations et plus.',example:'/premium',icon:'★'},
      interserver:{title:'Interserver',desc:'Reliez plusieurs serveurs et salons entre eux.',example:'/interserver link',icon:'∞'}
    },
    en:{
      builder:{title:'Builder',desc:'Create and structure your server in just a few commands.',example:'/builder setup',icon:'◆'},
      tickets:{title:'Tickets',desc:'A complete and customizable ticket system.',example:'/ticket setup',icon:'▣'},
      community:{title:'Community',desc:'Engage your server and community interactions.',example:'/annonce',icon:'●'},
      access:{title:'Permissions',desc:'Manage Synapse roles and access easily.',example:'/permissions voir',icon:'◆'},
      premium:{title:'Premium',desc:'Backups, AutoMod, levels, automations and more.',example:'/premium',icon:'★'},
      interserver:{title:'Interserver',desc:'Connect multiple servers and channels together.',example:'/interserver link',icon:'∞'}
    }
  };
  const lang=()=>document.documentElement.lang==='en'?'en':'fr';

  function build(){
    const hero=document.querySelector('.cmd-hero');
    const toolbar=document.querySelector('.cmd-toolbar');
    const grid=document.querySelector('.cmd-grid');
    const filters=document.querySelector('[data-command-filters]');
    if(!hero||!toolbar||!grid||!filters||document.querySelector('.cmd-control-center'))return;

    const center=document.createElement('section');center.className='cmd-control-center';
    const intro=document.createElement('aside');intro.className='cmd-control-intro';
    const nav=document.createElement('aside');nav.className='cmd-control-sidebar';nav.innerHTML='<div class="cmd-control-brand"><small>SYNAPSE</small><strong data-control-title></strong></div><div class="cmd-control-nav" data-control-nav></div><div class="cmd-control-tip"><small data-control-tip></small><p data-control-tip-text></p></div>';
    const main=document.createElement('div');main.className='cmd-control-main';
    const overview=document.createElement('section');overview.className='cmd-category-overview';overview.dataset.categoryOverview='';
    const help=document.createElement('div');help.className='cmd-control-help';help.innerHTML='<div><strong data-control-help></strong><span data-control-help-text></span></div><a href="synapse-bot.html" data-control-docs></a>';

    hero.parentNode.insertBefore(center,hero);
    center.append(intro,nav,main);
    intro.appendChild(hero);
    main.append(toolbar,overview,grid,help);
    sync();
  }

  function countFor(cat,label){
    const cards=[...document.querySelectorAll('.cmd-grid .cmd-card')];
    if(!cards.length)return '';
    return cards.filter(card=>{
      const top=card.querySelector('.cmd-card-top span')?.textContent?.trim().toLowerCase()||'';
      return top===label.toLowerCase() || top.includes(cat==='access'?'permission':cat==='community'?'commun':cat);
    }).length || '';
  }

  function renderOverview(filters){
    const overview=document.querySelector('[data-category-overview]');
    const grid=document.querySelector('.cmd-grid');
    const toolbar=document.querySelector('.cmd-toolbar');
    if(!overview||!grid||!toolbar)return;
    const allButton=filters.find(b=>b.dataset.cat==='all')||filters[0];
    const allActive=!!allButton?.classList.contains('active');
    overview.hidden=!allActive;
    grid.hidden=allActive;
    toolbar.classList.toggle('cmd-toolbar-overview',allActive);
    if(!allActive)return;

    const t=categoryCopy[lang()];
    const cats=filters.filter(b=>b.dataset.cat&&b.dataset.cat!=='all');
    overview.innerHTML=cats.map(source=>{
      const cat=source.dataset.cat;
      const c=t[cat]||{title:source.textContent,desc:'',example:'',icon:'◆'};
      const count=countFor(cat,source.textContent.trim());
      return `<button type="button" class="cmd-category-card cmd-category-${cat}" data-open-cat="${cat}"><span class="cmd-category-icon">${c.icon}</span><span class="cmd-category-count">${count||'+'}</span><strong>${c.title}</strong><p>${c.desc}</p><code>${c.example}</code></button>`;
    }).join('');
    overview.querySelectorAll('[data-open-cat]').forEach(btn=>btn.addEventListener('click',()=>{
      const source=filters.find(f=>f.dataset.cat===btn.dataset.openCat);
      source?.click();
      setTimeout(sync,0);
    }));
  }

  function sync(){
    const filters=[...document.querySelectorAll('[data-command-filters] button')];
    const nav=document.querySelector('[data-control-nav]');
    const title=document.querySelector('[data-control-title]');
    const tip=document.querySelector('[data-control-tip]');
    const tipText=document.querySelector('[data-control-tip-text]');
    const help=document.querySelector('[data-control-help]');
    const helpText=document.querySelector('[data-control-help-text]');
    const docs=document.querySelector('[data-control-docs]');
    if(!nav||!filters.length)return;
    const t=labels[lang()];
    if(title)title.textContent=t.title;if(tip)tip.textContent=t.tip;if(tipText)tipText.textContent=t.tipText;if(help)help.textContent=t.help;if(helpText)helpText.textContent=t.helpText;if(docs)docs.textContent=t.docs;
    nav.innerHTML='';
    filters.forEach(source=>{
      const btn=document.createElement('button');btn.type='button';btn.classList.toggle('active',source.classList.contains('active'));btn.dataset.navCat=source.dataset.cat||'';
      const label=document.createElement('span');label.textContent=source.textContent;
      const arrow=document.createElement('span');arrow.textContent=source.dataset.cat==='all'?'⌂':'›';
      btn.append(label,arrow);btn.addEventListener('click',()=>{source.click();setTimeout(sync,0);});nav.appendChild(btn);
    });
    renderOverview(filters);
  }

  const init=()=>{build();setTimeout(build,80);setTimeout(sync,160);setTimeout(sync,350)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.addEventListener('phoenix:langchange',()=>setTimeout(sync,0));
  window.addEventListener('storage',e=>{if(e.key==='phoenix-lang')setTimeout(sync,0)});
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-command-filters] button'))setTimeout(sync,0)});
})();