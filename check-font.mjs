import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const homeHeroFont = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const span = h1.querySelector('span'); // Inside DecryptedText
    return window.getComputedStyle(span || h1).fontFamily;
  });
  
  await page.goto('http://localhost:3000/projects', { waitUntil: 'networkidle0' });
  const projectsHeroFont = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return window.getComputedStyle(h1).fontFamily;
  });
  
  console.log(`Home Hero Font: ${homeHeroFont}`);
  console.log(`Projects Hero Font: ${projectsHeroFont}`);
  
  await browser.close();
})();
