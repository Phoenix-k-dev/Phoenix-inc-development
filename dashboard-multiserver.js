(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const mount=()=>{
    const overview=document.querySelector('[data-panel="overview"]');
    const sidebar=document.querySelector('.syn-dash-sidebar');
    if(!overview||!sidebar||overview.querySelector('.syn-multi-server')) return;

    sidebar.querySelector('.syn-server-card')?.insertAdjacentHTML('afterend',`
      <button class="syn-add-server" type="button" data-add-server><span>＋</span><div><b>Ajouter un serveur</b><small>Installation Synapse illimitée</small></div></button>`);

    overview.insertAdjacentHTML('beforeend',`
      <section class="syn-multi-server">
        <div class="syn-pro-section-head"><div><h3>Mes serveurs Synapse</h3><p>Vous pouvez installer Synapse sur autant de serveurs que vous administrez. Certaines fonctions synchronisées ou avancées utilisent des emplacements Free limités à 3 serveurs ; Premium étend cette limite.</p></div><button class="v2-btn v2-btn-violet" type="button" data-add-server-main>Ajouter un serveur ↗</button></div>
        <div class="syn-server-quota"><div><span>FONCTIONS MULTI-SERVEURS / FREE</span><b>2 / 3 serveurs utilisés</b></div><i><em style="width:66%"></em></i><small>L’installation du bot reste disponible sur les autres serveurs ; seule la fonctionnalité concernée est limitée.</small></div>
        <div class="syn-server-grid">
          <article class="active"><div class="syn-server-icon"><img src="./assets/logo-phoenix-ph.png" alt=""></div><div><small>SERVEUR ACTUEL</small><h4>Serveur Démo</h4><p>Builder · Tickets · Modération</p></div><span>FREE</span><button>Gérer</button></article>
          <article><div class="syn-server-icon">RP</div><div><small>CONNECTÉ</small><h4>Synapse RP</h4><p>Tickets · Welcome · Logs</p></div><span>FREE</span><button>Gérer</button></article>
          <article class="empty"><div class="syn-server-icon">＋</div><div><small>EMPLACEMENT DISPONIBLE</small><h4>Ajouter un serveur</h4><p>Associer un autre Discord.</p></div><button data-add-server-card>Ajouter</button></article>
        </div>
      </section>`);

    const goInstall=()=>{const u=window.PHOENIX_CONFIG?.synapseInviteUrl;if(u)window.open(u,'_blank','noopener')};
    ['[data-add-server]','[data-add-server-main]','[data-add-server-card]'].forEach(s=>document.querySelector(s)?.addEventListener('click',goInstall));
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
