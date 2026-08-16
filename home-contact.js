(() => {
  if (!document.body.classList.contains('v2-home')) return;

  const config = window.PHOENIX_CONFIG || {};
  const contactEmail = config.contactEmail || 'phoenixinc.dev@gmail.com';
  const discordUrl = config.discordUrl || 'https://discord.gg/xfWVss2KCv';
  const endpoint = `https://formsubmit.co/ajax/${contactEmail}`;

  const content = {
    fr: {
      faqTitle: 'Questions fréquentes.',
      faqCopy: 'Les réponses utiles avant un achat, une installation ou un projet. Si votre question n’est pas ici, contactez-nous directement.',
      askTitle: 'Vous ne trouvez pas votre réponse ?',
      askCopy: 'Envoyez-nous votre question depuis le site ou rejoignez directement notre Discord pour échanger avec le support.',
      askButton: 'Poser une question',
      discordButton: 'Rejoindre Discord',
      askSend: 'Envoyer la question',
      askClose: 'Fermer',
      quoteCopy: 'Décrivez le besoin, le type de projet et votre budget indicatif. Votre demande est envoyée directement à Phoenix Inc | Development.',
      quoteNote: 'Votre demande sera envoyée directement à phoenixinc.dev@gmail.com.',
      quoteSend: 'Envoyer le devis',
      sending: 'Envoi en cours…',
      sentQuote: '✓ Demande de devis envoyée. Nous vous répondrons par e-mail.',
      sentQuestion: '✓ Question envoyée. Nous vous répondrons par e-mail.',
      error: 'Impossible d’envoyer pour le moment. Réessayez dans quelques instants.',
      fields: { name:'Nom / pseudo', email:'E-mail', topic:'Sujet', message:'Votre question' },
      faq: [
        ['Les scripts sont-ils standalone ?', 'La compatibilité est indiquée sur chaque fiche. Certains produits fonctionnent en Standalone, ESX et QBCore lorsque cela est précisé.'],
        ['Comment obtenir du support ?', 'Le Discord centralise le support technique. Pour une question commerciale ou avant achat, vous pouvez aussi nous écrire directement depuis le site.'],
        ['Vous faites aussi du sur-mesure ?', 'Oui. FiveM, bots Discord, sites web, applications et outils spécifiques peuvent faire l’objet d’un devis personnalisé.'],
        ['Où acheter les scripts ?', 'Les scripts commerciaux sont reliés à leur page Tebex dès que leur package est publié. Le lien apparaît directement sur la fiche du produit.'],
        ['ESX et QBCore sont-ils compatibles ?', 'Cela dépend du produit. Les frameworks compatibles sont affichés clairement sur chaque fiche afin d’éviter toute ambiguïté avant l’achat.'],
        ['Dans quelles langues sont disponibles les produits ?', 'Les langues disponibles sont indiquées sur chaque fiche. Les produits peuvent proposer plusieurs langues selon le projet.'],
        ['Pouvez-vous aider à l’installation ?', 'Oui. La documentation accompagne les produits et le support Discord peut vous aider lorsqu’un problème d’installation ou de configuration apparaît.'],
        ['Les produits reçoivent-ils des mises à jour ?', 'Les évolutions importantes et corrections sont indiquées sur les pages concernées ou dans les annonces du projet.'],
        ['Puis-je poser une question avant d’acheter ?', 'Oui. Utilisez le formulaire sous cette FAQ ou rejoignez notre Discord pour échanger directement avec le support.'],
        ['Comment fonctionne un devis ?', 'Vous décrivez le projet, le budget indicatif et les fonctions souhaitées. La demande est envoyée directement par le site, puis nous revenons vers vous par e-mail.']
      ]
    },
    en: {
      faqTitle: 'Frequently asked questions.',
      faqCopy: 'Useful answers before a purchase, installation or custom project. If your question is not here, contact us directly.',
      askTitle: 'Can’t find your answer?',
      askCopy: 'Send your question from the website or join our Discord to talk directly with support.',
      askButton: 'Ask a question',
      discordButton: 'Join Discord',
      askSend: 'Send question',
      askClose: 'Close',
      quoteCopy: 'Describe your needs, project type and indicative budget. Your request is sent directly to Phoenix Inc | Development.',
      quoteNote: 'Your request will be sent directly to phoenixinc.dev@gmail.com.',
      quoteSend: 'Send quote request',
      sending: 'Sending…',
      sentQuote: '✓ Quote request sent. We will reply by email.',
      sentQuestion: '✓ Question sent. We will reply by email.',
      error: 'Unable to send right now. Please try again in a moment.',
      fields: { name:'Name / handle', email:'Email', topic:'Subject', message:'Your question' },
      faq: [
        ['Are the scripts standalone?', 'Compatibility is shown on every product page. Some products support Standalone, ESX and QBCore when explicitly stated.'],
        ['How do I get support?', 'Discord centralizes technical support. For commercial or pre-purchase questions, you can also contact us directly from the website.'],
        ['Do you build custom projects?', 'Yes. FiveM, Discord bots, websites, applications and specific tools can be quoted as custom work.'],
        ['Where can I buy the scripts?', 'Commercial scripts are linked to their Tebex page as soon as the package is published. The link appears directly on the product page.'],
        ['Are ESX and QBCore supported?', 'It depends on the product. Supported frameworks are clearly displayed on each page before purchase.'],
        ['Which languages are available?', 'Available languages are listed on each product page. Products may include several languages depending on the project.'],
        ['Can you help with installation?', 'Yes. Products include documentation and Discord support can help when an installation or configuration issue appears.'],
        ['Do products receive updates?', 'Important changes and fixes are announced on the relevant product pages or project announcements.'],
        ['Can I ask something before buying?', 'Yes. Use the form below this FAQ or join our Discord to talk directly with support.'],
        ['How does a quote work?', 'Describe the project, indicative budget and requested features. The website sends the request directly, then we reply by email.']
      ]
    }
  };

  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const t = () => content[lang()];
  function faqSection() { const faq = document.querySelector('.v2-faq'); return faq?.closest('.v2-section'); }

  function renderFaq() {
    const faq = document.querySelector('.v2-faq'); const section = faqSection(); if (!faq || !section) return; const c = t();
    const title = section.querySelector('.v2-section-head h2'); const intro = section.querySelector('.v2-section-head > p'); if (title) title.textContent = c.faqTitle; if (intro) intro.textContent = c.faqCopy;
    faq.innerHTML = '<div class="v2-faq-column"></div><div class="v2-faq-column"></div>';
    const columns = [...faq.querySelectorAll('.v2-faq-column')];
    c.faq.forEach((item,index) => { const details = document.createElement('details'); details.innerHTML = `<summary>${item[0]}</summary><p>${item[1]}</p>`; columns[index % 2].appendChild(details); });
    let contact = section.querySelector('.v2-faq-contact'); if (!contact) { contact = document.createElement('div'); contact.className = 'v2-faq-contact'; section.appendChild(contact); }
    contact.innerHTML = `<div class="v2-faq-contact-copy"><span class="v2-kicker">CONTACT / QUESTION</span><h3>${c.askTitle}</h3><p>${c.askCopy}</p></div><div class="v2-faq-contact-actions"><button class="v2-btn v2-btn-violet" type="button" data-question-open>${c.askButton} →</button><a class="v2-btn v2-btn-ghost" href="${discordUrl}" target="_blank" rel="noopener">${c.discordButton} ↗</a></div><form class="v2-question-form" data-question-form hidden><div class="v2-form-grid"><label><span>${c.fields.name}</span><input name="name" required autocomplete="name"></label><label><span>${c.fields.email}</span><input type="email" name="email" required autocomplete="email"></label><label class="full"><span>${c.fields.topic}</span><input name="topic" required></label><label class="full"><span>${c.fields.message}</span><textarea name="message" rows="5" required></textarea></label></div><div class="v2-question-actions"><span class="v2-form-status" data-question-status></span><button class="v2-btn v2-btn-ghost" type="button" data-question-close>${c.askClose}</button><button class="v2-btn v2-btn-primary" type="submit">${c.askSend}</button></div></form>`;
    const open = contact.querySelector('[data-question-open]'); const form = contact.querySelector('[data-question-form]'); open?.addEventListener('click',()=>{ form.hidden=false; open.closest('.v2-faq-contact-actions').hidden=true; form.querySelector('input')?.focus(); }); contact.querySelector('[data-question-close]')?.addEventListener('click',()=>{ form.hidden=true; open.closest('.v2-faq-contact-actions').hidden=false; }); form?.addEventListener('submit', questionSubmit, {capture:true});
  }

  function updateQuoteCopy() { const form = document.querySelector('[data-quote-form]'); const quote = form?.closest('.v2-quote'); if (!form || !quote) return; const c = t(); const intro = quote.querySelector('.v2-quote-copy p'); const note = form.querySelector('.v2-form-bottom p'); const button = form.querySelector('button[type="submit"] span') || form.querySelector('button[type="submit"]'); if (intro) intro.textContent = c.quoteCopy; if (note) note.textContent = c.quoteNote; if (button) button.textContent = c.quoteSend; if (!form.querySelector('[data-quote-status]')) { const status = document.createElement('span'); status.className='v2-form-status'; status.dataset.quoteStatus=''; form.querySelector('.v2-form-bottom')?.prepend(status); } }
  async function send(payload) { const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)}); if (!response.ok) throw new Error('send_failed'); return response.json().catch(()=>({success:true})); }
  async function quoteSubmit(event) { const form = event.currentTarget || event.target; if (!(form instanceof HTMLFormElement) || !form.matches('[data-quote-form]')) return; event.preventDefault(); event.stopImmediatePropagation(); if (!form.reportValidity()) return; const c=t(); const fd=new FormData(form); const button=form.querySelector('button[type="submit"]'); const status=form.querySelector('[data-quote-status]'); if (button) button.disabled=true; if(status){status.textContent=c.sending;status.className='v2-form-status sending';} try { await send({_subject:`[DEVIS PHOENIX] ${fd.get('type') || 'Projet'} — ${fd.get('name') || 'Contact'}`,Formulaire:'Demande de devis',Nom:fd.get('name'), Email:fd.get('email'), Type:fd.get('type'), Budget:fd.get('budget') || 'Non précisé', Besoin:fd.get('message')}); if(status){status.textContent=c.sentQuote;status.className='v2-form-status success';} form.reset(); } catch { if(status){status.textContent=c.error;status.className='v2-form-status error';} } finally { if(button) button.disabled=false; } }
  async function questionSubmit(event) { const form=event.currentTarget; event.preventDefault(); event.stopImmediatePropagation(); if (!form.reportValidity()) return; const c=t(); const fd=new FormData(form); const button=form.querySelector('button[type="submit"]'); const status=form.querySelector('[data-question-status]'); if(button) button.disabled=true; if(status){status.textContent=c.sending;status.className='v2-form-status sending';} try { await send({_subject:`[QUESTION PHOENIX] ${fd.get('topic')}`,Formulaire:'Question depuis le site',Nom:fd.get('name'),Email:fd.get('email'),Sujet:fd.get('topic'),Question:fd.get('message')}); if(status){status.textContent=c.sentQuestion;status.className='v2-form-status success';} form.reset(); } catch { if(status){status.textContent=c.error;status.className='v2-form-status error';} } finally { if(button) button.disabled=false; } }
  function bindQuoteCapture() { const form=document.querySelector('[data-quote-form]'); if(form && !form.dataset.directSendBound){ form.dataset.directSendBound='1'; form.addEventListener('submit', quoteSubmit, {capture:true}); } }
  function render(){ renderFaq(); updateQuoteCopy(); bindQuoteCapture(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
  new MutationObserver(m=>{ if(m.some(x=>x.type==='attributes'&&x.attributeName==='lang')) setTimeout(render,0); }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();