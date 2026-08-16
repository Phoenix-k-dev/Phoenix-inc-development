(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const config = window.PHOENIX_CONFIG || {};
  const store = config.synapseDiscordStoreUrl || '#';
  const copy = {
    fr: {
      eyebrow:'COMPARATIF DES PLANS',title:'Gratuit ou Premium ?',intro:'Synapse Free garde le cœur du bot. Premium ajoute les outils avancés de sauvegarde, protection, animation et automatisation.',free:'Gratuit',premium:'Premium',freeSub:'Pour construire et gérer',premiumSub:'Pour aller plus loin',badge:'3,99 € / mois / serveur',
      groups:[
        {title:'Builder & structure',rows:[['Builder complet','✓','✓','Templates, catégories, salons et rôles'],['Analyse du serveur','✓','✓','Structure, style et éléments existants'],['Rollback & reset','✓','✓','Retour arrière et remise à zéro contrôlée'],['Backups de structure','—','✓','Sauvegardes Premium'],['Restauration','—','✓','Recrée les éléments manquants'],['Templates personnels','—','✓','Enregistrez vos propres structures']]},
        {title:'Sécurité & modération',rows:[['AutoMod avancé','—','✓','Anti-spam, liens et mentions'],['Filtre de mots / expressions','—','✓','Liste personnalisable'],['Protection Anti-Raid','—','✓','Seuil et action configurables']]},
        {title:'Communauté',rows:[['Tickets standards','✓','✓','Installation, ouverture et fermeture'],['Annonces, règlement, avis & réputation','✓','✓','Modules communautaires essentiels'],['Levels & XP','—','✓','Niveaux et classement'],['Giveaways','—','✓','Participation et tirage automatique']]},
        {title:'Voix & automatisations',rows:[['Temp Voice','—','✓','Vocaux temporaires automatiques'],['Commandes personnalisées','—','✓','Réponses propres à votre serveur'],['Messages récurrents','—','✓','Automatisations planifiées']]},
        {title:'Réseau & accès',rows:[['Interserver','✓','✓','Codes, alias et salons reliés'],['Permissions Synapse','✓','✓','Public, Staff et Responsables'],['Activation Premium','—','Discord','Abonnement lié au serveur']]}
      ],ctaTitle:'Le Builder reste gratuit. Premium ajoute la puissance autour.',ctaSub:'Activation pour tout le serveur directement via Discord.',cta:'Passer Premium sur Discord ↗'
    },
    en: {
      eyebrow:'PLAN COMPARISON',title:'Free or Premium?',intro:'Synapse Free keeps the core bot experience. Premium adds advanced backup, protection, engagement and automation tools.',free:'Free',premium:'Premium',freeSub:'Build and manage',premiumSub:'Go further',badge:'€3.99 / month / server',
      groups:[
        {title:'Builder & structure',rows:[['Full Builder','✓','✓','Templates, categories, channels and roles'],['Server analysis','✓','✓','Structure, style and existing resources'],['Rollback & reset','✓','✓','Controlled rollback and reset'],['Structure backups','—','✓','Premium backups'],['Restore','—','✓','Recreates missing resources'],['Personal templates','—','✓','Save your own structures']]},
        {title:'Security & moderation',rows:[['Advanced AutoMod','—','✓','Anti-spam, links and mentions'],['Blocked words / phrases','—','✓','Custom filter list'],['Anti-Raid protection','—','✓','Configurable threshold and action']]},
        {title:'Community',rows:[['Standard tickets','✓','✓','Install, open and close'],['Announcements, rules, reviews & reputation','✓','✓','Core community modules'],['Levels & XP','—','✓','Levels and leaderboard'],['Giveaways','—','✓','Entry and automatic draw']]},
        {title:'Voice & automation',rows:[['Temp Voice','—','✓','Automatic temporary voice channels'],['Custom commands','—','✓','Server-specific responses'],['Recurring messages','—','✓','Scheduled automations']]},
        {title:'Network & access',rows:[['Interserver','✓','✓','Codes, aliases and linked channels'],['Synapse permissions','✓','✓','Public, Staff and Managers'],['Premium activation','—','Discord','Server-wide subscription']]}
      ],ctaTitle:'The Builder stays free. Premium adds power around it.',ctaSub:'Server-wide activation directly through Discord.',cta:'Get Premium on Discord ↗'
    }
  };

  const value=v=>v==='✓'?'<span class="yes">✓</span>':v==='—'?'<span class="no">×</span>':v==='Discord'?'<code>Discord</code>':`<span>${v}</span>`;
  function render(){
    const premiumSection=document.querySelector('.syn-v2-premium')?.closest('.syn-v2-section');
    if(!premiumSection)return;
    document.querySelector('[data-syn-plan-compare]')?.remove();
    const lang=localStorage.getItem('phoenix-lang')==='en'||document.documentElement.lang==='en'?'en':'fr';
    const t=copy[lang];
    const section=document.createElement('section');
    section.className='syn-v2-section syn-v2-shell';section.setAttribute('data-syn-plan-compare','');
    const groups=t.groups.map(group=>`<div class="syn-plan-group"><div class="syn-plan-group-title">${group.title}</div>${group.rows.map(([name,free,premium,note])=>`<div class="syn-plan-row"><div class="feature"><div><strong>${name}</strong><small>${note}</small></div></div><div class="value ${free==='—'?'muted':''}">${value(free)}</div><div class="value premium ${premium==='—'?'muted':''}">${value(premium)}</div></div>`).join('')}</div>`).join('');
    section.innerHTML=`<div class="syn-plan-compare"><div class="syn-plan-compare-head"><div class="intro"><small>${t.eyebrow}</small><strong>${t.title}</strong><span>${t.intro}</span></div><div class="syn-plan-col"><strong>${t.free}</strong><span>${t.freeSub}</span></div><div class="syn-plan-col premium"><strong>${t.premium}</strong><span>${t.premiumSub}</span><em>${t.badge}</em></div></div>${groups}<div class="syn-plan-compare-cta"><div><strong>${t.ctaTitle}</strong><span>${t.ctaSub}</span></div><a class="syn-v2-btn syn-v2-btn-primary" href="${store}" target="_blank" rel="noopener">${t.cta}</a></div></div>`;
    premiumSection.insertAdjacentElement('afterend',section);
  }
  window.addEventListener('phoenix:langchange',render);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();