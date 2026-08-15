(() => {
  const STORAGE_KEY = 'phoenix-theme';
  const root = document.documentElement;

  const iconSun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path></svg>';
  const iconMoon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path></svg>';

  const preferredTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  };

  let theme = preferredTheme();
  let hydrateQueued = false;

  const updateButtons = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const light = theme === 'light';
      const icon = light ? iconMoon : iconSun;
      if (button.innerHTML !== icon) button.innerHTML = icon;
      const aria = light ? 'Passer au thème sombre' : 'Passer au thème clair';
      const title = light ? 'Thème sombre' : 'Thème clair';
      if (button.getAttribute('aria-label') !== aria) button.setAttribute('aria-label', aria);
      if (button.getAttribute('title') !== title) button.setAttribute('title', title);
      button.dataset.nextTheme = light ? 'dark' : 'light';
    });
  };

  const setTheme = (next, persist = true) => {
    theme = next === 'light' ? 'light' : 'dark';
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
    if (document.body && document.body.dataset.theme !== theme) document.body.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (persist) localStorage.setItem(STORAGE_KEY, theme);
    updateButtons();
  };

  const createButton = () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'phx-theme-toggle';
    button.dataset.themeToggle = 'true';
    button.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    return button;
  };

  const insertToggle = (actions) => {
    if (!actions || actions.querySelector('[data-theme-toggle]')) return;
    const button = createButton();
    const lang = actions.querySelector('[data-lang-toggle-v2]');
    const menu = actions.querySelector('.v2-menu, .syn-v2-menu');
    if (lang) actions.insertBefore(button, lang);
    else if (menu) actions.insertBefore(button, menu);
    else actions.appendChild(button);
  };

  const normalizeBrand = () => {
    document.querySelectorAll('.v2-brand, .syn-v2-brand').forEach(brand => {
      const strong = brand.querySelector('b');
      const small = brand.querySelector('small');
      if (strong && strong.textContent !== 'Phoenix Inc |') strong.textContent = 'Phoenix Inc |';
      if (small && small.textContent !== 'Development') small.textContent = 'Development';
      if (brand.getAttribute('aria-label') !== 'Phoenix Inc | Development') brand.setAttribute('aria-label', 'Phoenix Inc | Development');
    });
    document.querySelectorAll('.v2-footer-bottom span:first-child, .syn-v2-footer span:first-child').forEach(el => {
      if (/Phoenix Inc/i.test(el.textContent || '') && el.textContent !== '© 2026 Phoenix Inc | Development') {
        el.textContent = '© 2026 Phoenix Inc | Development';
      }
    });
    if (/Phoenix Inc\. Development|Phoenix Inc Development/.test(document.title)) {
      document.title = document.title.replace(/Phoenix Inc\. Development|Phoenix Inc Development/g, 'Phoenix Inc | Development');
    }
  };

  const hydrate = () => {
    hydrateQueued = false;
    if (document.body && document.body.dataset.theme !== theme) document.body.dataset.theme = theme;
    document.querySelectorAll('.v2-header-actions, .syn-v2-actions').forEach(insertToggle);
    normalizeBrand();
    updateButtons();
  };

  const queueHydrate = () => {
    if (hydrateQueued) return;
    hydrateQueued = true;
    requestAnimationFrame(hydrate);
  };

  setTheme(theme, false);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrate, { once: true });
  else hydrate();

  const observer = new MutationObserver(mutations => {
    if (mutations.some(m => [...m.addedNodes].some(node => node.nodeType === 1))) queueHydrate();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
