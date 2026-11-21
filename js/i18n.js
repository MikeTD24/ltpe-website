(() => {
  'use strict';
  const supported = ['fr', 'nl', 'en'];
  const normalize = (s) => s.replace(/\s+/g, ' ').trim();
  const dictionary = new Map(
    (window.LTPE_TRANSLATIONS || []).map((row) => [normalize(row[0]), row])
  );
  const states = new WeakMap(),
    attrStates = new WeakMap();
  const query = new URLSearchParams(location.search).get('lang');
  const script = document.querySelector('script[src$="js/i18n.js"]');
  const siteRoot = new URL('../', script ? script.src : new URL('js/i18n.js', location.href));
  const staticLanguage = document.documentElement.dataset.staticLanguage;
  const filename = location.pathname.split('/').pop() || 'index.html';
  window.ltpeSiteURL = (path) => new URL(path, siteRoot).href;
  function languageURL(code, page = filename) {
    const url = new URL(`${code}/${page}`, siteRoot);
    url.hash = location.hash;
    return url;
  }
  let language = staticLanguage || (supported.includes(query) ? query : 'fr');
  function t(source, variables = {}) {
    const normalized = normalize(source),
      row = dictionary.get(normalized);
    let result = row ? row[supported.indexOf(language)] : normalized;
    // Page titles keep the church's official name.
    if (!row && language !== 'fr') {
      for (const separator of [
        ' — Le Temple du Plein Évangile',
        ' - Le Temple du Plein Évangile',
      ]) {
        if (normalized.endsWith(separator))
          result = t(normalized.slice(0, -separator.length)) + ' — Le Temple du Plein Évangile';
      }
      if (normalized.startsWith('Pasteur Martin '))
        result =
          (language === 'nl' ? 'Voorganger Martin ' : 'Pastor Martin ') + normalized.slice(15);
      if (normalized.startsWith('Frère '))
        result = (language === 'nl' ? 'Broeder ' : 'Brother ') + normalized.slice(6);
    }
    return result.replace(/\{(\w+)\}/g, (match, key) =>
      variables[key] === undefined ? match : String(variables[key])
    );
  }
  function translated(raw) {
    return raw.replace(/\S[\s\S]*\S|\S/, (value) => t(value));
  }
  function excluded(element) {
    return (
      !element || element.closest('script,style,noscript,[data-no-translate],.language-switch')
    );
  }
  function translateNode(node) {
    if (excluded(node.parentElement) || !node.data.trim()) return;
    let state = states.get(node);
    if (!state || node.data !== state.last) state = { source: node.data };
    const output = translated(state.source);
    if (node.data !== output) node.data = output;
    state.last = output;
    states.set(node, state);
  }
  function translateElement(element) {
    if (excluded(element)) return;
    const attrs = ['alt', 'title', 'placeholder', 'aria-label'];
    if (element.matches('meta[name="description"]')) attrs.push('content');
    const savedAttrs = attrStates.get(element) || {};
    for (const attr of attrs) {
      if (!element.hasAttribute(attr)) continue;
      const current = element.getAttribute(attr);
      const state =
        savedAttrs[attr] && current === savedAttrs[attr].last
          ? savedAttrs[attr]
          : { source: current };
      state.last = translated(state.source);
      savedAttrs[attr] = state;
      if (current !== state.last) element.setAttribute(attr, state.last);
    }
    attrStates.set(element, savedAttrs);
  }
  function translate(root = document.documentElement) {
    if (root.nodeType === Node.TEXT_NODE) {
      translateNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    translateElement(root);
    for (const element of root.querySelectorAll(
      '[alt],[title],[placeholder],[aria-label],meta[name="description"]'
    ))
      translateElement(element);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateNode(node);
  }
  function updateLinks() {
    for (const link of document.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) continue;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || !url.pathname.endsWith('.html')) continue;
      if (link.closest('.language-switch')) continue;
      const target = languageURL(language, url.pathname.split('/').pop());
      target.hash = url.hash;
      link.setAttribute('href', target.href);
    }
  }
  const switcher = document.querySelector('.language-switch') || document.createElement('div');
  switcher.className = 'language-switch';
  switcher.setAttribute('role', 'group');
  switcher.replaceChildren();
  for (const code of supported) {
    const button = document.createElement('a');
    button.lang = code;
    button.textContent = code.toUpperCase();
    button.href = languageURL(code).href;
    button.setAttribute('aria-label', { fr: 'Français', nl: 'Nederlands', en: 'English' }[code]);
    switcher.appendChild(button);
  }
  document.querySelector('.header-actions')?.appendChild(switcher);
  let observer;
  function setLanguage(code) {
    if (!supported.includes(code)) return;
    if (!window.LTPE_BUILD && code !== language) {
      location.assign(languageURL(code).href);
      return;
    }
    observer?.disconnect();
    language = code;
    document.documentElement.lang = code;
    try {
      localStorage.setItem('ltpe-language', code);
    } catch {}
    switcher.setAttribute('aria-label', t('Langue du site'));
    for (const button of switcher.children)
      button.setAttribute('aria-current', button.lang === code ? 'page' : 'false');
    translate();
    updateLinks();
    document.dispatchEvent(new CustomEvent('ltpe:languagechange', { detail: { language: code } }));
    observer?.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
  window.ltpeI18n = {
    t,
    translate,
    get language() {
      return language;
    },
    get locale() {
      return { fr: 'fr-BE', nl: 'nl-BE', en: 'en-GB' }[language];
    },
    setLanguage,
  };
  setLanguage(language);
  if (!window.LTPE_BUILD && supported.includes(query)) {
    location.replace(languageURL(query).href);
  }
  observer = new MutationObserver((records) => {
    observer.disconnect();
    if (!window.document?.documentElement) return;
    const roots = new Set();
    for (const record of records) {
      if (record.type === 'characterData') roots.add(record.target);
      else for (const node of record.addedNodes) roots.add(node);
    }
    for (const root of roots) translate(root);
    updateLinks();
    observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  });
  observer.observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
})();
