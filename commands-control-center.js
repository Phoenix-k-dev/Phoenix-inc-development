(() => {
  if (!document.body.classList.contains('v2-command-page')) return;

  const labels = {
    fr:{title:'Commandes Synapse',all:'Toutes'},
    en:{title:'Synapse Commands',all:'All'}
  };

  const lang=()=>document.documentElement.lang==='en'?'en':'fr';

  function build(){
    const toolbar=document.querySelector('.cmd-toolbar');
    const grid=document.querySelector('.cmd-grid');
    const filters=document.querySelector('[data-command-filters]');
    if(!toolbar||!grid||!filters||document.querySelector('.cmd-control-center'))return;

    const center=document.createElement('section');
    center.className='cmd-control-center';
    const side=document.createElement('aside');
    side.className='cmd-control-sidebar';
    side.innerHTML='<div class="cmd-control-brand"><small>SYNAPSE</small><strong data-control-title></strong></div><div class="cmd-control-nav" data-control-nav></div>';
    const main=document.createElement('div');
    main.className='cmd-control-main';

    toolbar.parentNode.insertBefore(center,toolbar);
    center.append(side,main);
    main.append(toolbar,grid);
    sync();
  }

  function sync(){
    const filters=[...document.querySelectorAll('[data-command-filters] button')];
    const nav=document.querySelector('[data-control-nav]');
    const title=document.querySelector('[data-control-title]');
    if(!nav||!filters.length)return;
    if(title)title.textContent=labels[lang()].title;
    nav.innerHTML='';
    filters.forEach((source,index)=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.classList.toggle('active',source.classList.contains('active'));
      const label=document.createElement('span');
      label.textContent=source.textContent;
      const count=document.createElement('span');
      const cat=source.dataset.cat;
      count.textContent=cat==='all'?document.querySelectorAll('.cmd-card').length:[...document.querySelectorAll('.cmd-card')].filter(card=>card.querySelector('.cmd-card-top span')?.textContent?.trim()===source.textContent.trim()).length;
      btn.append(label,count);
      btn.addEventListener('click',()=>{source.click();setTimeout(sync,0);});
      nav.appendChild(btn);
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(build,0),{once:true});else setTimeout(build,0);
  window.addEventListener('phoenix:langchange',()=>setTimeout(sync,0));
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-command-filters] button'))setTimeout(sync,0);});
  const observer=new MutationObserver(()=>{if(!document.querySelector('.cmd-control-center'))build();else sync();});
  if(document.body)observer.observe(document.body,{childList:true,subtree:true});
})();