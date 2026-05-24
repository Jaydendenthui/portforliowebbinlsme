import fs from 'fs';

async function run() {
  const res = await fetch('https://aroombybin.myportfolio.com/work');
  const html = await res.text();
  
  const covers = html.split('class="project-cover');
  covers.shift(); // remove everything before the first cover
  
  const works = [];
  
  for (const cover of covers) {
    const linkMatch = cover.match(/href="([^"]+)"/);
    if (!linkMatch) continue;
    
    let slug = linkMatch[1].split('/').pop();
    if (slug.includes('?')) slug = slug.split('?')[0];
    
    const url = `https://aroombybin.myportfolio.com/${slug}`;
    
    // get title
    let title = "";
    const titleMatch = cover.match(/<div class="title[^>]*>([\s\S]*?)<\/div>/);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    }
    
    works.push({ slug, url, title });
  }
  
  fs.writeFileSync('work_urls.json', JSON.stringify(works, null, 2));
  console.log(`Found ${works.length} works in exact order.`);
}

run();
