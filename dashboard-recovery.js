(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

  let cleaning=false;
  const removeExperimentalNodes=()=>{
    if(cleaning) return;
    cleaning=true;

    // Old experimental server rails must never coexist with the stable 2-column dashboard.
    $$('[class*="syn-server-rail"], .syn-server-rail').forEach(el=>el.remove());

    const app=$('[data-dashboard-app]');
    if(app){
      // The stable dashboard accepts exactly two direct layout children.
      [...app.children].forEach(child=>{
        if(!child.classList.contains('syn-dash-sidebar') && !child.classList.contains('syn-dash-content')) child.remove();
      });
    }

    // Guard against any oversized logo/image injected by an old experimental build.
    $$('.syn-dash-sidebar img').forEach(img=>{
      if(img.closest('.syn-server-avatar')){
        img.style.setProperty('width','34px','important');
        img.style.setProperty('height','34px','important');
        img.style.setProperty('max-width','34px','important');
        img.style.setProperty('max-height','34px','important');
        img.style.setProperty('object-fit','contain','important');
      } else {
        img.style.setProperty('max-width','40px','important');
        img.style.setProperty('max-height','40px','important');
        img.style.setProperty('object-fit','contain','important');
      }
    });

    cleaning=false;
  };

  const stabilizeState=()=>{
    removeExperimentalNodes();

    const app=$('[data-dashboard-app]');
    const auth=$('[data-auth-gate]');
    const picker=$('[data-guild-picker]');
    const demo=localStorage.getItem('synapse-dashboard-demo')==='1';
    const guildId=sessionStorage.getItem('synapse-guild-id');

    // Never render auth and the actual dashboard simultaneously.
    if(demo && app){
      app.hidden=false;
      if(auth) auth.hidden=true;
      if(picker) picker.hidden=true;
      document.body.classList.add('syn-dashboard-open');
    } else if(app && !app.hidden){
      if(auth) auth.hidden=true;
      document.body.classList.add('syn-dashboard-open');
    } else {
      document.body.classList.remove('syn-dashboard-open');
    }

    const nav=$('.syn-dash-tabs');
    const content=$('.syn-dash-content');
    if(nav && content){
      const buttons=$$('[data-tab]',nav);
      buttons.forEach(btn=>{
        if(btn.dataset.recoveryBound) return;
        btn.dataset.recoveryBound='1';
        btn.addEventListener('click',()=>{
          buttons.forEach(b=>b.classList.toggle('active',b===btn));
          $$('[data-panel]',content).forEach(p=>p.classList.toggle('active',p.dataset.panel===btn.dataset.tab));
          history.replaceState(null,'',`#${btn.dataset.tab}`);
        });
      });
      const active=buttons.find(b=>b.classList.contains('active')) || buttons[0];
      if(active && !content.querySelector('[data-panel].active')) active.click();
    }

    const cfg=window.PHOENIX_CONFIG||{};
    const login=$('[data-discord-login]');
    if(login && cfg.synapseLoginUrl) login.href=cfg.synapseLoginUrl;
    $$('[data-config-link="synapseInviteUrl"]').forEach(el=>{if(cfg.synapseInviteUrl) el.href=cfg.synapseInviteUrl;});

    const params=new URLSearchParams(location.search);
    if(params.get('guild') && !guildId) sessionStorage.setItem('synapse-guild-id',params.get('guild'));
  };

  const boot=()=>{
    stabilizeState();
    const observer=new MutationObserver(()=>removeExperimentalNodes());
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(stabilizeState,50);
    setTimeout(stabilizeState,250);
    setTimeout(stabilizeState,1000);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
