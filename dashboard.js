(() => {
  const cfg = window.PHOENIX_CONFIG || {};
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const endpoints = {
    login: cfg.synapseLoginUrl || '/auth/discord',
    me: cfg.synapseMeUrl || '/api/me',
    guilds: cfg.synapseGuildsUrl || '/api/guilds',
    guild: id => `/api/guilds/${encodeURIComponent(id)}`,
    builder: id => `/api/guilds/${encodeURIComponent(id)}/builder`,
    structure: id => `/api/guilds/${encodeURIComponent(id)}/structure`,
    tickets: id => `/api/guilds/${encodeURIComponent(id)}/tickets`,
    moderation: id => `/api/guilds/${encodeURIComponent(id)}/moderation`,
    community: id => `/api/guilds/${encodeURIComponent(id)}/community`,
    billing: id => `/api/guilds/${encodeURIComponent(id)}/billing`,
    billingPortal: id => `/api/guilds/${encodeURIComponent(id)}/billing/portal`
  };

  let session = null;
  let guilds = [];
  let guild = null;
  let plan = 'free';

  const safeJson = async response => {
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch { return null; }
  };

  const request = async (url, options={}) => {
    const response = await fetch(url, {
      credentials:'include',
      headers:{'Content-Type':'application/json', ...(options.headers||{})},
      ...options
    });
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`);
      error.status = response.status;
      error.data = await safeJson(response);
      throw error;
    }
    return safeJson(response);
  };

  const show = (el, value=true) => { if (el) el.hidden = !value; };
  const setAuthNote = text => { const el=$('[data-auth-note]'); if(el) el.textContent=text||''; };

  const brandFix = () => {
    document.title = document.title.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development');
    $$('body *').forEach(el => {
      if (el.children.length === 0 && typeof el.textContent === 'string' && el.textContent.includes('Phoenix Inc. Development')) {
        el.textContent = el.textContent.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development');
      }
    });
  };

  const hydrateConfigLinks = () => {
    $$('[data-config-link]').forEach(el => {
      const url = cfg[el.dataset.configLink];
      if (url) el.href=url;
      else el.removeAttribute('href');
    });
    const login=$('[data-discord-login]');
    if(login) login.href=endpoints.login;
    const upgrade=$('[data-premium-upgrade]');
    if(upgrade && cfg.synapseStripeUrl) upgrade.href=cfg.synapseStripeUrl;
  };

  const setUser = user => {
    const root=$('[data-dash-user]'); if(!root) return;
    root.innerHTML='';
    const avatar=document.createElement('div'); avatar.className='syn-user-avatar';
    if(user?.avatarUrl){ const img=document.createElement('img'); img.src=user.avatarUrl; img.alt=''; avatar.appendChild(img); }
    else avatar.textContent=(user?.username||'D').slice(0,2).toUpperCase();
    const copy=document.createElement('div'); copy.innerHTML=`<b>${user?.displayName||user?.username||'Discord'}</b><small>Connecté avec Discord</small>`;
    root.append(avatar,copy);
  };

  const renderGuilds = () => {
    const root=$('[data-guild-grid]'); if(!root) return;
    root.innerHTML='';
    const manageable = guilds.filter(g => g.manageable !== false);
    if(!manageable.length){
      root.innerHTML=`<div class="syn-empty-guilds"><b>Aucun serveur Synapse administrable.</b><p>Ajoutez Synapse à un serveur où vous avez les permissions de gestion, puis actualisez.</p><a class="v2-btn v2-btn-violet" href="${cfg.synapseInviteUrl||'#'}" target="_blank" rel="noopener">Ajouter Synapse ↗</a></div>`;
      return;
    }
    manageable.forEach(g => {
      const card=document.createElement('button'); card.type='button'; card.className='syn-guild-card';
      const icon=g.iconUrl ? `<img src="${g.iconUrl}" alt="">` : `<span>${(g.name||'SY').slice(0,2).toUpperCase()}</span>`;
      card.innerHTML=`<div class="syn-guild-icon">${icon}</div><div><b>${g.name||'Serveur Discord'}</b><small>${g.botInstalled===false?'Synapse à installer':(g.plan||'FREE').toUpperCase()}</small></div><em>GÉRER →</em>`;
      card.addEventListener('click',()=>selectGuild(g));
      root.appendChild(card);
    });
  };

  const selectGuild = async g => {
    guild=g;
    sessionStorage.setItem('synapse-guild-id',String(g.id));
    $('[data-server-name]').textContent=g.name||'Serveur';
    $('[data-server-avatar]').textContent=(g.name||'SY').slice(0,2).toUpperCase();
    plan=(g.plan||'free').toLowerCase();
    updatePlan();
    show($('[data-guild-picker]'),false);
    show($('[data-dashboard-app]'),true);
    try {
      const data=await request(endpoints.guild(g.id));
      if(data) hydrateGuild(data);
    } catch(e) {
      if(e.status!==404) console.warn('Synapse guild API unavailable',e);
      hydrateGuild(g);
    }
    await Promise.allSettled([loadStructure(),loadModules(),loadBilling()]);
  };

  const hydrateGuild = data => {
    const stats=data.stats||data;
    $('[data-stat-channels]').textContent=stats.channels ?? data.channelCount ?? '—';
    $('[data-stat-roles]').textContent=stats.roles ?? data.roleCount ?? '—';
    $('[data-stat-tickets]').textContent=stats.ticketsEnabled === true ? 'ON' : stats.openTickets ?? '—';
    if(data.plan) { plan=String(data.plan).toLowerCase(); updatePlan(); }
  };

  const updatePlan = () => {
    const premium=plan==='premium' || plan==='pro';
    $('[data-server-plan]').textContent=premium?'PREMIUM':'FREE';
    $('[data-stat-plan]').textContent=premium?'PREMIUM':'FREE';
    $('[data-plan-badge]').textContent=premium?'PREMIUM':'FREE';
    document.body.classList.toggle('syn-premium-active',premium);
  };

  const activateTab = name => {
    $$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
    $$('[data-panel]').forEach(p=>p.classList.toggle('active',p.dataset.panel===name));
  };
  $$('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>activateTab(btn.dataset.tab)));
  $$('[data-go-tab]').forEach(btn=>btn.addEventListener('click',()=>activateTab(btn.dataset.goTab)));
  $('[data-change-server]')?.addEventListener('click',()=>{show($('[data-dashboard-app]'),false);show($('[data-guild-picker]'),true);});

  const templates={
    community:{title:'Community Server',tree:[['ACCUEIL',['# bienvenue','# règlement']],['COMMUNAUTÉ',['# général','# médias']],['SUPPORT',['# tickets']],['STAFF',['# modération']]]},
    gaming:{title:'Gaming Server',tree:[['INFO',['# annonces','# règles']],['JEU',['# général','# recherche-groupe']],['VOCAL',['🔊 Général','🔊 Squad']],['STAFF',['# modération']]]},
    support:{title:'Support Server',tree:[['ACCUEIL',['# informations']],['SUPPORT',['# ouvrir-un-ticket','# faq']],['SUIVI',['# annonces-support']],['STAFF',['# équipe-support']]]},
    blank:{title:'Structure personnalisée',tree:[['NOUVELLE CATÉGORIE',['# nouveau-salon']]]}
  };
  let activeTemplate='community';

  const renderBuilderTree = () => {
    const tpl=templates[activeTemplate];
    $('[data-builder-title]').textContent=tpl.title;
    const root=$('[data-builder-tree]'); root.innerHTML='';
    tpl.tree.forEach(([cat,channels],catIndex)=>{
      const block=document.createElement('article'); block.className='syn-tree-category';
      block.innerHTML=`<div><input value="${cat}" data-cat-index="${catIndex}"><button type="button" data-remove-cat="${catIndex}">×</button></div><div class="syn-tree-channels">${channels.map((c,i)=>`<label><input value="${c}" data-channel-index="${catIndex}:${i}"><button type="button" data-remove-channel="${catIndex}:${i}">×</button></label>`).join('')}</div><button type="button" class="syn-add-inline" data-add-channel-to="${catIndex}">+ Ajouter un salon</button>`;
      root.appendChild(block);
    });
    const add=document.createElement('button'); add.type='button'; add.className='syn-add-category'; add.textContent='+ Ajouter une catégorie'; add.addEventListener('click',()=>{tpl.tree.push(['NOUVELLE CATÉGORIE',['# nouveau-salon']]);renderBuilderTree();}); root.appendChild(add);
    $$('[data-add-channel-to]',root).forEach(b=>b.addEventListener('click',()=>{tpl.tree[+b.dataset.addChannelTo][1].push('# nouveau-salon');renderBuilderTree();}));
    $$('[data-remove-cat]',root).forEach(b=>b.addEventListener('click',()=>{tpl.tree.splice(+b.dataset.removeCat,1);renderBuilderTree();}));
    $$('[data-remove-channel]',root).forEach(b=>b.addEventListener('click',()=>{const [c,i]=b.dataset.removeChannel.split(':').map(Number);tpl.tree[c][1].splice(i,1);renderBuilderTree();}));
  };
  $$('[data-template]').forEach(btn=>btn.addEventListener('click',()=>{activeTemplate=btn.dataset.template;$$('[data-template]').forEach(b=>b.classList.toggle('active',b===btn));renderBuilderTree();}));
  renderBuilderTree();

  const collectBuilder = () => {
    const tpl=templates[activeTemplate];
    $$('[data-cat-index]').forEach(i=>tpl.tree[+i.dataset.catIndex][0]=i.value.trim());
    $$('[data-channel-index]').forEach(i=>{const [c,x]=i.dataset.channelIndex.split(':').map(Number);tpl.tree[c][1][x]=i.value.trim();});
    return {template:activeTemplate,name:tpl.title,categories:tpl.tree.map(([name,channels])=>({name,channels}))};
  };

  $('[data-apply-builder]')?.addEventListener('click',async()=>{
    if(!guild) return;
    const state=$('[data-builder-state]'); state.textContent='ENREGISTREMENT…';
    try { await request(endpoints.builder(guild.id),{method:'PUT',body:JSON.stringify(collectBuilder())}); state.textContent='ENREGISTRÉ'; }
    catch(e){ state.textContent=e.status===404?'PRÊT À CONNECTER':'ERREUR'; }
    setTimeout(()=>state.textContent='PRÊT',1800);
  });

  const renderList=(root,items,type)=>{
    root.innerHTML='';
    if(!items?.length){root.innerHTML='<span class="syn-loading">Aucun élément.</span>';return;}
    items.forEach(item=>{
      const row=document.createElement('div'); row.className='syn-list-row';
      row.innerHTML=`<div><b>${item.name||item.label||'Élément'}</b><small>${item.type||type}</small></div><button type="button">MODIFIER</button>`;
      root.appendChild(row);
    });
  };

  const loadStructure=async()=>{
    if(!guild)return;
    try{const data=await request(endpoints.structure(guild.id));renderList($('[data-channel-list]'),data?.channels||data?.categories||[],'SALON');renderList($('[data-role-list]'),data?.roles||[],'RÔLE');}
    catch{renderList($('[data-channel-list]'),[], 'SALON');renderList($('[data-role-list]'),[], 'RÔLE');}
  };
  $('[data-refresh-structure]')?.addEventListener('click',loadStructure);

  const loadModules=async()=>{
    if(!guild)return;
    const jobs=[['tickets',endpoints.tickets(guild.id)],['moderation',endpoints.moderation(guild.id)],['community',endpoints.community(guild.id)]];
    for(const [name,url] of jobs){try{const data=await request(url);if(data)hydrateModule(name,data);}catch{}}
  };
  const hydrateModule=(name,data)=>{
    if(name==='tickets'){
      if($('[data-ticket-enabled]')) $('[data-ticket-enabled]').checked=!!data.enabled;
      $('[data-ticket-title]').value=data.title||'';$('[data-ticket-category]').value=data.category||'';$('[data-ticket-role]').value=data.role||'';$('[data-ticket-transcripts]').value=data.transcripts||'';$('[data-ticket-message]').value=data.message||'';
    }
    if(name==='moderation') Object.entries(data).forEach(([k,v])=>{const el=$(`[data-mod="${k}"]`);if(el)el.checked=!!v;});
    if(name==='community'){
      $('[data-community-welcome-channel]').value=data.welcomeChannel||'';$('[data-community-role]').value=data.autoRole||'';$('[data-community-welcome-message]').value=data.welcomeMessage||'';
      Object.entries(data.modules||{}).forEach(([k,v])=>{const el=$(`[data-community="${k}"]`);if(el)el.checked=!!v;});
    }
  };

  $$('[data-save-module]').forEach(btn=>btn.addEventListener('click',async()=>{
    if(!guild)return;
    const name=btn.dataset.saveModule;
    let body={}; let url='';
    if(name==='tickets'){url=endpoints.tickets(guild.id);body={enabled:$('[data-ticket-enabled]').checked,title:$('[data-ticket-title]').value,category:$('[data-ticket-category]').value,role:$('[data-ticket-role]').value,transcripts:$('[data-ticket-transcripts]').value,message:$('[data-ticket-message]').value};}
    if(name==='moderation'){url=endpoints.moderation(guild.id);$$('[data-mod]').forEach(el=>body[el.dataset.mod]=el.checked);}
    if(name==='community'){url=endpoints.community(guild.id);body={welcomeChannel:$('[data-community-welcome-channel]').value,autoRole:$('[data-community-role]').value,welcomeMessage:$('[data-community-welcome-message]').value,modules:{}};$$('[data-community]').forEach(el=>body.modules[el.dataset.community]=el.checked);}
    const before=btn.textContent;btn.textContent='Enregistrement…';
    try{await request(url,{method:'PUT',body:JSON.stringify(body)});btn.textContent='Enregistré ✓';}catch(e){btn.textContent=e.status===404?'API à connecter':'Erreur';}
    setTimeout(()=>btn.textContent=before,1800);
  }));

  const loadBilling=async()=>{
    if(!guild)return;
    try{const data=await request(endpoints.billing(guild.id)); if(!data)return; plan=String(data.plan||plan).toLowerCase();updatePlan();const premium=plan==='premium'||plan==='pro';$('[data-billing-title]').textContent=premium?'Synapse Premium':'Synapse Free';$('[data-billing-copy]').textContent=premium?'Premium est actif sur ce serveur.':'Aucun abonnement payant actif sur ce serveur.';$('[data-billing-status]').textContent=(data.status||plan).toUpperCase();$('[data-billing-renewal]').textContent=data.renewsAt||data.currentPeriodEnd||'—';}
    catch{}
  };
  $('[data-billing-portal]')?.addEventListener('click',async()=>{
    if(!guild)return;
    try{const data=await request(endpoints.billingPortal(guild.id),{method:'POST',body:'{}'});if(data?.url)location.href=data.url;else if(cfg.synapseStripeUrl)location.href=cfg.synapseStripeUrl;}
    catch{if(cfg.synapseStripeUrl)window.open(cfg.synapseStripeUrl,'_blank','noopener');}
  });

  $('[data-refresh-guilds]')?.addEventListener('click',loadGuilds);
  async function loadGuilds(){
    try{guilds=(await request(endpoints.guilds))||[];if(!Array.isArray(guilds))guilds=guilds.guilds||[];renderGuilds();}
    catch{guilds=[];renderGuilds();}
  }

  const bootstrap=async()=>{
    brandFix();hydrateConfigLinks();
    try{
      session=await request(endpoints.me);
      if(!session?.user) throw Object.assign(new Error('Unauthenticated'),{status:401});
      setUser(session.user);show($('[data-auth-gate]'),false);show($('[data-guild-picker]'),true);await loadGuilds();
      const remembered=sessionStorage.getItem('synapse-guild-id');
      if(remembered){const match=guilds.find(g=>String(g.id)===remembered);if(match)await selectGuild(match);}
    }catch(e){
      show($('[data-auth-gate]'),true);show($('[data-guild-picker]'),false);show($('[data-dashboard-app]'),false);
      if(e.status===404||e.status===0||e instanceof TypeError)setAuthNote('Le dashboard est intégré au site. Il attend maintenant les routes Synapse du backend sur ce même domaine.');
      else setAuthNote('Connectez-vous avec Discord pour accéder à vos serveurs Synapse.');
    }
  };

  document.querySelector('[data-menu-toggle]')?.addEventListener('click',()=>document.querySelector('[data-site-header]')?.classList.toggle('open'));
  bootstrap();
})();
