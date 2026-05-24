import fs from 'fs';
import * as cheerio from 'cheerio';

const URLS = [
  { id: "kuckii-83", url: "https://aroombybin.myportfolio.com/kuckii-83" },
  { id: "ruto-kaiten", url: "https://aroombybin.myportfolio.com/social-post-graphic-design" },
  { id: "ccum9-motion", url: "https://aroombybin.myportfolio.com/ccum-9-social-post" },
  { id: "concert-piece", url: "https://aroombybin.myportfolio.com/concert-piece-2d-motion-graphic" },
  { id: "pride-week", url: "https://aroombybin.myportfolio.com/pride-week-2023-student-council" },
  { id: "once-upon-r", url: "https://aroombybin.myportfolio.com/clubday-sem-c-2023" },
  { id: "acuro", url: "https://aroombybin.myportfolio.com/nbbn" },
  { id: "vinmec", url: "https://aroombybin.myportfolio.com/vinmec-graphic-design" },
  { id: "tet-for-tots", url: "https://aroombybin.myportfolio.com/tet-for-tots" },
  { id: "talabat", url: "https://aroombybin.myportfolio.com/talabat-2d-motion-graphic" },
  { id: "greeniesta", url: "https://aroombybin.myportfolio.com/greeniesta-clubday-semb" },
  { id: "ccum9-graphic", url: "https://aroombybin.myportfolio.com/ccum-9-merchandise-fund-1" },
  { id: "i-guess-insects", url: "https://aroombybin.myportfolio.com/i-guess-insects-interactive-website" },
  { id: "nevertimers", url: "https://aroombybin.myportfolio.com/aiii" },
  { id: "crying", url: "https://aroombybin.myportfolio.com/2d-animation" },
  { id: "illustration", url: "https://aroombybin.myportfolio.com/illustration-posts-illustration" },
  { id: "where-is-my-money", url: "https://aroombybin.myportfolio.com/trailer" },
  { id: "leggo", url: "https://aroombybin.myportfolio.com/leggo" },
  { id: "reminiscin", url: "https://aroombybin.myportfolio.com/reminiscin-3d-animation" },
  { id: "shimmering-hope", url: "https://aroombybin.myportfolio.com/shimmering-hope-3d-animation" },
  { id: "sins", url: "https://aroombybin.myportfolio.com/sins-experimental-video" },
  { id: "vj-3d", url: "https://aroombybin.myportfolio.com/3d" },
  { id: "luna-dao", url: "https://aroombybin.myportfolio.com/luna-dao-83-fanart" },
  { id: "nuong", url: "https://aroombybin.myportfolio.com/nuong-3d-design" },
  { id: "wells", url: "https://aroombybin.myportfolio.com/wells-mi-living-booth-3d-design" },
  { id: "red-thread", url: "https://aroombybin.myportfolio.com/the-red-thread-of-fate" },
  { id: "namo", url: "https://aroombybin.myportfolio.com/namo-fb-photography" },
  { id: "lets-cook", url: "https://aroombybin.myportfolio.com/lets-get-to-cook" },
  { id: "sunset", url: "https://aroombybin.myportfolio.com/sunset-the-light-is-turning" }
];

async function scrapePage(html) {
  const $ = cheerio.load(html);
  
  const title = $('h1.title').text().trim();
  const description = $('p.description').text().trim() || undefined;
  
  function parseModule(el) {
    const $el = $(el);
    
    // Text module
    if ($el.hasClass('project-module-text')) {
      return {
        type: 'text',
        html: $el.find('.rich-text').html()
      };
    }
    
    // Video module
    if ($el.hasClass('project-module-video')) {
      const iframe = $el.find('iframe');
      return {
        type: 'video',
        iframeSrc: iframe.attr('src')
      };
    }
    
    // Image module (media_collection with 1 image) or Image grid
    if ($el.hasClass('project-module-media_collection')) {
      const images = [];
      $el.find('.grid-item-container, .grid__item-container').each((i, gridItem) => {
        const $gi = $(gridItem);
        const img = $gi.find('img.js-lazy');
        const filler = $gi.find('.grid__item-filler');
        
        let flexGrow = $gi.attr('data-flex-grow');
        if (flexGrow) flexGrow = parseFloat(flexGrow);
        else flexGrow = 100;
        
        let aspectPadding = filler.css('padding-bottom') || filler.attr('style');
        if (aspectPadding && typeof aspectPadding === 'string') {
           const match = aspectPadding.match(/padding-bottom:\s*([\d.]+)%/);
           aspectPadding = match ? parseFloat(match[1]) : 56.25;
        } else {
           aspectPadding = 56.25;
        }
        
        images.push({
          src: img.attr('data-src'),
          srcset: img.attr('data-srcset'),
          aspectPadding,
          flexGrow
        });
      });
      
      if (images.length === 1) {
        return {
          type: 'image',
          src: images[0].src,
          srcset: images[0].srcset,
          aspectPadding: images[0].aspectPadding
        };
      } else if (images.length > 1) {
        return {
          type: 'image-grid',
          images
        };
      }
    }
    
    // Tree module (side-by-side)
    if ($el.hasClass('project-module-tree')) {
      const columns = [];
      $el.find('.tree-child-wrapper').each((i, col) => {
        const colModules = [];
        $(col).children('.project-module').each((j, childMod) => {
           const parsed = parseModule(childMod);
           if (parsed) colModules.push(parsed);
        });
        columns.push(colModules);
      });
      return {
        type: 'tree',
        columns
      };
    }
    
    return null;
  }
  
  const sections = [];
  $('#project-modules > .project-module').each((i, el) => {
    const parsed = parseModule(el);
    if (parsed) sections.push(parsed);
  });
  
  return { title, description, sections };
}

async function run() {
  const results = {};
  
  for (const {id, url} of URLS) {
    console.log(`Fetching ${url}...`);
    try {
      const res = await fetch(url);
      const html = await res.text();
      results[id] = await scrapePage(html);
      console.log(`  -> Scraped ${id} (${results[id].sections.length} sections)`);
    } catch (err) {
      console.error(`Error fetching ${id}:`, err);
    }
  }
  
  fs.writeFileSync('./scraped.json', JSON.stringify(results, null, 2));
  console.log('Done! Wrote scraped.json');
}

run();
