import fs from 'fs';

// Fetch one page and dump its raw HTML so we can inspect the real structure
const res = await fetch('https://aroombybin.myportfolio.com/lusine-fb');
const html = await res.text();
fs.writeFileSync('debug_lusine.html', html);
console.log('HTML length:', html.length);

// Check what key class names exist
const checks = [
  'project-module',
  'project-modules',
  'rich-text',
  'grid__item',
  'media_collection',
  'embed-aspect',
  'js-lazy',
];
for (const c of checks) {
  const count = (html.match(new RegExp(c, 'g')) || []).length;
  console.log(`"${c}": ${count} occurrences`);
}
