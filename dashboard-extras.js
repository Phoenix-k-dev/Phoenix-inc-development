(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const DEMO_KEY='synapse-dashboard-demo';
  let demo=localStorage.getItem(DEMO_KEY)==='1';

  const logoFallback=()=>{
    const avatar=$('[data-server-avatar]');
    if(!avatar) return;
    if(!avatar.querySelector('img')){
      avatar.innerHTML='<img src="./assets/logo-phoenix-ph.png" alt="Synapse">';
      avatar.classList.add('syn-server-avatar-logo');
    }
  };

  const setDemoBanner=()=>{
    if($('.syn-demo-banner')) return;
    const banner=document.createElement('div');
    banner.className='syn-demo-banner';
    banner.innerHTML='<b>MODE DÉMO</b><span>Aucune modification n’est envoyée à Discord.</span><button type="button" data-exit-demo>Quitter la démo</button>';
    document.body.prepend(banner);
    $('[data-exit-demo]')?.addEventListener('click',()=>{localStorage.removeItem(DEMO_KEY);sessionStorage.removeItem('synapse-guild-id');location.reload();});
  };

  const seedDemo=()=>{
    demo=true; localStorage.setItem(DEMO_KEY,'1'); setDemoBanner();
    $('[data-auth-gate]') && ($('[data-auth-gate]').hidden=true);
    $('[data-guild-picker]') && ($('[data-guild-picker]').hidden=true);
    $('[data-dashboard-app]') && ($('[data-dashboard-app]').hidden=false);
    const user=$('[data-dash-user]'); if(user) user.innerHTML='<div class="syn-user-avatar"><span>PK</span></div><div><b>Phoenix_Ktv</b><small>Mode démo local</small></div>';
    $('[data-server-name]') && ($('[data-server-name]').textContent='Serveur Démo');
    $('[data-server-plan]') && ($('[data-server-plan]').textContent='FREE');
    $('[data-stat-channels]') && ($('[data-stat-channels]').textContent='14');
    $('[data-stat-roles]') && ($('[data-stat-roles]').textContent='9');
    $('[data-stat-tickets]') && ($('[data-stat-tickets]').textContent='ON');
    $('[data-stat-plan]') && ($('[data-stat-plan]').textContent='FREE');
    logoFallback();

    const channels=$('[data-channel-list]'); if(channels) channels.innerHTML=[['ACCUEIL','Catégorie'],['# bienvenue','Texte'],['# règlement','Texte'],['COMMUNAUTÉ','Catégorie'],['# général','Texte'],['# médias','Texte'],['SUPPORT','Catégorie'],['# tickets','Texte']].map(([n,t])=>`<div class="syn-list-row"><div><b>${n}</b><small>${t}</small></div><button type="button">MODIFIER</button></div>`).join('');
    const roles=$('[data-role-list]'); if(roles) roles.innerHTML=['Administrateur','Modérateur','Support','Membre','Notifications'].map(n=>`<div class="syn-list-row"><div><b>${n}</b><small>RÔLE</small></div><button type="button">MODIFIER</button></div>`).join('');

    $('[data-ticket-enabled]') && ($('[data-ticket-enabled]').checked=true);
    $('[data-ticket-title]') && ($('[data-ticket-title]').value='Support');
    $('[data-ticket-category]') && ($('[data-ticket-category]').value='SUPPORT');
    $('[data-ticket-role]') && ($('[data-ticket-role]').value='Support');
    $('[data-ticket-transcripts]') && ($('[data-ticket-transcripts]').value='#transcripts');
    $('[data-ticket-message]') && ($('[data-ticket-message]').value='Besoin d’aide ? Ouvrez un ticket et notre équipe vous répondra.');
    $('[data-mod="logs"]') && ($('[data-mod="logs"]').checked=true);
    $('[data-mod="antiSpam"]') && ($('[data-mod="antiSpam"]').checked=true);
    $('[data-community-welcome-channel]') && ($('[data-community-welcome-channel]').value='#bienvenue');
    $('[data-community-role]') && ($('[data-community-role]').value='Membre');
    $('[data-community-welcome-message]') && ($('[data-community-welcome-message]').value='Bienvenue {user} sur {server} !');
    $('[data-community="welcome"]') && ($('[data-community="welcome"]').checked=true);
    $('[data-community="suggestions"]') && ($('[data-community="suggestions"]').checked=true);
    $('[data-community="roles"]') && ($('[data-community="roles"]').checked=true);
  };

  const injectDemoButton=()=>{
    const actions=$('.syn-auth-actions'); if(!actions || actions.querySelector('[data-dashboard-demo]')) return;
    const btn=document.createElement('button'); btn.type='button'; btn.className='v2-btn v2-btn-ghost syn-demo-btn'; btn.dataset.dashboardDemo='true'; btn.textContent='Tester le Dashboard en démo →';
    btn.addEventListener('click',seedDemo); actions.appendChild(btn);
  };

  const injectPromo=()=>{
    const billing=$('.syn-billing-grid'); if(!billing || $('.syn-promo-card')) return;
    const card=document.createElement('article'); card.className='syn-billing-card syn-promo-card';
    card.innerHTML=`<small>CODE PREMIUM</small><h3>Vous avez un code ?</h3><p>Les codes Synapse sont uniques et liés au serveur sélectionné après activation. Ils peuvent offrir une durée limitée ou un accès Premium à vie.</p><div class="syn-promo-form"><input type="text" maxlength="48" autocomplete="off" placeholder="Ex. PHX-XXXX-XXXX" data-promo-code><button class="v2-btn v2-btn-violet" type="button" data-redeem-promo>Activer le code</button></div><div class="syn-promo-status" data-promo-status></div><div class="syn-promo-help"><span>Usage unique</span><span>Lié au serveur</span><span>Durée ou à vie</span></div>`;
    billing.appendChild(card);
    $('[data-redeem-promo]')?.addEventListener('click',redeemPromo);
  };

  const redeemPromo=async()=>{
    const input=$('[data-promo-code]'); const status=$('[data-promo-status]'); const code=(input?.value||'').trim().toUpperCase();
    if(!code){status.textContent='Entre un code Premium.';status.dataset.state='error';return;}
    if(demo){
      if(code==='DEMO-LIFETIME'){
        status.textContent='Code démo accepté : Premium À VIE activé sur Serveur Démo.'; status.dataset.state='success';
        $('[data-server-plan]') && ($('[data-server-plan]').textContent='PREMIUM À VIE'); $('[data-stat-plan]') && ($('[data-stat-plan]').textContent='PREMIUM'); $('[data-plan-badge]') && ($('[data-plan-badge]').textContent='PREMIUM À VIE'); $('[data-billing-title]') && ($('[data-billing-title]').textContent='Synapse Premium — À vie'); $('[data-billing-status]') && ($('[data-billing-status]').textContent='LIFETIME'); $('[data-billing-renewal]') && ($('[data-billing-renewal]').textContent='Aucun');
      }else{status.textContent='En démo, utilise DEMO-LIFETIME pour tester l’activation.';status.dataset.state='error';}
      return;
    }
    const guildId=sessionStorage.getItem('synapse-guild-id');
    if(!guildId){status.textContent='Choisis d’abord un serveur.';status.dataset.state='error';return;}
    status.textContent='Vérification du code…';status.dataset.state='pending';
    try{
      const res=await fetch(`/api/guilds/${encodeURIComponent(guildId)}/promo/redeem`,{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})});
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.message||'Code invalide ou déjà utilisé.');
      status.textContent=data.lifetime?'Premium À VIE activé sur ce serveur.':`Premium activé${data.expiresAt?` jusqu’au ${new Date(data.expiresAt).toLocaleDateString('fr-FR')}`:''}.`;
      status.dataset.state='success'; setTimeout(()=>location.reload(),1200);
    }catch(e){status.textContent=e.message||'Impossible d’activer le code.';status.dataset.state='error';}
  };

  const demoSaveFeedback=()=>{
    if(!demo) return;
    $$('[data-save-module],[data-apply-builder]').forEach(btn=>{
      if(btn.dataset.demoBound) return; btn.dataset.demoBound='1';
      btn.addEventListener('click',ev=>{ev.stopImmediatePropagation();const old=btn.textContent;btn.textContent='Enregistré en démo ✓';setTimeout(()=>btn.textContent=old,1400);},true);
    });
  };

  const enhance=()=>{injectDemoButton();injectPromo();logoFallback();if(demo){seedDemo();demoSaveFeedback();}};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',enhance,{once:true}); else enhance();
  const obs=new MutationObserver(()=>{injectDemoButton();injectPromo();logoFallback();demoSaveFeedback();}); obs.observe(document.body,{childList:true,subtree:true});
})();
