(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const cfg=window.PHOENIX_CONFIG||{};
  const $=(s,r=document)=>r.querySelector(s);

  const initials=name=>(name||'S').split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();

  const makeServerButton=(server,current=false)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='syn-dock-server'+(current?' active':'');
    btn.title=server.name||'Serveur Discord';
    btn.dataset.guildId=server.id||'';
    if(server.iconUrl){btn.innerHTML=`<img src="${server.iconUrl}" alt=""><span>${server.name||'Serveur'}</span>`;}
    else if(server.demo){btn.innerHTML=`<img src="./assets/logo-phoenix-ph.png" alt=""><span>${server.name||'Serveur Démo'}</span>`;}
    else btn.innerHTML=`<b>${initials(server.name)}</b><span>${server.name||'Serveur'}</span>`;
    btn.addEventListener('click',()=>{
      if(server.id) sessionStorage.setItem('synapse-guild-id',String(server.id));
      document.querySelectorAll('.syn-dock-server').forEach(x=>x.classList.toggle('active',x===btn));
      const name=$('[data-server-name]'); if(name) name.textContent=server.name||'Serveur';
      if(server.id && !server.demo) location.href=`dashboard.html?guild=${encodeURIComponent(server.id)}`;
    });
    return btn;
  };

  const mount=()=>{
    if($('.syn-server-dock')) return;
    const dock=document.createElement('aside');
    dock.className='syn-server-dock';
    dock.innerHTML=`
      <div class="syn-dock-brand" title="Synapse"><img src="./assets/logo-phoenix-ph.png" alt="Synapse"></div>
      <div class="syn-dock-divider"></div>
      <div class="syn-dock-list" data-dock-list></div>
      <div class="syn-dock-spacer"></div>
      <button class="syn-dock-add" type="button" title="Ajouter Synapse à un serveur">+</button>`;
    document.body.appendChild(dock);
    dock.querySelector('.syn-dock-add')?.addEventListener('click',()=>{if(cfg.synapseInviteUrl) window.open(cfg.synapseInviteUrl,'_blank','noopener');});
    hydrate();
  };

  const hydrate=async()=>{
    const list=$('[data-dock-list]'); if(!list) return;
    list.innerHTML='';
    const currentId=sessionStorage.getItem('synapse-guild-id');
    const demo=localStorage.getItem('synapse-dashboard-demo')==='1';
    if(demo){
      list.appendChild(makeServerButton({id:'demo',name:'Serveur Démo',demo:true},true));
      return;
    }
    try{
      const res=await fetch(cfg.synapseGuildsUrl||'/api/guilds',{credentials:'include'});
      if(!res.ok) throw new Error('guilds unavailable');
      const data=await res.json();
      const guilds=Array.isArray(data)?data:(data?.guilds||[]);
      guilds.filter(g=>g.manageable!==false && g.botInstalled!==false).forEach((g,i)=>list.appendChild(makeServerButton(g,String(g.id)===String(currentId)||(!currentId&&i===0))));
      if(!list.children.length) list.appendChild(makeServerButton({name:'Synapse',demo:true},false));
    }catch{
      list.appendChild(makeServerButton({name:'Synapse',demo:true},false));
    }
  };

  const syncVisibility=()=>{
    const dock=$('.syn-server-dock'); if(!dock) return;
    const app=$('[data-dashboard-app]');
    dock.classList.toggle('visible',!!app && !app.hidden);
  };

  const boot=()=>{
    mount(); syncVisibility();
    const app=$('[data-dashboard-app]');
    if(app) new MutationObserver(()=>{syncVisibility();hydrate();}).observe(app,{attributes:true,attributeFilter:['hidden']});
    window.addEventListener('storage',()=>{hydrate();syncVisibility();});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();