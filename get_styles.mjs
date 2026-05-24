import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://aroombybin.myportfolio.com/work', { waitUntil: 'networkidle2' });

  const computedStyles = await page.evaluate(() => {
    const getStyle = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      return {
        width: comp.width,
        height: comp.height,
        padding: comp.padding,
        margin: comp.margin,
        display: comp.display,
        alignItems: comp.alignItems,
        justifyContent: comp.justifyContent,
        position: comp.position,
        top: comp.top,
        left: comp.left,
        right: comp.right,
        bottom: comp.bottom,
        backgroundColor: comp.backgroundColor,
        color: comp.color,
        fontFamily: comp.fontFamily,
        fontSize: comp.fontSize,
        fontWeight: comp.fontWeight,
        letterSpacing: comp.letterSpacing,
        lineHeight: comp.lineHeight,
        textTransform: comp.textTransform,
      };
    };

    return {
      header: getStyle('.site-header'),
      navContainer: getStyle('.nav-container'),
      navLinks: getStyle('.nav-container a'),
      logoWrap: getStyle('.logo-wrap'),
      logoImg: getStyle('.logo-image img'),
      projectCovers: getStyle('.project-covers'),
      projectCoverItem: getStyle('.project-cover'),
      title: getStyle('.title'),
      date: getStyle('.date'),
      detailsWrap: getStyle('.details-wrap'),
    };
  });

  fs.writeFileSync('computed_styles.json', JSON.stringify(computedStyles, null, 2));
  console.log('Styles saved to computed_styles.json');
  await browser.close();
})();
