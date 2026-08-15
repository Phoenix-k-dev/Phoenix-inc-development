(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const config=window.PHOENIX_CONFIG||{};

  const storeUrl=()=>config.synapseDiscordStoreUrl||(
    config.discordApplicationId
      ? `https://discord.com/application-directory/${config.discordApplicationId}/store`
      : ''
  );

  const openPremium=()=>{
    const url=storeUrl();
    if(!url){
      alert('La page Synapse Premium n’est pas encore configurée.');
      return;
    }
    window.open(url,'_blank','noopener,noreferrer');
  };

  const bind=()=>{
    $$('[data-premium-upgrade]').forEach(el=>{
      if(el.dataset.discordBillingBound)return;
      el.dataset.discordBillingBound='1';
      if(el instanceof HTMLAnchorElement){
        el.href=storeUrl()||'#';
        el.target='_blank';
        el.rel='noopener';
      }
      el.addEventListener('click',e=>{
        if(el instanceof HTMLAnchorElement&&storeUrl())return;
        e.preventDefault();
        openPremium();
      });
    });

    $$('[data-billing-portal]').forEach(el=>{
      if(el.dataset.discordBillingPortalBound)return;
      el.dataset.discordBillingPortalBound='1';
      el.addEventListener('click',e=>{
        e.preventDefault();
        openPremium();
      });
    });
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
  new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});
})();
