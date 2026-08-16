(()=>{
  if(!document.body.classList.contains('v2-command-page'))return;

  const realNames={
    '/pro backup_create':'/pro backup_creer',
    '/pro backup_list':'/pro backup_liste',
    '/pro backup_restore':'/pro backup_restaurer',
    '/pro template_save':'/pro template_sauver',
    '/pro template_list':'/pro template_liste',
    '/pro template_apply':'/pro template_appliquer',
    '/pro blocked_word_add':'/pro mot_bloque_ajouter',
    '/pro blocked_word_remove':'/pro mot_bloque_retirer',
    '/pro custom_add':'/pro custom_ajouter',
    '/pro custom_remove':'/pro custom_retirer',
    '/pro automation_add':'/pro automation_ajouter',
    '/pro automation_list':'/pro automation_liste',
    '/pro automation_remove':'/pro automation_retirer'
  };

  function lang(){return document.documentElement.lang==='en'?'en':'fr';}
  function setText(el,value){if(el&&el.textContent!==value)el.textContent=value;}
  function setAttr(el,name,value){if(el&&el.getAttribute(name)!==value)el.setAttribute(name,value);}
  function accessLabel(kind){
    const en=lang()==='en';
    if(kind==='everyone')return en?'Everyone':'Tous';
    if(kind==='staff')return 'Staff';
    if(kind==='discordAdmin')return en?'Discord Admin':'Admin Discord';
    return en?'Managers':'Responsables';
  }

  function patchCard(card){
    const code=card.querySelector('code');
    if(!code)return;
    let value=(code.textContent||'').trim();

    if(['/aide_synapse','/synapse_help','/code_premium'].includes(value)){
      card.remove();
      return;
    }

    if(value==='/reinitialiser_salons'||value==='/reset_channels')value='/reset';
    if(realNames[value])value=realNames[value];
    setText(code,value);
    setAttr(card.querySelector('[data-copy]'),'data-copy',value);

    if(value==='/reset'){
      const text=lang()==='en'
        ?'Safely resets the Discord server while keeping one command channel.'
        :'Réinitialise proprement le Discord tout en conservant un salon pour les commandes.';
      setText(card.querySelector('p'),text);
    }

    if(value==='/pro status')setText(card.querySelector('footer span'),accessLabel('everyone'));
  }

  function shouldShowTicketColor(){
    const active=document.querySelector('[data-command-filters] button.active')?.dataset.cat||'all';
    if(active!=='all'&&active!=='tickets')return false;
    const query=(document.querySelector('[data-command-search]')?.value||'').trim().toLowerCase();
    if(!query)return true;
    const haystack=lang()==='en'
      ?'/ticket couleur tickets button color colour change existing button managers'
      :'/ticket couleur tickets bouton couleur changer existant responsables';
    return haystack.includes(query);
  }

  function ensureTicketColor(){
    const grid=document.querySelector('[data-command-grid]');
    if(!grid||!shouldShowTicketColor())return;
    if([...grid.querySelectorAll('code')].some(c=>(c.textContent||'').trim()==='/ticket couleur'))return;
    const en=lang()==='en';
    const card=document.createElement('article');
    card.className='cmd-card';
    card.dataset.synapseInjected='ticket-couleur';
    card.innerHTML=`<div class="cmd-card-top"><span>${en?'Tickets':'Ticket Studio'}</span></div><code>/ticket couleur</code><p>${en?'Changes the color of an existing Ticket Studio button.':'Change la couleur d’un bouton Ticket Studio existant.'}</p><footer><span>${accessLabel('managers')}</span><button type="button" data-copy="/ticket couleur">${en?'Copy':'Copier'}</button></footer>`;
    card.querySelector('[data-copy]')?.addEventListener('click',async e=>{
      try{
        await navigator.clipboard.writeText('/ticket couleur');
        const btn=e.currentTarget;
        setText(btn,en?'Copied ✓':'Copié ✓');
        setTimeout(()=>setText(btn,en?'Copy':'Copier'),1000);
      }catch{}
    });
    grid.appendChild(card);
  }

  function clean(){
    document.querySelectorAll('.cmd-card').forEach(patchCard);
    ensureTicketColor();
  }

  let scheduled=false;
  function scheduleClean(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;clean();});
  }

  const observer=new MutationObserver(mutations=>{
    if(mutations.some(m=>m.addedNodes.length||m.removedNodes.length))scheduleClean();
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',clean,{once:true});
  else clean();
  window.addEventListener('phoenix:langchange',scheduleClean);
  document.addEventListener('input',e=>{if(e.target?.matches?.('[data-command-search]'))scheduleClean();});
  document.addEventListener('click',e=>{if(e.target?.closest?.('[data-command-filters] button'))scheduleClean();});
})();