(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const run = () => {
    const old = document.querySelector('.syn-v2-workflow-real');
    if (!old || old.dataset.adaptiveReady) return;
    old.dataset.adaptiveReady = '1';

    old.innerHTML = `
      <div class="syn-adapt-head">
        <div>
          <small>SYNAPSE / ADAPTIVE SETUP</small>
          <h2>Votre serveur existe déjà ?<br><span>Synapse s’adapte à sa structure.</span></h2>
          <p>Pas besoin de repartir d’un template Phoenix. Synapse peut analyser les salons, catégories, rôles et permissions déjà présents, puis proposer uniquement ce qu’il manque.</p>
        </div>
        <div class="syn-adapt-badge"><i></i><span>ANALYSE NON DESTRUCTIVE</span></div>
      </div>

      <div class="syn-adapt-modes">
        <article><span>01</span><b>Créer un serveur complet</b><p>Partir d’un template Synapse et générer toute la structure.</p></article>
        <article class="active"><span>02</span><b>Compléter un serveur existant</b><p>Analyser ce qui existe déjà et proposer les éléments manquants.</p></article>
        <article><span>03</span><b>Installer un module seulement</b><p>Tickets, règlement, bienvenue, logs ou rôles sans toucher au reste.</p></article>
      </div>

      <div class="syn-adapt-workspace">
        <section class="syn-adapt-scan">
          <div class="syn-adapt-panel-title"><div><small>SERVEUR DÉTECTÉ</small><h3>Community Server</h3></div><span class="syn-adapt-status">ANALYSÉ</span></div>
          <div class="syn-adapt-summary">
            <article><strong>14</strong><span>salons</span></article>
            <article><strong>9</strong><span>rôles</span></article>
            <article><strong>4</strong><span>catégories</span></article>
            <article><strong>23</strong><span>permissions</span></article>
          </div>
          <div class="syn-adapt-detected">
            <div><i>✓</i><span><b># bienvenue</b><small>Salon d’accueil détecté</small></span><em>98%</em></div>
            <div><i>✓</i><span><b># règlement</b><small>Règlement détecté</small></span><em>99%</em></div>
            <div><i>✓</i><span><b>@Modérateur</b><small>Rôle staff détecté</small></span><em>96%</em></div>
            <div><i>?</i><span><b>Support</b><small>Aucun panel de tickets trouvé</small></span><em>À créer</em></div>
          </div>
        </section>

        <section class="syn-adapt-plan">
          <div class="syn-adapt-panel-title"><div><small>PLAN PROPOSÉ</small><h3>Compléter sans reconstruire</h3></div><button type="button">Tout vérifier</button></div>
          <div class="syn-adapt-actions">
            <article><div><span class="violet">TICKETS</span><h4>Créer un panel de support</h4><p>Utiliser la catégorie SUPPORT existante et le rôle @Modérateur détecté.</p></div><button type="button">Configurer</button></article>
            <article><div><span class="green">BIENVENUE</span><h4>Activer le message automatique</h4><p>Publier dans #bienvenue sans créer un nouveau salon.</p></div><button type="button">Configurer</button></article>
            <article><div><span class="orange">RÈGLEMENT</span><h4>Transformer le règlement en panel</h4><p>Conserver #règlement et ajouter uniquement les interactions choisies.</p></div><button type="button">Configurer</button></article>
          </div>
          <div class="syn-adapt-apply"><div><b>0 élément existant supprimé</b><span>Synapse n’applique que les changements validés.</span></div><button type="button">Appliquer le plan →</button></div>
        </section>
      </div>

      <div class="syn-adapt-bottom">
        <span><b>Créer</b> une structure complète</span>
        <span><b>Analyser</b> n’importe quelle template existante</span>
        <span><b>Ajouter</b> seulement le module voulu</span>
      </div>`;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
