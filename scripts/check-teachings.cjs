const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const context = vm.createContext({
  window: {},
  document: { addEventListener() {} },
});

vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/youtube-api.js'), 'utf8'), context);

const fixtures = [
  ['Culte de célébration | Pasteur Martin', 'culte'],
  ['Réunion de prières | Frère Yves', 'priere'],
  ['Étude Biblique | Frère Abel', 'etude'],
  ['Nuit de Grâce — Veillée de prières', 'priere'],
  ['Culte : la puissance de la prière', 'culte'],
  ['Le Temple du Plein Evangile - L.TPE', ''],
].map(([title, category], index) => ({
  id: `abcdefghij${index}`,
  title,
  category,
  description: 'Programme : culte, réunion de prière et étude biblique chaque semaine.',
  publishedAt: `2026-11-${String(index + 1).padStart(2, '0')}T12:00:00Z`,
}));

for (const video of fixtures) {
  assert.equal(context.teachingCategory(video), video.category, video.title);
}

for (const [query, category] of [
  ['Prière', 'priere'],
  ['prieres', 'priere'],
  ['gebed', 'priere'],
  ['prayer', 'priere'],
  ['Culte', 'culte'],
  ['dienst', 'culte'],
  ['Etude', 'etude'],
  ['bible study', 'etude'],
]) {
  const results = context.filteredTeachings(fixtures, query);
  assert(results.length > 0, query);
  assert(
    results.every((video) => video.category === category),
    query
  );
}

assert.equal(context.filteredTeachings(fixtures, 'Martin').length, 1);
assert.equal(context.filteredTeachings(fixtures, '', 'etude').length, 1);
assert.equal(context.filteredTeachings(fixtures, 'priere', 'culte').length, 0);
assert.equal(context.filteredTeachings(fixtures, 'no-such-title').length, 0);
assert.equal(context.filteredTeachings(fixtures, '', '', 'oldest')[0].id, fixtures[0].id);
assert.equal(context.filteredTeachings(fixtures)[0].id, fixtures.at(-1).id);

const hostileTitle = { ...fixtures[0], title: '<img src=x onerror="alert(1)">' };
assert(context.createSermonCard(hostileTitle).includes('&lt;img'));
assert.equal(context.createSermonCard({ ...fixtures[0], id: '"><script>' }), '');

console.log(
  'Teaching categories, polluted descriptions, multilingual searches, sorting and HTML escaping: OK'
);
