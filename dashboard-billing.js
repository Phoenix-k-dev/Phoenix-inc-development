(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const config=window.PHOENIX_CONFIG||{};
  let checkout=null;

  const getGuildId=()=>sessionStorage.getItem('synapse-guild-id')||'demo-guild';

  const ensureModal=()=>{
    let modal=$('[data-billing-modal]');
    if(modal) return modal;
    modal=document.createElement('div');
    modal.className='syn-billing-modal';
    modal.dataset.billingModal='true';
    modal.hidden=true;
    modal.innerHTML=`
      <div class="syn-billing-backdrop" data-close-billing></div>
      <section class="syn-billing-sheet" role="dialog" aria-modal="true" aria-label="Synapse Premium">
        <button class="syn-billing-close" type="button" data-close-billing>×</button>
        <div class="syn-billing-summary">
          <span class="v2-kicker">SYNAPSE PREMIUM</span>
          <h2>Activez Premium<br>sans quitter Synapse.</h2>
          <p>Le paiement reste intégré dans le Dashboard. Les données bancaires sont saisies dans le composant sécurisé Stripe et ne transitent pas par Phoenix Inc | Development.</p>
          <div class="syn-billing-price"><strong>5 €</strong><span>/ mois · / serveur</span></div>
          <div class="syn-billing-benefits"><span>AutoMod avancé</span><span>Anti-Raid</span><span>Backups</span><span>Automatisations</span><span>Modules Premium</span><span>Sans engagement</span></div>
          <div class="syn-billing-server"><small>SERVEUR</small><b data-checkout-server>Serveur sélectionné</b></div>
        </div>
        <div class="syn-billing-checkout">
          <div class="syn-billing-state" data-billing-state>
            <span class="syn-billing-state-icon">◆</span>
            <h3>Paiement intégré prêt.</h3>
            <p>Le formulaire Stripe apparaîtra ici dès que le backend Synapse sera accessible en HTTPS.</p>
            <small>Aucune redirection vers une page Stripe externe ne sera nécessaire.</small>
          </div>
          <div id="synapse-embedded-checkout" data-embedded-checkout hidden></div>
        </div>
      </section>`;
    document.body.appendChild(modal);
    $$('[data-close-billing]',modal).forEach(el=>el.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
    return modal;
  };

  const loadStripeJs=()=>new Promise((resolve,reject)=>{
    if(window.Stripe) return resolve(window.Stripe);
    const existing=document.querySelector('script[src="https://js.stripe.com/v3/"]');
    if(existing){existing.addEventListener('load',()=>resolve(window.Stripe),{once:true});existing.addEventListener('error',reject,{once:true});return;}
    const script=document.createElement('script');script.src='https://js.stripe.com/v3/';script.async=true;script.onload=()=>resolve(window.Stripe);script.onerror=reject;document.head.appendChild(script);
  });

  const open=async()=>{
    const modal=ensureModal();modal.hidden=false;document.body.classList.add('syn-billing-open');
    const serverName=$('[data-server-name]')?.textContent?.trim()||'Serveur sélectionné';
    $('[data-checkout-server]',modal).textContent=serverName;
    const state=$('[data-billing-state]',modal), mount=$('[data-embedded-checkout]',modal);

    if(localStorage.getItem('synapse-dashboard-demo')==='1'){
      state.innerHTML='<span class="syn-billing-state-icon">DEMO</span><h3>Checkout intégré — mode démo</h3><p>Le vrai formulaire de carte apparaîtra ici lorsque l’API de facturation sera reliée. Le design et le parcours resteront identiques.</p><button class="v2-btn v2-btn-violet" type="button" data-demo-payment>Simuler un paiement réussi</button>';
      state.querySelector('[data-demo-payment]')?.addEventListener('click',()=>{state.innerHTML='<span class="syn-billing-success">✓</span><h3>Premium activé.</h3><p>Simulation terminée : dans la version réelle, le serveur passerait Premium après confirmation Stripe côté backend.</p>';});
      return;
    }

    if(!config.stripePublishableKey){
      state.innerHTML='<span class="syn-billing-state-icon">◆</span><h3>En attente du backend.</h3><p>Le checkout est déjà intégré au Dashboard. Il manque uniquement la clé publique Stripe et la route HTTPS qui crée la session d’abonnement.</p><small>On branchera ces deux éléments au moment du déploiement HytHost / domaine.</small>';
      return;
    }

    try{
      state.innerHTML='<span class="syn-billing-loader"></span><h3>Préparation du paiement…</h3><p>Création de la session sécurisée.</p>';
      const Stripe=await loadStripeJs();
      const stripe=Stripe(config.stripePublishableKey);
      if(checkout){try{checkout.destroy()}catch{} checkout=null;}
      checkout=await stripe.initEmbeddedCheckout({
        fetchClientSecret:async()=>{
          const res=await fetch(config.synapseCheckoutEndpoint||'/api/billing/checkout-session',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({guildId:getGuildId()})});
          const data=await res.json().catch(()=>({}));
          if(!res.ok||!data.clientSecret) throw new Error(data.message||'Impossible de créer la session de paiement.');
          return data.clientSecret;
        }
      });
      state.hidden=true;mount.hidden=false;checkout.mount('#synapse-embedded-checkout');
    }catch(err){
      state.hidden=false;mount.hidden=true;state.innerHTML=`<span class="syn-billing-error">!</span><h3>Paiement indisponible.</h3><p>${err.message||'Impossible de charger le checkout.'}</p><small>Le Dashboard reste fonctionnel. Réessayez lorsque le backend HTTPS est disponible.</small>`;
    }
  };

  const close=()=>{
    const modal=$('[data-billing-modal]');if(!modal)return;modal.hidden=true;document.body.classList.remove('syn-billing-open');
  };

  const bind=()=>{
    $$('[data-premium-upgrade]').forEach(el=>{
      if(el.dataset.embeddedBillingBound)return;el.dataset.embeddedBillingBound='1';
      el.removeAttribute('href');el.removeAttribute('target');
      el.addEventListener('click',e=>{e.preventDefault();open();});
    });
    $$('[data-billing-portal]').forEach(el=>{
      if(el.dataset.billingPortalBound)return;el.dataset.billingPortalBound='1';
      el.addEventListener('click',async()=>{
        if(localStorage.getItem('synapse-dashboard-demo')==='1') return alert('Mode démo : le portail Stripe sera ouvert ici dans la version hébergée.');
        try{
          const res=await fetch(config.synapseBillingPortalEndpoint||'/api/billing/portal',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({guildId:getGuildId()})});
          const data=await res.json(); if(!res.ok||!data.url) throw new Error(data.message||'Portail indisponible.'); location.href=data.url;
        }catch(err){alert(err.message||'Impossible d’ouvrir la facturation.');}
      });
    });
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
  new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});
})();