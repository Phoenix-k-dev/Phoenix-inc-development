(() => {
  const config = window.PHOENIX_CONFIG || {};
  const stripeUrl = config.synapseStripeUrl;

  const setStripeLink = (el) => {
    if (!el || !stripeUrl) return;
    el.href = stripeUrl;
    el.target = '_blank';
    el.rel = 'noopener';
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
  };

  const fixHomePaymentCard = () => {
    const oldCard = document.querySelector('[data-config-link="tipeeeUrl"]');
    if (!oldCard) return;

    oldCard.dataset.configLink = 'synapseStripeUrl';
    oldCard.classList.remove('tipeee', 'disabled');
    oldCard.classList.add('stripe');
    oldCard.removeAttribute('aria-disabled');

    const small = oldCard.querySelector('small');
    const label = oldCard.querySelector('b');
    if (small) small.textContent = 'SYNAPSE / SUBSCRIPTION';
    if (label) {
      label.removeAttribute('data-v2-i18n');
      label.textContent = 'Synapse Premium · Stripe ↗';
    }

    setStripeLink(oldCard);
  };

  const addBotsStripeButton = () => {
    if (!document.body.classList.contains('v2-bots')) return;
    const actions = document.querySelector('.v2-bot-copy .v2-hero-actions');
    if (!actions || actions.querySelector('[data-synapse-stripe]')) return;

    const link = document.createElement('a');
    link.className = 'v2-btn v2-btn-primary';
    link.dataset.synapseStripe = 'true';
    link.textContent = 'Synapse Premium · Stripe ↗';
    setStripeLink(link);
    if (!stripeUrl) {
      link.classList.add('disabled');
      link.setAttribute('aria-disabled', 'true');
    }
    actions.appendChild(link);
  };

  const fixSynapsePage = () => {
    if (!document.body.classList.contains('synapse-saas-page')) return;

    // Phoenix Inc. n'utilise pas de lien de donation : Stripe sert uniquement à l'abonnement Premium.
    document.querySelector('.syn-support-row')?.remove();

    const premium = document.querySelector('.syn-plan-card.premium');
    if (!premium || premium.querySelector('[data-synapse-stripe]')) return;

    const link = document.createElement('a');
    link.className = 'button button-primary config-button';
    link.dataset.synapseStripe = 'true';
    link.style.marginTop = '18px';
    link.style.width = '100%';
    link.innerHTML = '<span>S’abonner à Synapse Premium</span><b>↗</b>';
    setStripeLink(link);
    if (!stripeUrl) {
      link.classList.add('disabled');
      link.setAttribute('aria-disabled', 'true');
    }
    premium.appendChild(link);
  };

  const run = () => {
    fixHomePaymentCard();
    addBotsStripeButton();
    fixSynapsePage();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
