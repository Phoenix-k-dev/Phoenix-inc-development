(() => {
  if (!document.body.classList.contains('synapse-saas-page')) return;

  const commandUrl = 'synapse-commands.html';
  const copy = {
    fr: {
      kicker: 'COMMANDES SYNAPSE',
      title: 'Toutes les commandes, au même endroit.',
      text: 'Builder, tickets, permissions, Premium et Interserver : retrouvez chaque commande avec sa description et son niveau d’accès.',
      button: 'Voir les commandes →'
    },
    en: {
      kicker: 'SYNAPSE COMMANDS',
      title: 'Every command, in one place.',
      text: 'Builder, tickets, permissions, Premium and Interserver: find every command with its description and access level.',
      button: 'View commands →'
    }
  };

  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'fr';

  function removeHeaderCommand() {
    document.querySelectorAll('.v2-header .v2-nav a[href="synapse-commands.html"], .v2-header .v2-nav [data-shell="commands"]').forEach(el => el.remove());
  }

  function ensureEntry() {
    const adaptive = document.querySelector('.syn-v2-adaptive-hero');
    if (!adaptive) return;

    let entry = adaptive.querySelector('[data-syn-command-entry]');
    if (!entry) {
      entry = document.createElement('section');
      entry.className = 'syn-command-entry';
      entry.dataset.synCommandEntry = '';
      entry.innerHTML = `
        <div class="syn-command-entry-copy">
          <small data-command-entry="kicker"></small>
          <h3 data-command-entry="title"></h3>
          <p data-command-entry="text"></p>
        </div>
        <a class="syn-command-entry-button" href="${commandUrl}" data-command-entry="button"></a>`;

      const commandLine = adaptive.querySelector('.syn-adapt-command');
      if (commandLine) commandLine.insertAdjacentElement('afterend', entry);
      else adaptive.appendChild(entry);
    }

    const t = copy[lang()];
    entry.querySelectorAll('[data-command-entry]').forEach(el => {
      const key = el.dataset.commandEntry;
      if (key && t[key]) el.textContent = t[key];
    });
  }

  function render() {
    removeHeaderCommand();
    ensureEntry();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();

  window.addEventListener('phoenix:langchange', render);
  setTimeout(render, 50);
  setTimeout(render, 200);
})();