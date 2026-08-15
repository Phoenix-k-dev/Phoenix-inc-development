(()=>{
  if(!document.body.classList.contains('v2-command-page'))return;

  function clean(){
    document.querySelectorAll('.cmd-card').forEach(card=>{
      const code=card.querySelector('code');
      const value=(code?.textContent||'').trim();
      if(value==='/aide_synapse'||value==='/synapse_help'){
        card.remove();
        return;
      }
      if(value==='/reinitialiser_salons'||value==='/reset_channels'){
        if(code)code.textContent='/reset';
        const copy=card.querySelector('[data-copy]');
        if(copy)copy.setAttribute('data-copy','/reset');
        const p=card.querySelector('p');
        if(p){
          const lang=document.documentElement.lang==='en'?'en':'fr';
          p.textContent=lang==='en'
            ?'Backs up then deletes every channel and category after confirmation. Roles are kept.'
            :'Sauvegarde puis supprime tous les salons et catégories après confirmation. Les rôles restent.';
        }
      }
    });
  }

  const observer=new MutationObserver(clean);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  document.addEventListener('DOMContentLoaded',clean,{once:true});
  setTimeout(clean,0);setTimeout(clean,250);
})();