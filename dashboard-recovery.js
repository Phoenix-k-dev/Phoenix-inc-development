(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

  const stabilize=()=>{
    // Remove any accidental server rail / oversized decorative image injected by experimental layers.
    $$('.syn-server-rail').forEach(el=>el.remove());
    $$('.syn-dash-sidebar img').forEach(img=>{
      if(!img.closest('.syn-server-avatar') && !img.closest('.syn-server-card')){
        img.style.maxWidth='36px'; img.style.maxHeight='36px'; img.style.objectFit='contain';
      }
    });

    const app=$('[data-dashboard-app]');
    const auth=$('[data-auth-gate]');
    const picker=$('[data-guild-picker]');
    const demo=localStorage.getItem('synapse-dashboard-demo')==='1';
    const guildId=sessionStorage.getItem('synapse-guild-id');

    // If demo is active, dashboard must be visible. Otherwise keep auth/picker controlled by dashboard.js.
    if(demo && app){
      app.hidden=false;
      if(auth) auth.hidden=true;
      if(picker) picker.hidden=true;
      document.body.classList.add('syn-dashboard-open');
    } else if(app && !app.hidden){
      document.body.classList.add('syn-dashboard-open');
    } else {
      document.body.classList.remove('syn-dashboard-open');
    }

    // Ensure only one panel is visible and buttons drive the same panel set.
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

    // Rehydrate the Discord login and invite buttons if another layer removed hrefs.
    const cfg=window.PHOENIX_CONFIG||{};
    const login=$('[data-discord-login]');
    if(login && cfg.synapseLoginUrl) login.href=cfg.synapseLoginUrl;
    $$('[data-config-link="synapseInviteUrl"]').forEach(el=>{if(cfg.synapseInviteUrl) el.href=cfg.synapseInviteUrl;});

    // Deep-link a guild only if one was explicitly provided.
    const params=new URLSearchParams(location.search);
    if(params.get('guild') && !guildId) sessionStorage.setItem('synapse-guild-id',params.get('guild'));
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',stabilize,{once:true}); else stabilize();
  setTimeout(stabilize,150);
  setTimeout(stabilize,600);
})();
