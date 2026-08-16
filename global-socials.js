(() => {
  const cfg=window.PHOENIX_CONFIG||{};
  const kofi=cfg.kofiUrl||'https://ko-fi.com/phoenix_dev';
  const svg={
    discord:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 5.3A16.7 16.7 0 0 0 15.4 4l-.5 1.1a15.2 15.2 0 0 0-5.8 0L8.6 4a16.9 16.9 0 0 0-4.1 1.3C1.9 9.1 1.2 12.8 1.6 16.4a16.8 16.8 0 0 0 5 2.5l1.2-1.6a10.5 10.5 0 0 1-1.9-.9l.5-.4c3.7 1.7 7.6 1.7 11.2 0l.6.4a12 12 0 0 1-1.9.9l1.2 1.6a16.8 16.8 0 0 0 5-2.5c.5-4.2-.8-7.8-3-11.1ZM8.7 14.2c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.6 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z"/></svg>',
    youtube:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg>',
    kofi:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h12.2c1.3 0 2.3 1 2.3 2.3v.9H20c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1.9A6.6 6.6 0 0 1 12 19H8a6 6 0 0 1-6-6V7.5a2 2 0 0 1 2-2Zm14.5 5.1v2.3H20a1.15 1.15 0 1 0 0-2.3h-1.5ZM7.1 9.2c-1 0-1.8.8-1.8 1.8 0 2.2 3.7 4.4 3.7 4.4s3.7-2.2 3.7-4.4a1.8 1.8 0 0 0-3.2-1.1A1.8 1.8 0 0 0 7.1 9.2Z"/></svg>'
  };
  const makeLink=(kind,url,label)=>{const a=document.createElement('a');a.className=`phx-social phx-social-${kind}`;a.setAttribute('aria-label',label);a.title=label;if(url){a.href=url;a.target='_blank';a.rel='noopener';}else{a.setAttribute('aria-disabled','true');a.title=`${label} — bientôt`;}a.innerHTML=kind==='tebex'?'<span>T</span>':svg[kind];return a;};
  function header(){document.querySelectorAll('.v2-header-actions').forEach(actions=>{if(actions.querySelector('[data-global-tebex]'))return;const discord=actions.querySelector('.v2-icon-link[href*="discord"],a[data-config-link="discordUrl"]');const a=document.createElement('a');a.className='phx-header-tebex';a.dataset.globalTebex='';a.textContent='Tebex ↗';if(cfg.tebexUrl){a.href=cfg.tebexUrl;a.target='_blank';a.rel='noopener';}else{a.setAttribute('aria-disabled','true');a.title='Tebex — bientôt';}if(discord)discord.insertAdjacentElement('afterend',a);else actions.prepend(a);});}
  function footer(){document.querySelectorAll('.v2-footer').forEach(footer=>{const main=footer.querySelector('.v2-footer-main');const links=footer.querySelector('.v2-footer-links');if(!main||!links)return;
    let tools=main.querySelector('[data-footer-tools]');
    if(!tools){tools=document.createElement('div');tools.className='phx-footer-tools';tools.dataset.footerTools='';links.replaceWith(tools);tools.appendChild(links);}
    if(!tools.querySelector('[data-global-socials]')){const row=document.createElement('div');row.className='phx-footer-socials';row.dataset.globalSocials='';row.append(makeLink('discord',cfg.discordUrl,'Discord'),makeLink('youtube',cfg.youtubeUrl,'YouTube'),makeLink('tebex',cfg.tebexUrl,'Tebex'),makeLink('kofi',kofi,'Ko-fi'));tools.appendChild(row);}
    if(!main.querySelector('[data-kofi-support]')){const support=document.createElement('div');support.className='phx-support-card';support.dataset.kofiSupport='';support.innerHTML='<strong>Soutenir Phoenix Inc</strong><span>Si nos outils vous aident, vous pouvez soutenir leur développement.</span><a href="'+kofi+'" target="_blank" rel="noopener">Faire un don sur Ko-fi ↗</a>';main.appendChild(support);}
  });}
  function render(){header();footer();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
  window.addEventListener('phoenix:footerready',render);window.addEventListener('phoenix:langchange',render);setTimeout(render,150);
})();