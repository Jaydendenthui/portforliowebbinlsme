import fs from 'fs';

const URLS = JSON.parse(fs.readFileSync('work_urls.json', 'utf8'));

function parseModules(html) {
  const sections = [];

  // Find the project-modules block
  const startIdx = html.indexOf('<div id="project-modules">');
  if (startIdx === -1) return sections;
  
  const footerIdx = html.indexOf('class="project-footer"');
  const modulesHtml = footerIdx > -1
    ? html.substring(startIdx, footerIdx)
    : html.substring(startIdx);

  // Split on <div class="project-module module ... — each top-level module
  const moduleChunks = modulesHtml.split(/<div class="project-module module /);
  moduleChunks.shift(); // skip before first module

  for (const chunk of moduleChunks) {
    // Get module type from class string
    const classEnd = chunk.indexOf('"');
    const classes = chunk.substring(0, classEnd);

    // Extract inline padding-top
    let paddingTop = 0;
    const ptMatch = chunk.match(/padding-top:\s*([\d.]+)px/);
    if (ptMatch) paddingTop = parseFloat(ptMatch[1]);

    // ── TEXT MODULE ────────────────────────────────────────────
    if (classes.includes('project-module-text')) {
      // Extract rich-text content — it ends before </div></div> closing the module
      const rtStart = chunk.indexOf('<div class="rich-text');
      if (rtStart === -1) continue;
      
      // Find the inner HTML of rich-text div (everything until its first closing sequence)
      const rtContentStart = chunk.indexOf('>', rtStart) + 1;
      
      // We need to count div depth to find the end of rich-text
      let depth = 1;
      let pos = rtContentStart;
      while (pos < chunk.length && depth > 0) {
        const nextOpen = chunk.indexOf('<div', pos);
        const nextClose = chunk.indexOf('</div>', pos);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          pos = nextOpen + 4;
        } else {
          depth--;
          if (depth > 0) pos = nextClose + 6;
          else pos = nextClose;
        }
      }
      
      const richHtml = chunk.substring(rtContentStart, pos).trim();
      if (richHtml) {
        sections.push({ type: 'text', paddingTop, html: richHtml });
      }
    }

    // ── VIDEO MODULE ───────────────────────────────────────────
    else if (classes.includes('project-module-video')) {
      const iframeSrcMatch = chunk.match(/src="(https:\/\/[^"]+)"/);
      if (!iframeSrcMatch) continue;
      
      let aspectPadding = 56.25;
      const aspectMatch = chunk.match(/padding-bottom:\s*([\d.]+)%/);
      if (aspectMatch) aspectPadding = parseFloat(aspectMatch[1]);
      
      let maxWidth;
      const maxWMatch = chunk.match(/max-width:\s*([\d.]+)px/);
      if (maxWMatch) maxWidth = parseFloat(maxWMatch[1]);

      sections.push({ type: 'video', paddingTop, iframeSrc: iframeSrcMatch[1], aspectPadding, maxWidth });
    }

    // ── IMAGE/MEDIA MODULE ────────────────────────────────────
    else if (classes.includes('project-module-media_collection')) {
      // Split on grid__item-container
      const itemChunks = chunk.split(/<div class="grid__item-container/);
      itemChunks.shift();
      
      const images = [];
      for (const item of itemChunks) {
        // flexGrow from data-flex-grow attribute
        let flexGrow = 100;
        const fgMatch = item.match(/data-flex-grow="([\d.]+)"/);
        if (fgMatch) flexGrow = parseFloat(fgMatch[1]);

        // src from data-src on js-lazy img
        const dataSrcMatch = item.match(/data-src="([^"]+)"/);
        if (!dataSrcMatch) continue;
        
        const dataSrcsetMatch = item.match(/data-srcset="([^"]+)"/);

        // aspect ratio from grid__item-filler padding-bottom
        let aspectPadding = 56.25;
        const apMatch = item.match(/class="grid__item-filler"[^>]*style="padding-bottom:([\d.]+)%/);
        if (apMatch) aspectPadding = parseFloat(apMatch[1]);

        images.push({
          src: dataSrcMatch[1],
          srcset: dataSrcsetMatch ? dataSrcsetMatch[1] : undefined,
          aspectPadding,
          flexGrow,
        });
      }

      if (images.length === 1) {
        sections.push({ type: 'image', paddingTop, src: images[0].src, srcset: images[0].srcset, aspectPadding: images[0].aspectPadding });
      } else if (images.length > 1) {
        sections.push({ type: 'image-grid', paddingTop, images });
      }
    }

    // ── TREE MODULE (side-by-side) ─────────────────────────
    else if (classes.includes('project-module-tree')) {
      // Tree children are nested project-module divs inside .tree-child-wrapper
      const colChunks = chunk.split(/<div class="tree-child-wrapper/);
      colChunks.shift();
      
      const columns = [];
      for (const col of colChunks) {
        // recursively parse the modules inside this column
        // Wrap in a fake project-modules div to reuse our parser
        const fakeHtml = '<div id="project-modules">' + col.replace(/<\/div>\s*$/, '') + '</div>';
        const colSections = parseModules(fakeHtml);
        columns.push(colSections);
      }
      
      if (columns.length > 0) {
        sections.push({ type: 'tree', paddingTop, columns });
      }
    }
  }

  return sections;
}

async function main() {
  const allContent = {};

  for (let i = 0; i < URLS.length; i++) {
    const item = URLS[i];
    console.log(`[${i + 1}/${URLS.length}] Scraping ${item.slug}...`);
    try {
      const res = await fetch(item.url);
      const html = await res.text();
      const sections = parseModules(html);
      allContent[item.slug] = { title: item.title, sections };
      console.log(`  -> ${sections.length} sections (${sections.filter(s => s.type === 'text').length} text, ${sections.filter(s => s.type === 'image' || s.type === 'image-grid').length} image, ${sections.filter(s => s.type === 'video').length} video)`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      allContent[item.slug] = { title: item.title, sections: [] };
    }
  }

  fs.writeFileSync('all_projects_scraped.json', JSON.stringify(allContent, null, 2));
  console.log('\nDone! Wrote all_projects_scraped.json');
}

main();
