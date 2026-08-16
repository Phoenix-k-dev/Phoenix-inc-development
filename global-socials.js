(() => {
  const cfg=window.PHOENIX_CONFIG||{};
  const kofi=cfg.kofiUrl||'https://ko-fi.com/phoenix_dev';
  const svg={
    discord:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 5.3A16.7 16.7 0 0 0 15.4 4l-.5 1.1a15.2 15.2 0 0 0-5.8 0L8.6 4a16.9 16.9 0 0 0-4.1 1.3C1.9 9.1 1.2 12.8 1.6 16.4a16.8 16.8 0 0 0 5 2.5l1.2-1.6a10.5 10.5 0 0 1-1.9-.9l.5-.4c3.7 1.7 7.6 1.7 11.2 0l.6.4a12 12 0 0 1-1.9.9l1.2 1.6a16.8 16.8 0 0 0 5-2.5c.5-4.2-.8-7.8-3-11.1ZM8.7 14.2c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.6 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z"/></svg>',
    youtube:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg>',
    kofi:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h12.2c1.3 0 2.3 1 2.3 2.3v.9H20c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1.9A6.6 6.6 0 0 1 12 19H8a6 6 0 0 1-6-6V7.5a2 2 0 0 1 2-2Zm14.5 5.1v2.3H20a1.15 1.15 0 1 0 0-2.3h-1.5ZM7.1 9.2c-1 0-1.8.8-1.8 1.8 0 2.2 3.7 4.4 3.7 4.4s3.7-2.2 3.7-4.4a1.8 1.8 0 0 0-3.2-1.1A1.8 1.8 0 0 0 7.1 9.2Z"/></svg>'
  };
  const makeLink=(kind,url,label)=>{
    const content=kind==='tebex'?'<span class="phx-tebex-social-mark">T</span>':svg[kind];
    return `<a class="phx-social phx-social-${kind}" ${url?`href="${url}" target="_blank" rel="noopener"`:'aria-disabled="true"'} aria-label="${label}" title="${url?label:label+' — bientôt'}">${content}</a>`;
  };
  const lang=()=>document.documentElement.lang==='en'?'en':'fr';
  const copy={fr:{desc:'Scripts FiveM, bots Discord, web, applications et développement sur mesure.',services:'Web · Apps · Autres',support:'Soutenir Phoenix Inc',supportText:'Si nos outils vous aident, vous pouvez soutenir leur développement.',donate:'Faire un don sur Ko-fi',note:'Conçu pour évoluer avec les projets.'},en:{desc:'FiveM scripts, Discord bots, web, applications and custom development.',services:'Web · Apps · More',support:'Support Phoenix Inc',supportText:'If our tools help you, you can support their development.',donate:'Support us on Ko-fi',note:'Built to evolve with every project.'}};

  function header(){document.querySelectorAll('.v2-header-actions').forEach(actions=>{
    const discord=actions.querySelector('.v2-icon-link[href*="discord"],a[data-config-link="discordUrl"]');
    if(discord){discord.classList.add('phx-header-discord');discord.innerHTML=`${svg.discord}<span>Discord</span>`;discord.setAttribute('aria-label','Discord');}
    let tebex=actions.querySelector('[data-global-tebex]');
    if(!tebex){tebex=document.createElement('a');tebex.className='phx-header-tebex';tebex.dataset.globalTebex='';if(discord)discord.insertAdjacentElement('afterend',tebex);else actions.prepend(tebex);}
    tebex.innerHTML='<span class="phx-tebex-mark">T</span><span>Tebex</span>';
    if(cfg.tebexUrl){tebex.href=cfg.tebexUrl;tebex.target='_blank';tebex.rel='noopener';tebex.removeAttribute('aria-disabled');}else{tebex.removeAttribute('href');tebex.setAttribute('aria-disabled','true');tebex.title='Tebex — bientôt';}
  });}

  function footer(){const t=copy[lang()];document.querySelectorAll('.v2-footer').forEach(footer=>{
    footer.innerHTML=`<div class="v2-footer-main phx-footer-layout"><div class="phx-footer-brandcol"><a class="v2-brand" href="index.html" aria-label="Phoenix Inc | Development"><img src="./assets/logo-phoenix-ph.png" alt=""><span><b>Phoenix Inc |</b><small>Development</small></span></a><p>${t.desc}</p></div><div class="phx-footer-navcol"><div class="v2-footer-links"><a href="scripts.html">Scripts</a><a href="bots.html">Bots</a><a href="services.html">${t.services}</a><a href="${cfg.discordUrl||'#'}" target="_blank" rel="noopener">Discord</a><a href="${cfg.githubUrl||'#'}" target="_blank" rel="noopener">GitHub</a><a ${cfg.tebexUrl?`href="${cfg.tebexUrl}" target="_blank" rel="noopener"`:'aria-disabled="true"'}>Tebex</a></div><div class="phx-footer-socials" data-global-socials>${makeLink('discord',cfg.discordUrl,'Discord')}${makeLink('youtube',cfg.youtubeUrl,'YouTube')}${makeLink('tebex',cfg.tebexUrl,'Tebex')}${makeLink('kofi',kofi,'Ko-fi')}</div></div><div class="phx-support-card" data-kofi-support><div class="phx-support-cup" aria-hidden="true">${svg.kofi}</div><div class="phx-support-copy"><strong>${t.support}</strong><span>${t.supportText}</span><a href="${kofi}" target="_blank" rel="noopener"><i>${svg.kofi}</i>${t.donate} ↗</a></div></div></div><div class="v2-footer-bottom"><span>© 2026 Phoenix Inc | Development</span><span>${t.note}</span></div>`;
    window.dispatchEvent(new CustomEvent('phoenix:footerready'));
  });}
  function render(){header();footer();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
  window.addEventListener('phoenix:langchange',()=>{header();footer();});
})();