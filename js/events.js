(() => {
  const banner = document.getElementById('event-announcement'),
    list = document.getElementById('event-list');
  if (!banner && !list) return;
  let events = [],
    paused = false;
  const i18n = () => window.ltpeI18n;
  const t = (text) => i18n()?.t(text) || text;
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function eventEnd(event) {
    return Math.max(...event.sessions.map((session) => Date.parse(session.end)));
  }
  function validEvent(event) {
    return (
      /^[a-z0-9-]+$/.test(event.id) &&
      event.title?.fr &&
      event.location &&
      Array.isArray(event.programme) &&
      event.sessions?.length &&
      event.sessions.every(
        (s) =>
          Number.isFinite(Date.parse(s.start)) &&
          Number.isFinite(Date.parse(s.end)) &&
          Date.parse(s.end) > Date.parse(s.start)
      )
    );
  }
  function date(value) {
    return new Date(value).toLocaleDateString(i18n()?.locale || 'fr-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Brussels',
    });
  }
  function time(value) {
    return new Date(value).toLocaleTimeString(i18n()?.locale || 'fr-BE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Brussels',
    });
  }
  function title(event) {
    return event.title[i18n()?.language || 'fr'] || event.title.fr;
  }
  function renderBanner() {
    if (!banner) return;
    const upcoming = events.filter((event) => eventEnd(event) >= Date.now());
    banner.replaceChildren();
    banner.hidden = !upcoming.length;
    if (!upcoming.length) return;
    const inner = element('div', 'announcement-inner');
    inner.appendChild(element('span', 'announcement-label', t('Prochain rendez-vous')));
    const viewport = element('div', 'announcement-viewport'),
      track = element('div', 'announcement-track');
    for (const event of upcoming) {
      const text =
        title(event) +
        ' · ' +
        event.sessions
          .map((s) => date(s.start) + ' · ' + time(s.start) + '–' + time(s.end))
          .join(' / ');
      const link = element('a', '', text);
      link.href = 'evenements.html?lang=' + (i18n()?.language || 'fr') + '#' + event.id;
      track.appendChild(link);
    }
    viewport.appendChild(track);
    inner.appendChild(viewport);
    const pause = element('button', 'announcement-pause', paused ? '▶' : 'Ⅱ');
    pause.type = 'button';
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute(
      'aria-label',
      t(paused ? 'Reprendre le défilement' : 'Mettre le défilement en pause')
    );
    pause.addEventListener('click', () => {
      paused = !paused;
      renderBanner();
    });
    inner.appendChild(pause);
    banner.appendChild(inner);
    banner.classList.toggle('is-paused', paused);
    measureBanner();
  }
  function measureBanner() {
    const viewport = banner?.querySelector('.announcement-viewport'),
      track = banner?.querySelector('.announcement-track');
    if (!viewport || !track) return;
    const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
    track.style.setProperty('--announcement-distance', `${-distance}px`);
    track.style.animationDuration = `${Math.max(20, distance / 28 + 8)}s`;
  }
  function renderList() {
    if (!list) return;
    list.replaceChildren();
    if (!events.length) {
      list.appendChild(element('p', '', t('Aucun événement annoncé pour le moment.')));
      return;
    }
    const sorted = [...events].sort(
      (a, b) => Date.parse(a.sessions[0].start) - Date.parse(b.sessions[0].start)
    );
    let pastHeading = false;
    for (const event of sorted
      .filter((e) => eventEnd(e) >= Date.now())
      .concat(sorted.filter((e) => eventEnd(e) < Date.now()).reverse())) {
      if (eventEnd(event) < Date.now() && !pastHeading) {
        list.appendChild(element('h2', '', t('Événements passés')));
        pastHeading = true;
      }
      const article = element('article', 'event-detail');
      article.id = event.id;
      const details = element('div', 'event-copy');
      details.appendChild(element('h2', '', title(event)));
      const sessions = element('ul', 'event-sessions');
      for (const session of event.sessions) {
        const li = element('li');
        const stamp = element(
          'time',
          '',
          new Date(session.start).toLocaleDateString(i18n()?.locale || 'fr-BE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Europe/Brussels',
          })
        );
        stamp.dateTime = session.start;
        li.append(stamp, element('strong', '', time(session.start) + ' – ' + time(session.end)));
        sessions.appendChild(li);
      }
      details.append(
        sessions,
        element('h3', '', t('Lieu')),
        element('p', '', event.location),
        element('h3', '', t('Programme'))
      );
      const programme = element('ul', 'event-programme');
      for (const item of event.programme) programme.appendChild(element('li', '', t(item)));
      details.appendChild(programme);
      const posters = element('div', 'event-posters');
      for (const poster of event.posters || []) {
        if (!poster.src.startsWith('images/') || /(?:\.\.|:)/.test(poster.src)) continue;
        const figure = element('figure'),
          link = element('a');
        link.href = window.ltpeSiteURL(poster.src);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', t(poster.label) + ' — ' + t('Ouvrir l’affiche'));
        const img = element('img');
        img.src = window.ltpeSiteURL(poster.src);
        img.alt = title(event) + ' — ' + t(poster.label);
        img.loading = 'lazy';
        link.appendChild(img);
        figure.append(link, element('figcaption', '', t(poster.label)));
        posters.appendChild(figure);
      }
      article.append(
        details,
        posters,
        element(
          'p',
          'poster-note',
          t('Les affiches originales sont disponibles en français et en néerlandais.')
        )
      );
      list.appendChild(article);
    }
  }
  function render() {
    renderBanner();
    renderList();
  }
  document.addEventListener('ltpe:languagechange', render);
  window.addEventListener('resize', measureBanner);
  document.fonts?.ready.then(measureBanner);
  window.ltpeEventsReady = fetch(window.ltpeSiteURL('data/events.json'), {
    signal: AbortSignal.timeout(15000),
  })
    .then((response) => {
      if (!response.ok) throw Error('events');
      return response.json();
    })
    .then((data) => {
      events = (Array.isArray(data.events) ? data.events : []).filter(validEvent);
      render();
      if (location.hash)
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView({ block: 'start' });
    })
    .catch(() => {
      /* Preserve the editorial HTML fallback if the catalogue cannot load. */
    });
})();
