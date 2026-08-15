(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;
  const run=()=>{
    const old=document.querySelector('.syn-v2-workflow-real');
    if(!old||old.dataset.adaptiveReady) return;
    old.dataset.adaptiveReady='1';
    old.innerHTML=`
      <div class="syn-adapt-head">
        <div><small>SYNAPSE / ADAPTIVE SETUP</small><h2>Votre serveur existe déjà ?<br><span>Syn