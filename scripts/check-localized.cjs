const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const config = require('./seo.json');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const languages = ['fr', 'nl', 'en'];
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const pause = () => new Promise((resolve) => setTimeout(resolve, 25));

(async () => {
  for (const [file, metadata] of Object.entries(config.pages)) {
    for (const [index, language] of languages.entries()) {
      const url = `${config.base_url}${language}/${file}`;
      const dom = new JSDOM(read(`dist/${language}/${file}`), { url });
      const document = dom.window.document;
      assert.equal(document.documentElement.lang, language);
      assert.equal(
        document.querySelector('link[rel="icon"]').getAttribute('href'),
        '../images/favicon.svg'
      );
      assert.equal(document.title, metadata.titles[index]);
      assert.equal(
        document.querySelector('meta[name="description"]').content,
        metadata.descriptions[index]
      );
      assert.equal(document.querySelector('link[rel="canonical"]').href, url);
      assert.equal(
        document.querySelector('meta[property="og:title"]').content,
        metadata.titles[index]
      );
      assert.equal(document.querySelector('meta[property="og:url"]').content, url);
      assert.equal(
        document.querySelector('.main-nav a').textContent.trim(),
        language === 'fr' ? 'Accueil' : 'Home'
      );
      for (const code of languages) {
        const target = `${config.base_url}${code}/${file}`;
        assert.equal(document.querySelector(`link[hreflang="${code}"]`).href, target);
        assert.equal(document.querySelector(`.language-switch a[lang="${code}"]`).href, target);
      }
      const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
      assert.equal(ids.length, new Set(ids).size, url + ': duplicate ids');
      for (const element of document.querySelectorAll('[href], [src]')) {
        for (const attribute of ['href', 'src']) {
          const value = element.getAttribute(attribute);
          if (!value || value.startsWith('#')) continue;
          const target = new URL(value, url);
          if (!target.href.startsWith(config.base_url)) continue;
          const relative = decodeURIComponent(
            target.pathname.slice(new URL(config.base_url).pathname.length)
          );
          const filename = path.join(output, relative || 'index.html');
          assert(fs.existsSync(filename), `${url}: missing ${value}`);
          if (element.matches('a') && target.hash && relative.endsWith('.html')) {
            const destination = new JSDOM(fs.readFileSync(filename, 'utf8'));
            assert(
              destination.window.document.getElementById(decodeURIComponent(target.hash.slice(1))),
              value
            );
            destination.window.close();
          }
        }
      }
      assert(!document.querySelector('script[src$="js/seo.js"]'));
      const contactForm = document.getElementById('contact-form');
      if (contactForm && require('./contact.json').access_key) {
        assert.equal(contactForm.action, 'https://api.web3forms.com/submit');
        assert(contactForm.querySelector('[name="access_key"]').value);
        assert(contactForm.querySelector('[name="botcheck"]').hidden);
        const policy = document.querySelector('meta[http-equiv="Content-Security-Policy"]').content;
        assert(policy.includes("connect-src 'self' https://api.web3forms.com"));
        assert(policy.includes('form-action https://api.web3forms.com'));
      }
      dom.window.close();
    }
  }

  // Exercise real dynamic features after loading HTML already translated at build time.
  for (const language of languages) {
    const requested = [];
    const console = new VirtualConsole();
    const errors = [];
    console.on('jsdomError', (error) => errors.push(error.message));
    const dom = new JSDOM(read(`dist/${language}/teachings.html`), {
      url: `${config.base_url}${language}/teachings.html`,
      runScripts: 'outside-only',
      virtualConsole: console,
    });
    const window = dom.window;
    await new Promise((resolve) =>
      window.document.addEventListener('DOMContentLoaded', resolve, { once: true })
    );
    window.Element.prototype.scrollIntoView = () => {};
    window.fetch = async (url) => {
      requested.push(url);
      return { ok: true, json: async () => JSON.parse(read('data/youtube-videos.json')) };
    };
    for (const script of ['translations', 'i18n', 'main', 'youtube-api'])
      window.eval(read(`js/${script}.js`));
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
    await pause();
    assert.equal(window.document.querySelectorAll('.language-switch').length, 1);
    assert.equal(window.document.querySelectorAll('.menu-toggle').length, 1);
    assert.equal(window.ltpeI18n.language, language);
    assert.equal(requested[0], `${config.base_url}data/youtube-videos.json`);
    const cards = () =>
      window.document.querySelectorAll('#teachings-container .sermon-card').length;
    assert.equal(cards(), 9);
    window.document.getElementById('load-more-btn').click();
    assert.equal(cards(), 18);
    window.document.getElementById('load-less-btn').click();
    assert.equal(cards(), 9);
    assert.equal(
      window.document.querySelector('.main-nav a').textContent.trim(),
      language === 'fr' ? 'Accueil' : 'Home'
    );
    assert.deepEqual(errors, []);
    await pause();
    window.close();
  }
  for (const file of [
    'Frère BAMPALE.png',
    'Frère BAMPALE2.png',
    'Ltpe Bannière 1',
    'Ltpe Bannière 2',
  ]) {
    assert(!fs.existsSync(path.join(output, 'images', file)), 'Original must stay local: ' + file);
  }
  const sitemap = new JSDOM(read('dist/sitemap.xml'), { contentType: 'text/xml' });
  assert.equal(
    sitemap.window.document.querySelectorAll('loc').length,
    Object.keys(config.pages).length * languages.length
  );
  sitemap.window.close();
  console.log(
    `${Object.keys(config.pages).length * languages.length} static language pages: content, metadata, links, assets and anchors OK; dynamic videos and 9/18/9 controls OK in all languages.`
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
