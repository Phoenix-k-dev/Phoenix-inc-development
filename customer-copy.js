(() => {
  if(!document.body.classList.contains('v2-home'))return;
  const copy={
    fr:{
      showcase:'Découvrez une sélection de nos produits et solutions actuellement mis en avant.',
      categories:'Scripts FiveM, bots Discord, sites web et applications : accédez directement à l’univers qui vous intéresse.',
      network:'Retrouvez nos produits, notre support et nos actualités sur les plateformes officielles Phoenix Inc | Development.'
    },
    en:{
      showcase:'Discover a selection of the products and solutions currently featured by Phoenix Inc | Development.',
      categories:'FiveM scripts, Discord bots, websites and applications: go straight to the area that interests you.',
      network:'Find our products, support and latest updates across the official Phoenix Inc | Development platforms.'
    }
  };
  function apply(){const t=copy[document.documentElement.lang==='en'?'en':'fr'];const targets={showcase:'[data-v2-i18n="home.showcaseCopy"]',categories:'[data-v2-i18n="home.categoriesCopy"]',network:'[data-v2-i18n="home.networkCopy"]'};for(const [key,selector] of Object.entries(targets)){const el=document.querySelector(selector);if(el)el.textContent=t[key];}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0),{once:true});else setTimeout(apply,0);
  window.addEventListener('phoenix:langchange',()=>setTimeout(apply,0));
  const observer=new MutationObserver(m=>{if(m.some(x=>x.type==='attributes'&&x.attributeName==='lang'))setTimeout(apply,0);});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();