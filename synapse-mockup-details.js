(() => {
  if(!document.body.classList.contains('synapse-saas-page'))return;
  const copy={
    fr:['20 templates','FR / EN','Ticket Studio','Premium en option'],
    en:['20 templates','FR / EN','Ticket Studio','Optional Premium']
  };
  const lang=()=>document.documentElement.lang==='en'?'en':'fr';
  function render(){
    const hero=document.querySelector('.syn-v2-copy');if(!hero)return;
    const free=hero.querySelector('.syn-v2-free-entry');
    if(free&&!free.querySelector('.syn-free-crown')){const crown=document.createElement('span');crown.className='syn-free-crown';crown.textContent='♛';free.prepend(crown);}
    let stats=hero.querySelector('[data-syn-micro-stats]');
    if(!stats){stats=document.createElement('div');stats.className='syn-micro-stats';stats.dataset.synMicroStats='';const actions=hero.querySelector('.syn-v2-hero-actions');if(actions)actions.insertAdjacentElement('beforebegin',stats);else hero.appendChild(stats);}
    stats.innerHTML=copy[lang()].map((item,i)=>`<span><i>${String(i+1).padStart(2,'0')}</i>${item}</span>`).join('');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
  window.addEventListener('phoenix:langchange',render);
})();