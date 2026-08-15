(()=>{
  if(!document.body.classList.contains('synapse-saas-page'))return;

  const labels={
    fr:{home:'Accueil',scripts:'Scripts',bots:'Bots',commands:'Commandes',services:'Web · Apps · Autres',add:'Ajouter Synapse à votre serveur ↗',all:'Voir toutes les commandes →',explore:'Explorer toutes les commandes →',view:'Voir les commandes →'},
    en:{home:'Home',scripts:'Scripts',bots:'Bots',commands:'Commands',services:'Web · Apps · More',add:'Add Synapse to your server ↗',all:'View all commands →',explore:'Explore all commands →',view:'View commands →'}
  };

  let lang=localStorage.getItem('phoenix-lang')==='en'?'en':'fr';
  let applying=false;

  function apply(){
    if(applying)return;applying=true;
    const t=labels[lang];
    document.documentElement.lang=lang;
    const nav=document.querySelector('.syn-v2-nav');
    if(nav){
      const links=[...nav.querySelectorAll('a')];
      const find=(end)=>links.find(a=>(a.getAttribute('href')||'').endsWith(end));
      const home=find('index.html');if(home)home.textContent=t.home;
      const scripts=find('scripts.html');if(scripts)scripts.textContent=t.scripts;
      const bots=find('bots.html');if(bots)bots.textContent=t.bots;
      const commands=find('synapse-commands.html');if(commands)commands.textContent=t.commands;
      const services=find('services.html');if(services)services.textContent=t.services;
    }

    document.querySelectorAll('a[href="synapse-commands.html"]').forEach(a=>{
      const txt=(a.textContent||'').trim().toLowerCase();
      if(txt.includes('explorer')||txt.includes('explore'))a.textContent=t.explore;
      else if(txt.includes('toutes')||txt.includes('all commands'))a.textContent=t.all;
      else if(txt.includes('voir les commandes')||txt.includes('view commands'))a.textContent=t.view;
      else if(a.closest('.syn-v2-nav'))a.textContent=t.commands;
    });

    const actions=document.querySelector('.syn-v2-actions');
    if(actions&&!actions.querySelector('[data-syn-product-lang]')){
      const button=document.createElement('button');
      button.type='button';button.setAttribute('data-syn-product-lang','');button.className='cmd-lang-toggle';button.setAttribute('aria-label','Switch language');
      button.innerHTML='<span>FR</span><i></i><span>EN</span>';
      button.addEventListener('click',()=>{lang=lang==='fr'?'en':'fr';localStorage.setItem('phoenix-lang',lang);apply();});
      actions.prepend(button);
    }
    actions?.querySelector('[data-syn-product-lang]')?.classList.toggle('en',lang==='en');
    applying=false;
  }

  const observer=new MutationObserver(()=>apply());
  observer.observe(document.documentElement,{subtree:true,childList:true});
  document.addEventListener('DOMContentLoaded',apply,{once:true});
  setTimeout(apply,0);setTimeout(apply,250);setTimeout(apply,900);
})();