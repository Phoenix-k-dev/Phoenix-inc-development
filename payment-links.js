(() => {
  const cleanLegacyPaymentUi = () => {
    // No Tipeee/donation entry on Phoenix Inc. Development.
    document.querySelector('[data-config-link="tipeeeUrl"]')?.remove();
    document.querySelector('.syn-support-row')?.remove();

    // Synapse Premium purchase is presented only inside the dedicated Premium section.
    document.querySelectorAll('[data-synapse-stripe]').forEach(el => el.remove());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanLegacyPaymentUi, { once:true });
  } else {
    cleanLegacyPaymentUi();
  }
})();
