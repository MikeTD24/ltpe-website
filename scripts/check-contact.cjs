const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const base = require('./seo.json').base_url;
const pause = () => new Promise((resolve) => setTimeout(resolve, 25));

(async () => {
  for (const language of ['fr', 'nl', 'en']) {
    for (const outcome of ['success', 'rejected', 'network', 'invalid-json']) {
      const dom = new JSDOM(fs.readFileSync(`dist/${language}/index.html`, 'utf8'), {
        url: `${base}${language}/index.html`,
        runScripts: 'outside-only',
      });
      const w = dom.window;
      await new Promise((resolve) =>
        w.document.addEventListener('DOMContentLoaded', resolve, { once: true })
      );
      const form = w.document.getElementById('contact-form');
      // Test the delivery handler without registering a provider or sending any email.
      form.action = 'https://api.web3forms.com/submit';
      if (!form.querySelector('[name="access_key"]')) {
        const key = w.document.createElement('input');
        key.type = 'hidden';
        key.name = 'access_key';
        key.value = '00000000-0000-0000-0000-000000000000';
        form.append(key);
      }
      let calls = 0;
      w.fetch = async (url, options) => {
        calls++;
        assert.equal(url, 'https://api.web3forms.com/submit');
        assert.equal(options.method, 'POST');
        assert.equal(options.body.get('email'), 'test@example.com');
        assert.equal(options.body.get('message'), 'Contact test');
        await pause();
        if (outcome === 'network') throw new Error('Simulated timeout');
        return {
          ok: outcome !== 'rejected',
          json: async () => {
            if (outcome === 'invalid-json') throw new Error('Invalid JSON');
            return { success: outcome === 'success' };
          },
        };
      };
      for (const script of ['translations', 'i18n', 'main'])
        w.eval(fs.readFileSync(`js/${script}.js`, 'utf8'));
      w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
      w.document.getElementById('name').value = 'Test';
      w.document.getElementById('email').value = 'test@example.com';
      w.document.getElementById('message').value = 'Contact test';
      form.dispatchEvent(new w.Event('submit', { cancelable: true }));
      form.dispatchEvent(new w.Event('submit', { cancelable: true }));
      assert.equal(calls, 1, 'Duplicate submits must not send twice');
      assert.equal(form.querySelector('button[type="submit"]').disabled, true);
      await pause();
      await pause();
      const status = w.document.getElementById('contact-status');
      assert.equal(status.dataset.state, outcome === 'success' ? 'success' : 'error');
      assert.equal(
        w.document.getElementById('message').value,
        outcome === 'success' ? '' : 'Contact test'
      );
      assert.equal(form.querySelector('button[type="submit"]').disabled, false);
      const source =
        outcome === 'success'
          ? 'Votre message a été transmis au service d’envoi. Merci de nous avoir contactés.'
          : 'L’envoi n’a pas pu être confirmé. Votre texte est conservé. Réessayez ou écrivez à letempledupleinevangile@gmail.com.';
      assert.equal(status.textContent, w.ltpeI18n.t(source));
      await pause();
      w.close();
    }
  }
  console.log(
    'Contact: accepted, rejected, network/JSON failures, duplicate prevention and retained text pass in FR/NL/EN. No real message sent.'
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
