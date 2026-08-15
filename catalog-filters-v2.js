(() => {
  if (!document.body.classList.contains('v2-scripts')) return;
  const products = Array.isArray(window.PHOENIX_PRODUCTS) ? window.PHOENIX_PRODUCTS : [];
  const panel = document.querySelector('.v2-filter-panel');
  const grid = document.querySelector('[data-product-grid]');
  if (!panel || !grid) return;

  let framework = 'all';
  let freeOnly = false;
  let minPrice = 0;
  let maxPrice = 100;
  let applying = false;

  const extra = document.createElement('div');
  extra.className = 'v2-filter-extra';
  extra.innerHTML = `
    <div class="v2-filter-block">
      <small>FRAMEWORK / BASE</small>
      <div class="v2-chips" data-framework-v2>
        <button class="v2-chip active" data-fw="all" type="button">Tous</button>
        <button class="v2-chip" data-fw="Standalone" type="button">Standalone</button>
        <button class="v2-chip" data-fw="ESX" type="button">ESX</button>
        <button class="v2-chip" data-fw="QBCore" type="button">QBCore</button>
        <button class="v2-chip v2-free-chip" data-free-v2 type="button">FREE</button>
      </div>
    </div>
    <div class="v2-filter-block">
      <small>PRIX</small>
      <div class="v2-price-controls">
        <div class="v2-price-field"><label>Minimum (€)</label><input type="number" min="0" max="1000" step="1" value="0" data-price-min-v2></div>
        <div class="v2-price-field"><label>Maximum (€)</label><input type="number" min="0" max="1000" step="1" value="100" data-price-max-v2></div>
      </div>
      <div class="v2-price-summary" data-price-summary-v2>0 € — 100 €</div>
    </div>`;
  panel.appendChild(extra);

  const findProductForCard = card => products.find(p => p.name === card.querySelector('h3')?.textContent.trim());

  const addCompatibility = card => {
    if (card.querySelector('.v2-product-compat')) return;
    const p = findProductForCard(card); if (!p) return;
    const body = card.querySelector('.v2-product-body'); if (!body) return;
    const row = document.createElement('div'); row.className = 'v2-product-compat';
    const frameworks = p.frameworks || [];
    const languages = p.languages || [];
    row.innerHTML = `${frameworks.map(x=>`<span class="v2-compat">${x}</span>`).join('')}${languages.map(x=>`<span class="v2-compat v2-lang-badge">${x}</span>`).join('')}`;
    body.querySelector('.v2-product-tags')?.insertAdjacentElement('afterend', row);
    if (p.price === 0) card.querySelector('.v2-product-badges')?.insertAdjacentHTML('afterbegin','<span class="v2-badge v2-free-badge">FREE</span>');
  };

  const apply = () => {
    if (applying) return; applying = true;
    let visible = 0;
    [...grid.querySelectorAll('.v2-product-card')].forEach(card => {
      addCompatibility(card);
      const p = findProductForCard(card);
      if (!p) return;
      const price = typeof p.price === 'number' ? p.price : Infinity;
      const fwOk = framework === 'all' || (p.frameworks || []).includes(framework);
      const freeOk = !freeOnly || p.price === 0;
      const priceOk = price >= minPrice && price <= maxPrice;
      const show = fwOk && freeOk && priceOk;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const count = document.querySelector('[data-product-count]');
    if (count) count.textContent = `${visible} ${visible > 1 ? 'scripts' : 'script'}`;
    applying = false;
  };

  extra.querySelectorAll('[data-fw]').forEach(btn => btn.addEventListener('click',()=>{
    framework = btn.dataset.fw;
    extra.querySelectorAll('[data-fw]').forEach(b=>b.classList.toggle('active',b===btn));
    apply();
  }));
  extra.querySelector('[data-free-v2]')?.addEventListener('click',e=>{
    freeOnly = !freeOnly; e.currentTarget.classList.toggle('active',freeOnly); apply();
  });

  const min = extra.querySelector('[data-price-min-v2]');
  const max = extra.querySelector('[data-price-max-v2]');
  const summary = extra.querySelector('[data-price-summary-v2]');
  const updatePrice = () => {
    minPrice = Math.max(0,Number(min.value)||0);
    maxPrice = Math.max(minPrice,Number(max.value)||0);
    if (Number(max.value) < minPrice) max.value = String(minPrice);
    summary.textContent = `${minPrice} € — ${maxPrice} €`;
    apply();
  };
  min.addEventListener('input',updatePrice); max.addEventListener('input',updatePrice);

  const reset = document.querySelector('[data-reset-filters]');
  reset?.addEventListener('click',()=>{
    framework='all'; freeOnly=false; minPrice=0; maxPrice=100; min.value='0'; max.value='100';
    extra.querySelectorAll('[data-fw]').forEach(b=>b.classList.toggle('active',b.dataset.fw==='all'));
    extra.querySelector('[data-free-v2]')?.classList.remove('active');
    summary.textContent='0 € — 100 €';
    setTimeout(apply,0);
  });

  const observer = new MutationObserver(()=>setTimeout(apply,0));
  observer.observe(grid,{childList:true});

  const modal = document.querySelector('[data-product-modal]');
  if (modal) {
    const modalObserver = new MutationObserver(()=>{
      if (!modal.classList.contains('open')) return;
      const name = modal.querySelector('[data-modal-title]')?.textContent.trim();
      const p = products.find(x=>x.name===name); if (!p) return;
      let meta = modal.querySelector('.v2-modal-meta');
      if (!meta) {
        meta = document.createElement('div'); meta.className='v2-modal-meta';
        modal.querySelector('[data-modal-tags]')?.insertAdjacentElement('afterend',meta);
      }
      meta.innerHTML = `<div><small>COMPATIBILITÉ</small><span>${(p.frameworks||[]).join(' · ')}</span></div><div><small>LANGUES</small><span>${(p.languages||[]).join(' · ')}</span></div>`;
    });
    modalObserver.observe(modal,{attributes:true,attributeFilter:['class'],subtree:true,childList:true});
  }

  setTimeout(apply,0);
})();
