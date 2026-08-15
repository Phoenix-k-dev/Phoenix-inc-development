window.PHOENIX_CONFIG={
  contactEmail:"phoenixinc.dev@gmail.com",
  discordUrl:"https://discord.gg/xfWVss2KCv",
  tebexUrl:"",
  phGarageTebexUrl:"",
  phBankingTebexUrl:"",
  githubUrl:"https://github.com/Phoenix-k-dev",
  discordApplicationId:"1535652568150057011",
  synapseInviteUrl:"https://discord.com/oauth2/authorize?client_id=1535652568150057011",
  synapseDashboardUrl:"dashboard.html",
  synapseLoginUrl:"/auth/discord",
  synapseMeUrl:"/api/me",
  synapseGuildsUrl:"/api/guilds",
  synapseStripeUrl:"https://donate.stripe.com/8x228r3h710HehY1CT6AM00",
  phGaragePrice:"34,99 €",
  phBankingPrice:"39,99 €"
};

(()=>{
  if(!document.querySelector('link[data-phoenix-enhancements]')){const l=document.createElement('link');l.rel='stylesheet';l.href='site-enhancements.css';l.dataset.phoenixEnhancements='true';document.head.appendChild(l)}
  if(!document.querySelector('link[data-phoenix-ui-fixes]')){const l=document.createElement('link');l.rel='stylesheet';l.href='ui-fixes.css';l.dataset.phoenixUiFixes='true';document.head.appendChild(l)}
  if(!document.querySelector('link[data-phoenix-theme]')){const l=document.createElement('link');l.rel='stylesheet';l.href='theme-light.css';l.dataset.phoenixTheme='true';document.head.appendChild(l)}
  if(document.body.classList.contains('synapse-saas-page')){
    if(!document.querySelector('link[data-synapse-product-v2]')){const l=document.createElement('link');l.rel='stylesheet';l.href='synapse-product-v2.css';l.dataset.synapseProductV2='true';document.head.appendChild(l)}
    if(!document.querySelector('link[data-synapse-flow]')){const l=document.createElement('link');l.rel='stylesheet';l.href='synapse-flow.css';l.dataset.synapseFlow='true';document.head.appendChild(l)}
  }
  if(!document.querySelector('script[data-phoenix-theme]')){const s=document.createElement('script');s.src='theme-toggle.js';s.async=false;s.dataset.phoenixTheme='true';document.head.appendChild(s)}
  if(!document.querySelector('script[data-phoenix-enhancements]')){const s=document.createElement('script');s.src='site-enhancements.js';s.async=false;s.dataset.phoenixEnhancements='true';document.head.appendChild(s)}
  if(!document.querySelector('script[data-phoenix-payments]')){const s=document.createElement('script');s.src='payment-links.js';s.async=false;s.dataset.phoenixPayments='true';document.head.appendChild(s)}
  if(!document.querySelector('script[data-phoenix-ui-fixes]')){const s=document.createElement('script');s.src='ui-fixes.js';s.async=false;s.dataset.phoenixUiFixes='true';document.head.appendChild(s)}
  if(!document.querySelector('script[data-phoenix-brand-nav]')){const s=document.createElement('script');s.src='brand-nav.js';s.async=false;s.dataset.phoenixBrandNav='true';document.head.appendChild(s)}
  if(document.body.classList.contains('v2-scripts')&&!document.querySelector('script[data-catalog-filters-v2]')){const s=document.createElement('script');s.src='catalog-filters-v2.js';s.async=false;s.dataset.catalogFiltersV2='true';document.head.appendChild(s)}
  if(document.body.classList.contains('synapse-saas-page')&&!document.querySelector('script[data-synapse-product-v2]')){const s=document.createElement('script');s.src='synapse-product-v2.js';s.async=false;s.dataset.synapseProductV2='true';document.head.appendChild(s)}
  if(document.body.classList.contains('v2-dashboard-page')&&!document.querySelector('script[data-synapse-dashboard-extras]')){const s=document.createElement('script');s.src='dashboard-extras.js';s.async=false;s.dataset.synapseDashboardExtras='true';document.head.appendChild(s)}
})();
