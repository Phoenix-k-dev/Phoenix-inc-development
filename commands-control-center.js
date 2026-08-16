(() => {
  if (!document.body.classList.contains('v2-command-page')) return;

  const labels = {
    fr:{title:'Commandes Synapse'},
    en:{title:'Synapse Commands'}
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
    filters.forEach(source=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.classList.toggle('active',source.classList.contains('active'));
      const label=document.createElement('span');
      label.textContent=source.textContent;
      const arrow=document.createElement('span');
      arrow.textContent='›';
      btn.append(label,arrow);
      btn.addEventListener('click',()=>{source.click();setTimeout(sync,0);});
      nav.appendChild(btn);
    });
  }

  const init=()=>{build();setTimeout(build,80);setTimeout(sync,160);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.addEventListener('phoenix:langchange',()=>setTimeout(sync,0));
  window.addEventListener('storage',e=>{if(e.key==='phoenix-lang')setTimeout(sync,0);});
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-command-filters] button'))setTimeout(sync,0);});
})();