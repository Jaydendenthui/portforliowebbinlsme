import fs from 'fs';

async function run() {
  const res = await fetch('https://aroombybin.myportfolio.com/work');
  const html = await res.text();
  
  const aspectRatios = {};
  
  // Split into project covers
  const covers = html.split('class="project-cover');
  covers.shift(); // remove everything before the first cover
  
  for (const cover of covers) {
    const linkMatch = cover.match(/href="([^"]+)"/);
    if (!linkMatch) continue;
    
    let slug = linkMatch[1].split('/').pop();
    if (slug.includes('?')) slug = slug.split('?')[0];
    
    // Sometimes the aspect ratio is dynamically loaded in a <style> tag specific to the project cover
    // It looks like: .pXXX .cover-image:before { padding-bottom: XY% }
    // or it's an inline style: style="padding-bottom: 56.25%"
    const padMatch = cover.match(/padding-bottom:\s*([\d.]+)%/);
    if (padMatch) {
      aspectRatios[slug] = padMatch[1];
    } else {
      aspectRatios[slug] = "56.25"; // fallback
    }
  }
  
  fs.writeFileSync('aspect_ratios.json', JSON.stringify(aspectRatios, null, 2));
  console.log('Saved aspect ratios!');
}

run();
