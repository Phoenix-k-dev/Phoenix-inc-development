(() => {
  if(!document.body.classList.contains('synapse-saas-page'))return;
  const map={
    '/analyse_serveur':'/scan',
    '/analyze_server':'/scan',
    '/tickets remplacer':'/ticket setup',
    '/tickets replace':'/ticket setup',
    '/generate_sync_code':'/interserver code',
    '/generer_code':'/interserver code',
    '/aide_synapse':'/commandes'
  };
  function apply(){document.querySelectorAll('code').forEach(code=>{const current=(code.textContent||'').trim();if(map[current])code.textContent=map[current];});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0),{once:true});else setTimeout(apply,0);
  window.addEventListener('phoenix:langchange',()=>setTimeout(apply,0));setTimeout(apply,180);
})();