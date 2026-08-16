(() => {
  if (!document.body.classList.contains('v2-command-page')) return;
  const labels={fr:{title:'Commandes Synapse',tip:'Astuce',tipText:'Utilisez /commandes dans Discord pour retrouver cette liste directement.'},en:{title:'Synapse Commands',tip:'Tip',tipText:'Use /commandes in Discord to open this list directly.'}};
  const lang=()=>document.documentElement.lang==='en'?'en':'fr';

  function build(){
    const hero=document.querySelector('.cmd-hero');
    const toolbar=document.querySelector('.cmd-toolbar');
    const grid=document.querySelector('.cmd-grid');
    const filters=document.querySelector('[data-command-filters]');
    if(!hero||!toolbar||!grid||!filters||document.querySelector('.cmd-control-center'))return;

    const center=document.createElement('section');center.className='cmd-control-center';
    const intro=document.createElement('aside');intro.className='cmd-control-intro';
    const nav=document.createElement('aside');nav.className='cmd-control-sidebar';nav.innerHTML='<div class="cmd-control-brand"><small>SYNAPSE</small><strong data-control-title></strong></div><div class="cmd-control-nav" data-control-nav></div><div class="cmd-control-tip"><small data-control-tip></small><p data-control-tip-text></p></div>';
    const main=document.createElement('div');main.className='cmd-control-main';

    hero.parentNode.insertBefore(center,hero);
    center.append(intro,nav,main);
    intro.appendChild(hero);
    main.append(toolbar,grid);
    sync();
  }

  function sync(){
    const filters=[...document.querySelectorAll('[data-command-filters] button')];
    const nav=document.querySelector('[data-control-nav]');
    const title=document.querySelector('[data-control-title]');
    const tip=document.querySelector('[data-control-tip]');
    const tipText=document.querySelector('[data-control-tip-text]');
    if(!nav||!filters.length)return;
    const t=labels[lang()];if(title)title.textContent=t.title;if(tip)tip.textContent=t.tip;if(tipText)tipText.textContent=t.tipText;
    nav.innerHTML='';
    filters.forEach(source=>{const btn=document.createElement('button');btn.type='button';btn.classList.toggle('active',source.classList.contains('active'));const label=document.createElement('span');label.textContent=source.textContent;const arrow=document.createElement('span');arrow.textContent='›';btn.append(label,arrow);btn.addEventListener('click',()=>{source.click();setTimeout(sync,0);});nav.appendChild(btn);});
  }

  const init=()=>{build();setTimeout(build,80);setTimeout(sync,160)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.addEventListener('phoenix:langchange',()=>setTimeout(sync,0));
  window.addEventListener('storage',e=>{if(e.key==='phoenix-lang')setTimeout(sync,0)});
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-command-filters] button'))setTimeout(sync,0)});
})();