window.PHOENIX_CONFIG={
  contactEmail:"phoenixinc.dev@gmail.com",
  discordUrl:"https://discord.gg/xfWVss2KCv",
  tebexUrl:"",
  phGarageTebexUrl:"",
  phBankingTebexUrl:"",
  githubUrl:"https://github.com/Phoenix-k-dev",
  discordApplicationId:"1535652568150057011",
  synapseInviteUrl:"https://discord.com/oauth2/authorize?client_id=1535652568150057011",
  synapseDashboardUrl:"",
  synapseLoginUrl:"",
  synapseStripeUrl:"https://donate.stripe.com/8x228r3h710HehY1CT6AM00",
  phGaragePrice:"34,99 €",
  phBankingPrice:"39,99 €"
};

(()=>{
  const addCss=(href,key)=>{if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset[key.replace(/-/g,'')]='true';document.head.appendChild(l)};
  const addJs=(src,key)=>{if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.async=false;s.dataset[key.replace(/-/g,'')]='true';document.head.appendChild(s)};

  if(!document.querySelector('link[data-phoenix-enhancements]')){const l=document.createElement('link');l.rel='stylesheet';l.href='site-enhancements.css';l.dataset.phoenixEnhancements='true';document.head.appendChild(l)}
  if(!document.querySelector('link[data-phoenix-ui-fixes]')){const l=document.createElement('link');l.rel='stylesheet';l.href='ui-fixes.css';l.dataset.phoenixUiFixes='true';document.head.appendChild(l)}
  if(document.body.classList.contains('synapse-saas-page')){
    if(!document.querySelector('link[data-synapse-product-v2]')){const l=document.createElement('link');l.rel='stylesheet';l.href='synapse-product-v2.css';l.dataset.synapseProductV2='true';document.head.appendChild(l)}
    if(!document.querySelector('link[data-synapse-flow]')){const l=document.createElement('link');l.rel='stylesheet';l.href='synapse-flow.css';l.dataset.synapseFlow='true';document.head.appendChild(l)}
  }
  if(!document.querySelector('script[data-phoenix-enhancements]')){const s=document.createElement('script');s.src='site-enhancements.js';s.async=false;s.dataset.phoenixEnhancements='true';document.head.appendChild(s)}
  if(!document.querySelector('script[data-phoenix-payments]')){const s=document.createElement('script');s.src='payment-links.js';s.async=false;s.dataset.phoenixPayments='true';document.head.appendChild(s)}
  if(!document.querySelector('script[data-phoenix-ui-fixes]')){const s=document.createElement('script');s.src='ui-fixes.js';s.async=false;s.dataset.phoenixUiFixes='true';document.head.appendChild(s)}
  if(document.body.classList.contains('v2-scripts')&&!document.querySelector('script[data-catalog-filters-v2]')){const s=document.createElement('script');s.src='catalog-filters-v2.js';s.async=false;s.dataset.catalogFiltersV2='true';document.head.appendChild(s)}
  if(document.body.classList.contains('synapse-saas-page')&&!document.querySelector('script[data-synapse-product-v2]')){const s=document.createElement('script');s.src='synapse-product-v2.js';s.async=false;s.dataset.synapseProductV2='true';document.head.appendChild(s)}
})();
