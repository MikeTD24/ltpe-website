/* The root HTML and translation dictionary are the only editorial sources. */
const fs = require('node:fs/promises');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const prettier = require('prettier');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const languages = ['fr', 'nl', 'en'];
const read = (name) => fs.readFile(path.join(root, name), 'utf8');
const pause = () => new Promise((resolve) => setTimeout(resolve, 20));

async function build() {
  const config = JSON.parse(await read('scripts/seo.json'));
  const formatting = JSON.parse(await read('.prettierrc.json'));
  const contact = JSON.parse(await read('scripts/contact.json'));
  contact.access_key = process.env.LTPE_CONTACT_ACCESS_KEY || contact.access_key;
  const base = new URL(config.base_url);
  const url = (file, language) => new URL(`${language}/${file}`, base).href;
  const urls = [];
  await fs.mkdir(output, { recursive: true });
  // Copy only tracked public assets; ignored originals cannot enter the artifact.
  const { execFileSync } = require('node:child_process');
  const tracked = execFileSync('git', ['ls-files', '-z', '--', 'css', 'js', 'images', 'data'], {
    cwd: root,
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean);
  for (const file of tracked) {
    if (/images\/(Homepage|Aboutpage|Teachingspage)\.png$/.test(file)) continue;
    if (file === 'js/seo.js') continue;
    const destination = path.join(output, file);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(path.join(root, file), destination);
  }

  for (const [file, metadata] of Object.entries(config.pages)) {
    for (const [index, language] of languages.entries()) {
      const dom = new JSDOM(await read(file), {
        url: new URL(`${file}?lang=${language}`, base).href,
        runScripts: 'outside-only',
      });
      const window = dom.window;
      await new Promise((resolve) =>
        window.document.addEventListener('DOMContentLoaded', resolve, { once: true })
      );
      window.LTPE_BUILD = true;
      const form = window.document.getElementById('contact-form');
      if (form && contact.access_key) {
        if (!/^[a-zA-Z0-9_-]{30,100}$/.test(contact.access_key)) {
          throw new Error('Invalid public Web3Forms access key in scripts/contact.json');
        }
        form.action = 'https://api.web3forms.com/submit';
        form.removeAttribute('enctype');
        for (const [name, value] of Object.entries({
          access_key: contact.access_key,
          subject: 'Contact — Le Temple du Plein Évangile',
          from_name: 'Site LTPE',
        })) {
          const input = window.document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.append(input);
        }
        const trap = window.document.createElement('input');
        trap.type = 'checkbox';
        trap.name = 'botcheck';
        trap.tabIndex = -1;
        trap.hidden = true;
        trap.setAttribute('aria-hidden', 'true');
        form.append(trap);
        form.querySelector('button[type="submit"]').textContent = 'Envoyer mon message';
        form.querySelector('#contact-status').textContent =
          'Votre message sera transmis directement à l’église, sans ouvrir votre messagerie.';
        const notice = window.document.createElement('p');
        notice.className = 'contact-privacy';
        notice.textContent =
          'Ce formulaire utilise Web3Forms pour transmettre votre nom, votre adresse e-mail et votre message à l’église.';
        form.append(notice);
        const privacy = window.document.createElement('a');
        privacy.href = 'https://web3forms.com/privacy';
        privacy.textContent = 'Confidentialité du service d’envoi';
        privacy.target = '_blank';
        privacy.rel = 'noopener noreferrer';
        form.append(privacy);
        const policy = window.document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        policy.content = policy.content
          .replace("connect-src 'self'", "connect-src 'self' https://api.web3forms.com")
          .replace('form-action mailto:', 'form-action https://api.web3forms.com');
      }
      window.fetch = async (resource) => {
        const pathname = new URL(resource, base).pathname;
        const file = pathname.endsWith('events.json')
          ? 'data/events.json'
          : 'data/youtube-videos.json';
        return { ok: true, json: async () => JSON.parse(await read(file)) };
      };
      for (const script of ['translations', 'i18n', 'events'])
        window.eval(await read(`js/${script}.js`));
      if (['index.html', 'teachings.html'].includes(file)) {
        window.eval(await read('js/youtube-api.js'));
        window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
      }
      await pause();
      const document = window.document;
      document.documentElement.lang = language;
      document.documentElement.dataset.staticLanguage = language;
      document.title = metadata.titles[index];
      document.querySelector('meta[name="description"]').content = metadata.descriptions[index];
      for (const element of document.querySelectorAll(
        'link[rel="canonical"], link[hreflang], meta[property^="og:"], meta[name^="twitter:"], script[src$="js/seo.js"]'
      ))
        element.remove();
      function tag(name, attributes) {
        const element = document.createElement(name);
        for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
        document.head.append(element);
      }
      tag('link', { rel: 'icon', type: 'image/svg+xml', href: '../images/favicon.svg' });
      tag('link', { rel: 'canonical', href: url(file, language) });
      for (const code of languages)
        tag('link', { rel: 'alternate', hreflang: code, href: url(file, code) });
      tag('link', { rel: 'alternate', hreflang: 'x-default', href: url(file, 'fr') });
      const properties = {
        'og:type': 'website',
        'og:site_name': 'Le Temple du Plein Évangile',
        'og:locale': ['fr_BE', 'nl_BE', 'en_GB'][index],
        'og:title': metadata.titles[index],
        'og:description': metadata.descriptions[index],
        'og:url': url(file, language),
        'og:image': new URL('images/Ltpe-Temple.jpeg', base).href,
      };
      for (const [property, content] of Object.entries(properties))
        tag('meta', { property, content });
      for (const [name, content] of Object.entries({
        'twitter:card': 'summary_large_image',
        'twitter:title': metadata.titles[index],
        'twitter:description': metadata.descriptions[index],
        'twitter:image': properties['og:image'],
      }))
        tag('meta', { name, content });
      // Assets are shared at the site root; page links keep their language.
      for (const element of document.querySelectorAll('[src], [href]')) {
        const attribute = element.hasAttribute('src') ? 'src' : 'href';
        const value = element.getAttribute(attribute);
        if (value && /^(images|css|js)\//.test(value))
          element.setAttribute(attribute, '../' + value);
      }
      for (const link of document.querySelectorAll('a[href]')) {
        if (link.getAttribute('href').startsWith('#')) continue;
        const target = new URL(link.href);
        if (target.origin === base.origin && target.pathname.startsWith(base.pathname)) {
          link.setAttribute(
            'href',
            '../' + target.pathname.slice(base.pathname.length) + target.search + target.hash
          );
        }
      }
      const destination = path.join(output, language, file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(
        destination,
        await prettier.format(dom.serialize(), { ...formatting, parser: 'html' })
      );
      urls.push(url(file, language));
      // Keep existing root links functional, with a French canonical and usable HTML.
      if (language === 'fr') {
        const alias = new JSDOM(await fs.readFile(destination, 'utf8'));
        for (const element of alias.window.document.querySelectorAll('[src], [href]')) {
          for (const attribute of ['src', 'href']) {
            const value = element.getAttribute(attribute);
            if (value?.startsWith('../')) element.setAttribute(attribute, value.slice(3));
          }
        }
        await fs.writeFile(
          path.join(output, file),
          await prettier.format(alias.serialize(), { ...formatting, parser: 'html' })
        );
        alias.window.close();
      }
      window.close();
    }
  }
  await fs.writeFile(
    path.join(output, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n') +
      '\n</urlset>\n'
  );
  await fs.writeFile(
    path.join(output, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`
  );
  console.log(`Generated ${urls.length} localized pages and 13 legacy aliases in dist/.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
