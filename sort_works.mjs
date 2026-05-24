import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('work_urls.json', 'utf8'));
const fileContent = fs.readFileSync('src/app/data/works.ts', 'utf8');

// Parse the worksData array out of works.ts
const worksDataMatch = fileContent.match(/export const worksData: Work\[\] = (\[[\s\S]*?\]);/);
if (!worksDataMatch) throw new Error('Could not find worksData');

const worksArray = eval(worksDataMatch[1]);

// Map to the correct order
const sortedWorks = [];
for (const item of urls) {
  const existingWork = worksArray.find(w => w.id === item.slug);
  if (existingWork) {
    sortedWorks.push(existingWork);
  }
}

const newTs = fileContent.replace(
  /export const worksData: Work\[\] = (\[[\s\S]*?\]);/, 
  `export const worksData: Work[] = ${JSON.stringify(sortedWorks, null, 2)};`
);

fs.writeFileSync('src/app/data/works.ts', newTs);
console.log('Successfully sorted works.ts');
