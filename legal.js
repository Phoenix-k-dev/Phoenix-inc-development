(() => {
  const button = document.querySelector('[data-legal-lang]');
  if (!button) return;
  button.addEventListener('click', () => {
    if (location.pathname.includes('privacy')) location.href = 'privacy-en.html';
    else location.href = 'terms-en.html';
  });
})();
