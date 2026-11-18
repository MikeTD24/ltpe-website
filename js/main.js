document.addEventListener('DOMContentLoaded', () => {
 const header = document.querySelector('.site-header'), nav = document.querySelector('.main-nav');
 if (header && nav) {
  header.classList.add('js-ready');
  nav.id = 'main-navigation';
  const toggle = document.createElement('button');
  toggle.className = 'menu-toggle'; toggle.type = 'button'; toggle.textContent = 'Menu ☰';
  toggle.setAttribute('aria-controls',nav.id); toggle.setAttribute('aria-expanded','false');
  nav.before(toggle);
  const close = () => { header.classList.remove('menu-open'); toggle.setAttribute('aria-expanded','false'); };
  toggle.addEventListener('click',() => { toggle.setAttribute('aria-expanded',String(header.classList.toggle('menu-open'))); });
  nav.addEventListener('click',event => { if (event.target.closest('a')) close(); });
  header.addEventListener('keydown',event => { if (event.key === 'Escape') { close(); toggle.focus(); } });
 }
 const form = document.getElementById('contact-form');
 if (form) form.addEventListener('submit',event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.getElementById('name').value.trim(), email = document.getElementById('email').value.trim(), message = document.getElementById('message').value.trim();
  window.location.href = `mailto:letempledupleinevangile@gmail.com?subject=${encodeURIComponent('Contact LTPE — '+name)}&body=${encodeURIComponent('Nom : '+name+'\nE-mail : '+email+'\n\n'+message)}`;
  document.getElementById('contact-status').textContent = 'Votre messagerie a été sollicitée. Validez l’envoi dans celle-ci. Si elle ne s’ouvre pas, écrivez à letempledupleinevangile@gmail.com. Votre texte reste disponible ici.';
 });
});
