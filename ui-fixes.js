(() => {
  const track = document.querySelector('.v2-marquee-track');
  if (track && !track.querySelector('.v2-marquee-group')) {
    const items = [...track.children].map(el => el.outerHTML).join('');
    track.innerHTML = `<div class="v2-marquee-group">${items}</div><div class="v2-marquee-group" aria-hidden="true">${items}</div>`;
  }

  // Home wording: cleaner showcase copy.
  const showcaseTitle = document.querySelector('[data-v2-i18n="home.showcaseTitle"]');
  const showcaseCopy = document.querySelector('[data-v2-i18n="home.showcaseCopy"]');
  const applyHomeCopy = () => {
    const en = document.documentElement.lang === 'en';
    if (showcaseTitle) showcaseTitle.textContent = en ? 'What’s worth seeing right now.' : 'Ce qu’il faut voir en ce moment.';
    if (showcaseCopy) showcaseCopy.textContent = en
      ? 'A rotating selection of scripts, Synapse and custom work. Open a category when you want the full catalog.'
      : 'Une sélection qui tourne entre scripts, Synapse et prestations. Ouvre ensuite une catégorie pour explorer tout le catalogue.';
  };
  applyHomeCopy();
  new MutationObserver(applyHomeCopy).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
