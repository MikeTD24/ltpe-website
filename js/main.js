document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header'),
    nav = document.querySelector('.main-nav');
  if (header && nav) {
    header.classList.add('js-ready');
    nav.id = 'main-navigation';
    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.type = 'button';
    toggle.textContent = 'Menu ☰';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    nav.before(toggle);
    const close = () => {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', String(header.classList.toggle('menu-open')));
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) close();
    });
    header.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
        toggle.focus();
      }
    });
  }
  const form = document.getElementById('contact-form');
  if (form)
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (form.dataset.sending === 'true') return;
      const status = document.getElementById('contact-status');
      const t = (text) => window.ltpeI18n?.t(text) || text;
      if (form.querySelector('[name="access_key"]')) {
        if (form.querySelector('[name="botcheck"]')?.checked) return;
        const button = form.querySelector('button[type="submit"]');
        const originalLabel = button.textContent;
        if (!['name', 'email', 'message'].every((id) => document.getElementById(id).value.trim()))
          return;
        form.dataset.sending = 'true';
        form.setAttribute('aria-busy', 'true');
        button.disabled = true;
        button.textContent = t('Envoi en cours…');
        status.dataset.state = 'sending';
        status.textContent = t('Envoi en cours…');
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
            signal: AbortSignal.timeout(20000),
          });
          const result = await response.json();
          if (!response.ok || result.success !== true) throw new Error('Message not accepted');
          form.reset();
          status.dataset.state = 'success';
          status.textContent = t(
            'Votre message a été transmis au service d’envoi. Merci de nous avoir contactés.'
          );
        } catch {
          status.dataset.state = 'error';
          status.textContent = t(
            'L’envoi n’a pas pu être confirmé. Votre texte est conservé. Réessayez ou écrivez à letempledupleinevangile@gmail.com.'
          );
        } finally {
          form.dataset.sending = 'false';
          form.removeAttribute('aria-busy');
          button.disabled = false;
          button.textContent = originalLabel;
        }
        return;
      }
      const name = document.getElementById('name').value.trim(),
        email = document.getElementById('email').value.trim(),
        message = document.getElementById('message').value.trim();
      window.location.href = `mailto:letempledupleinevangile@gmail.com?subject=${encodeURIComponent('Contact LTPE — ' + name)}&body=${encodeURIComponent('Nom : ' + name + '\nE-mail : ' + email + '\n\n' + message)}`;
      document.getElementById('contact-status').textContent =
        'Votre messagerie a été sollicitée. Validez l’envoi dans celle-ci. Si elle ne s’ouvre pas, écrivez à letempledupleinevangile@gmail.com. Votre texte reste disponible ici.';
    });
});
