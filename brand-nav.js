(() => {
  const cfg = window.PHOENIX_CONFIG || {};

  const replaceBrandText = () => {
    document.title = document.title.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development').replaceAll('Phoenix Inc Development','Phoenix Inc | Development');
    document.querySelectorAll('meta[name="description"]').forEach(meta => {
      meta.content = meta.content.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development').replaceAll('Phoenix Inc Development','Phoenix Inc | Development');
    });
    document.querySelectorAll('.v2-brand, .syn-v2-brand').forEach(brand => {
      const strong = brand.querySelector('b');
      const small = brand.querySelector('small');
      if (strong) strong.textContent = 'Phoenix Inc |';
      if (small) small.textContent = 'Development';
      brand.setAttribute('aria-label','Phoenix Inc | Development');
    });
    document.querySelectorAll('body *').forEach(el => {
      if (el.children.length) return;
      const text = el.textContent || '';
      if (text.includes('Phoenix Inc. Development') || text.includes('Phoenix Inc Development')) {
        el.textContent = text.replaceAll('Phoenix Inc. Development','Phoenix Inc | Development').replaceAll('Phoenix Inc Development','Phoenix Inc | Development');
      }
    });
  };

  const hasDashboardLink = nav => !!nav?.querySelector('a[href="dashboard.html"]');
  const addDashboardLink = () => {
    document.querySelectorAll('.v2-nav, .syn-v2-nav').forEach(nav => {
      if (hasDashboardLink(nav)) return;
      const link = document.createElement('a');
      link.href = 'dashboard.html';
      link.textContent = 'Dashboard';
      const bots = [...nav.querySelectorAll('a')].find(a => /bots/i.test(a.textContent));
      if (bots?.nextSibling) nav.insertBefore(link, bots.nextSibling);
      else nav.appendChild(link);
    });
  };

  const detectDashboardAccess = async () => {
    if (document.body.classList.contains('v2-dashboard-page')) {
      addDashboardLink();
      return;
    }
    try {
      const me = await fetch(cfg.synapseMeUrl || '/api/me', {credentials:'include'});
      if (!me.ok) return;
      const guildsRes = await fetch(cfg.synapseGuildsUrl || '/api/guilds', {credentials:'include'});
      if (!guildsRes.ok) return;
      const payload = await guildsRes.json();
      const guilds = Array.isArray(payload) ? payload : (payload.guilds || []);
      if (guilds.some(g => g.manageable !== false && g.botInstalled !== false)) addDashboardLink();
    } catch {}
  };

  const run = () => {
    replaceBrandText();
    detectDashboardAccess();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
