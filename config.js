window.PHOENIX_CONFIG={
  contactEmail:"phoenixinc.dev@gmail.com",
  discordUrl:"https://discord.gg/xfWVss2KCv",
  tebexUrl:"",
  youtubeUrl:"",
  kofiUrl:"https://ko-fi.com/phoenix_dev",
  phGarageTebexUrl:"",
  phBankingTebexUrl:"",
  githubUrl:"https://github.com/Phoenix-k-dev",
  discordApplicationId:"928717186393079839",
  synapseInviteUrl:"https://discord.com/oauth2/authorize?client_id=928717186393079839&scope=bot%20applications.commands&permissions=1100333837330&integration_type=0",
  synapseDiscordStoreUrl:"https://discord.com/application-directory/928717186393079839/store",
  synapseDashboardUrl:"dashboard.html",
  synapseLoginUrl:"/auth/discord",
  synapseMeUrl:"/api/me",
  synapseGuildsUrl:"/api/guilds",
  synapseStripeUrl:"https://donate.stripe.com/8x228r3h710HehY1CT6AM00",
  synapseCheckoutEndpoint:"/api/billing/checkout-session",
  synapseBillingPortalEndpoint:"/api/billing/portal",
  stripePublishableKey:"",
  phGaragePrice:"34,99 €",
  phBankingPrice:"39,99 €"
};

(()=>{
  const v='20260816-1400';
  const css=(href,key)=>{if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.setAttribute(`data-${key}`,'true');document.head.appendChild(l)};
  const js=(src,key)=>{if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.async=false;s.setAttribute(`data-${key}`,'true');document.head.appendChild(s)};
  const forceSynapseInvite=()=>{const invite=window.PHOENIX_CONFIG?.synapseInviteUrl;if(!invite)return;document.querySelectorAll('[data-config-link="synapseInviteUrl"],a[href*="discord.com/oauth2/authorize"][href*="client_id="]').forEach(link=>{if(link instanceof HTMLAnchorElement)link.href=invite;});};

  css(`site-enhancements.css?v=${v}`,'phoenix-enhancements');
  css(`ui-fixes.css?v=${v}`,'phoenix-ui-fixes');
  css(`theme-light.css?v=${v}`,'phoenix-theme');
  css(`global-socials.css?v=${v}`,'phoenix-global-socials');
  css(`phoenix-premium-skin.css?v=${v}`,'phoenix-premium-skin');
  if(document.body.classList.contains('v2-home'))css(`home-contact.css?v=${v}`,'phoenix-home-contact');
  if(document.body.classList.contains('v2-command-page'))css(`commands-control-center.css?v=${v}`,'phoenix-command-center');
  if(document.body.classList.contains('synapse-saas-page')){css(`synapse-product-v2.css?v=${v}`,'synapse-product-v2');css(`synapse-flow.css?v=${v}`,'synapse-flow');css(`synapse-adaptive.css?v=${v}`,'synapse-adaptive');}
  if(document.body.classList.contains('v2-dashboard-page')){css('dashboard-pro.css','synapse-dashboard-pro');css('dashboard-scale.css','synapse-dashboard-scale');css('dashboard-ticket-studio.css','synapse-ticket-studio');css('dashboard-multiserver.css','synapse-multiserver');css('dashboard-billing.css','synapse-billing');css('dashboard-recovery.css?v=20260815-1908','synapse-dashboard-recovery');css('dashboard-dock.css?v=20260815-1908','synapse-dashboard-dock');}

  js(`theme-toggle.js?v=${v}`,'phoenix-theme');
  js(`site-enhancements.js?v=${v}`,'phoenix-enhancements');
  js('payment-links.js','phoenix-payments');
  js(`ui-fixes.js?v=${v}`,'phoenix-ui-fixes');
  js('brand-nav.js','phoenix-brand-nav');
  js(`legal-links.js?v=${v}`,'phoenix-legal-links');
  js(`global-socials.js?v=${v}`,'phoenix-global-socials');
  if(document.body.classList.contains('v2-home')){js(`home-contact.js?v=${v}`,'phoenix-home-contact');js(`customer-copy.js?v=${v}`,'phoenix-customer-copy');}
  if(document.body.classList.contains('v2-command-page'))js(`commands-control-center.js?v=${v}`,'phoenix-command-center');
  if(document.body.classList.contains('v2-scripts'))js('catalog-filters-v2.js','catalog-filters-v2');
  if(document.body.classList.contains('synapse-saas-page')){js(`synapse-product-v2.js?v=${v}`,'synapse-product-v2');js(`synapse-adaptive.js?v=${v}`,'synapse-adaptive');js(`synapse-product-lang.js?v=${v}`,'synapse-product-lang');}
  if(document.body.classList.contains('v2-dashboard-page')){js('dashboard-extras.js','synapse-dashboard-extras');js('dashboard-pro.js','synapse-dashboard-pro');js('dashboard-ticket-studio.js','synapse-ticket-studio');js('dashboard-multiserver.js','synapse-multiserver');js('dashboard-billing.js','synapse-billing');js('dashboard-recovery.js?v=20260815-1908','synapse-dashboard-recovery');js('dashboard-dock.js?v=20260815-1908','synapse-dashboard-dock');}

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',forceSynapseInvite,{once:true});else forceSynapseInvite();setTimeout(forceSynapseInvite,250);setTimeout(forceSynapseInvite,1000);
})();