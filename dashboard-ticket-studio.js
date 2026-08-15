(() => {
  if (!document.body.classList.contains('v2-dashboard-page')) return;
  const mount=()=>{
    const tickets=document.querySelector('[data-panel="tickets"]');
    if(!tickets||tickets.querySelector('.syn-ticket-studio')) return;
    tickets.insertAdjacentHTML('beforeend',`
      <section class="syn-ticket-studio">
        <div class="syn-pro-section-head"><div><h3>Éditeur complet du panel</h3><p>Construisez le message de tickets comme vous le voulez : salon, texte, boutons, formulaires, staff, comportement et fermeture.</p></div><span class="syn-studio-live">APERÇU EN DIRECT</span></div>
        <div class="syn-ticket-studio-grid">
          <div class="syn-ticket-controls">
            <div class="syn-ticket-block"><small>DESTINATION</small><label>Salon du panel<select><option># ouvrir-un-ticket</option><option># support</option><option># aide</option></select></label><label>Catégorie des tickets<select><option>SUPPORT</option><option>ACHATS</option><option>BUGS</option></select></label></div>
            <div class="syn-ticket-block"><small>MESSAGE</small><label>Titre<input value="Besoin d’aide ?"></label><label>Description<textarea rows="4">Choisissez le type de demande correspondant à votre besoin.</textarea></label><label>Couleur de l’embed<input type="color" value="#8b6cff"></label></div>
            <div class="syn-ticket-block"><div class="syn-ticket-block-head"><small>BOUTONS</small><button type="button" data-add-ticket-button>+ Ajouter un bouton</button></div><div class="syn-ticket-button-list" data-ticket-button-list></div></div>
            <div class="syn-ticket-block"><small>FORMULAIRE À L’OUVERTURE</small><div class="syn-ticket-form-fields" data-ticket-form-fields><article><span><b>Sujet</b><small>Réponse courte · obligatoire</small></span><button>Modifier</button></article><article><span><b>Description du problème</b><small>Paragraphe · obligatoire</small></span><button>Modifier</button></article></div><button class="syn-pro-add" type="button">+ Ajouter une question</button></div>
            <div class="syn-ticket-block"><small>STAFF & PERMISSIONS</small><div class="syn-pro-fields"><label class="syn-pro-field"><span>Rôles pouvant voir le ticket</span><input value="@Support, @Modérateur"></label><label class="syn-pro-field"><span>Rôle pouvant claim</span><input value="@Support"></label><label class="syn-pro-field"><span>Rôle superviseur</span><input value="@Administrateur"></label><label class="syn-pro-field"><span>Mention à l’ouverture</span><select><option>@Support</option><option>Aucune</option><option>@Modérateur</option></select></label></div></div>
            <div class="syn-ticket-block"><small>WORKFLOW</small><div class="syn-pro-toggle-grid"><label class="syn-pro-toggle"><span><b>Claim</b><small>Un membre du staff prend officiellement le ticket.</small></span><input type="checkbox" checked><i></i></label><label class="syn-pro-toggle"><span><b>Réouverture</b><small>Le ticket peut être rouvert après fermeture.</small></span><input type="checkbox" checked><i></i></label><label class="syn-pro-toggle"><span><b>Transcript</b><small>Archive automatique à la fermeture.</small></span><input type="checkbox" checked><i></i></label><label class="syn-pro-toggle"><span><b>Notation support</b><small>Demander une note après résolution.</small></span><input type="checkbox"><i></i></label></div></div>
            <div class="syn-ticket-block"><small>FERMETURE</small><div class="syn-pro-fields"><label class="syn-pro-field"><span>Message de fermeture</span><input value="Votre ticket a été fermé. Merci !"></label><label class="syn-pro-field"><span>Suppression du salon</span><select><option>Après 24 heures</option><option>Après 1 heure</option><option>Immédiatement</option><option>Jamais</option></select></label><label class="syn-pro-field"><span>Salon des transcripts</span><select><option># transcripts</option><option># logs-support</option></select></label><label class="syn-pro-field"><span>DM au créateur</span><select><option>Transcript + résumé</option><option>Transcript uniquement</option><option>Désactivé</option></select></label></div></div>
          </div>
          <aside class="syn-ticket-preview">
            <div class="syn-ticket-preview-top"><span># ouvrir-un-ticket</span><em>Synapse</em></div>
            <div class="syn-ticket-embed"><i></i><div><b>Besoin d’aide ?</b><p>Choisissez le type de demande correspondant à votre besoin.</p><div class="syn-ticket-preview-buttons" data-ticket-preview-buttons></div><small>Synapse Support</small></div></div>
            <div class="syn-ticket-preview-note"><b>Quand un utilisateur clique :</b><span>Formulaire → création du salon → permissions staff → claim → transcript à la fermeture.</span></div>
          </aside>
        </div>
        <div class="syn-ticket-save"><span>Les modifications ne touchent pas aux autres panels.</span><button class="v2-btn v2-btn-violet" type="button">Enregistrer ce panel</button></div>
      </section>`);

    const list=tickets.querySelector('[data-ticket-button-list]');
    const preview=tickets.querySelector('[data-ticket-preview-buttons]');
    const seed=[['Support','💬','#8b6cff'],['Achat','💳','#59e3ad'],['Bug','🛠️','#ff6b2c']];
    const render=()=>{
      const items=[...list.querySelectorAll('article')];
      preview.innerHTML=items.map(x=>`<button style="--ticket-color:${x.dataset.color}">${x.dataset.emoji} ${x.dataset.label}</button>`).join('');
    };
    const add=(label='Nouveau',emoji='🎫',color='#8b6cff')=>{
      const a=document.createElement('article'); a.dataset.label=label;a.dataset.emoji=emoji;a.dataset.color=color;
      a.innerHTML=`<div class="syn-ticket-button-edit"><input value="${emoji}" aria-label="Emoji"><input value="${label}" aria-label="Texte du bouton"><input type="color" value="${color}" aria-label="Couleur"><select aria-label="Action"><option>Créer un ticket</option><option>Ouvrir un formulaire</option></select></div><button type="button" data-remove>Supprimer</button>`;
      const [emo,lab,col]=a.querySelectorAll('input'); emo.addEventListener('input',()=>{a.dataset.emoji=emo.value;render()});lab.addEventListener('input',()=>{a.dataset.label=lab.value;render()});col.addEventListener('input',()=>{a.dataset.color=col.value;render()});a.querySelector('[data-remove]').addEventListener('click',()=>{a.remove();render()});list.appendChild(a);
    };
    seed.forEach(x=>add(...x)); render();
    tickets.querySelector('[data-add-ticket-button]')?.addEventListener('click',()=>{add();render()});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
