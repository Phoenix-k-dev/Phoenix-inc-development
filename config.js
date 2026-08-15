window.PHOENIX_CONFIG={
  contactEmail:"phoenixinc.dev@gmail.com",
  discordUrl:"https://discord.gg/xfWVss2KCv",
  tebexUrl:"",
  phGarageTebexUrl:"",
  phBankingTebexUrl:"",
  githubUrl:"https://github.com/Phoenix-k-dev",
  discordApplicationId:"1535652568150057011",
  synapseInviteUrl:"https://discord.com/oauth2/authorize?client_id=1535652568150057011&scope=bot%20applications.commands&integration_type=0",
  synapseDashboardUrl:"dashboard.html",
  synapseLoginUrl:"/auth/discord",
  synapseMeUrl:"/api/me",
  synapseGuildsUrl:"/api/guilds",
  synapseStripeUrl:"https://donate.stripe.com/8x228r3h710HehY1CT6AM00",
  phGaragePrice:"34,99 €",
  phBankingPrice:"39,99 €"
};

(()=>{
  const css=(href,key)=>{if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.setAttribute(`data-${key}`,'true');document.head.appendChild(l)};
  const js=(src,key)=>{if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.async=false;s.setAttribute(`data-${key}`,'true');document.head.appendChild(s)};

  css('site-enhancements.css','phoenix-enhancements');
  css('ui-fixes.css','phoenix-ui-fixes');
  css('theme-light.css','phoenix-theme');

  if(document.body.classList.contains('synapse-saas-page')){
    css('synapse-product-v2.css','synapse-product-v2');
    css('synapse-flow.css','synapse-flow');
    css('synapse-adaptive.css','synapse-adaptive');
  }
  if(document.body.classList.contains('v2-dashboard-page')){
    css('dashboard-pro.css','synapse-dashboard-pro');
    css('dashboard-scale.css','synapse-dashboard-scale');
    css('dashboard-ticket-studio.css','synapse-ticket-studio');
    css('dashboard-multiserver.css','synapse-multiserver');
    css('dashboard-hub.css','synapse-dashboard-hub');
  }

  js('theme-toggle.js','phoenix-theme');
  js('site-enhancements.js','phoenix-enhancements');
  js('payment-links.js','phoenix-payments');
  js('ui-fixes.js','phoenix-ui-fixes');
  js('brand-nav.js','phoenix-brand-nav');

  if(document.body.classList.contains('v2-scripts')) js('catalog-filters-v2.js','catalog-filters-v2');
  if(document.body.classList.contains('synapse-saas-page')){
    js('synapse-product-v2.js','synapse-product-v2');
    js('synapse-adaptive.js','synapse-adaptive');
  }
  if(document.body.classList.contains('v2-dashboard-page')){
    js('dashboard-extras.js','synapse-dashboard-extras');
    js('dashboard-pro.js','synapse-dashboard-pro');
    js('dashboard-ticket-studio.js','synapse-ticket-studio');
    js('dashboard-multiserver.js','synapse-multiserver');
    js('dashboard-hub.js','synapse-dashboard-hub');
  }
})();
