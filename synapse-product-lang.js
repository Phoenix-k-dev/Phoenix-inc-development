(()=>{
  if(!document.body.classList.contains('synapse-saas-page'))return;

  if(!document.querySelector('[data-syn-product-lang-style]')){
    const style=document.createElement('style');
    style.setAttribute('data-syn-product-lang-style','');
    style.textContent='.syn-v2-actions .cmd-lang-toggle{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:#11151e;color:#fff;font:800 10px/1 Inter,sans-serif;cursor:pointer}.syn-v2-actions .cmd-lang-toggle i{position:relative;width:28px;height:16px;border-radius:999px;background:#2a3040}.syn-v2-actions .cmd-lang-toggle i:after{content:"";position:absolute;left:2px;top:2px;width:12px;height:12px;border-radius:50%;background:#8b6cff;transition:.2s}.syn-v2-actions .cmd-lang-toggle.en i:after{transform:translateX(12px);background:#42d8ff}';
    document.head.appendChild(style);
  }

  const labels={
    fr:{home:'Accueil',scripts:'Scripts',bots:'Bots',commands:'Commandes',services:'Web · Apps · Autres',all:'Voir toutes les commandes →',explore:'Explorer toutes les commandes →',view:'Voir les commandes →'},
    en:{home:'Home',scripts:'Scripts',bots:'Bots',commands:'Commands',services:'Web · Apps · More',all:'View all commands →',explore:'Explore all commands →',view:'View commands →'}
  };

  let lang=localStorage.getItem('phoenix-lang')==='en'?'en':'fr';

  function setText(el,value){
    if(el&&el.textContent!==value)el.textContent=value;
  }

  function apply(){
    const t=labels[lang];
    if(document.documentElement.lang!==lang)document.documentElement.lang=lang;

    const nav=document.querySelector('.syn-v2-nav');
    if(nav){
      const links=[...nav.querySelectorAll('a')];
      const find=(end)=>links.find(a=>(a.getAttribute('href')||'').endsWith(end));
      setText(find('index.html'),t.home);
      setText(find('scripts.html'),t.scripts);
      setText(find('bots.html'),t.bots);
      setText(find('synapse-commands.html'),t.commands);
      setText(find('services.html'),t.services);
    }

    document.querySelectorAll('a[href="synapse-commands.html"]').forEach(a=>{
      const txt=(a.textContent||'').trim().toLowerCase();
      if(txt.includes('explorer')||txt.includes('explore'))setText(a,t.explore);
      else if(txt.includes('toutes')||txt.includes('all commands'))setText(a,t.all);
      else if(txt.includes('voir les commandes')||txt.includes('view commands'))setText(a,t.view);
      else if(a.closest('.syn-v2-nav'))setText(a,t.commands);
    });

    const actions=document.querySelector('.syn-v2-actions');
    if(actions&&!actions.querySelector('[data-syn-product-lang]')){
      const button=document.createElement('button');
      button.type='button';
      button.setAttribute('data-syn-product-lang','');
      button.className='cmd-lang-toggle';
      button.setAttribute('aria-label','Switch language');
      button.innerHTML='<span>FR</span><i></i><span>EN</span>';
      button.addEventListener('click',()=>{
        lang=lang==='fr'?'en':'fr';
        localStorage.setItem('phoenix-lang',lang);
        apply();
      });
      actions.prepend(button);
    }
    actions?.querySelector('[data-syn-product-lang]')?.classList.toggle('en',lang==='en');
  }

  // Important: no subtree MutationObserver here. The old observer reacted to
  // the text changes made by apply() itself and could create an endless render loop.
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  setTimeout(apply,100);
})();