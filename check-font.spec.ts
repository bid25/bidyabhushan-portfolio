import { test, expect } from '@playwright/test';

test('check font', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const homeHeroFont = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const span = h1.querySelector('span'); // Inside DecryptedText
    return window.getComputedStyle(span || h1).fontFamily;
  });
  
  await page.goto('http://localhost:3000/projects');
  const projectsHeroFont = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return window.getComputedStyle(h1).fontFamily;
  });
  
  console.log(`\n--- HOME HERO FONT: ${homeHeroFont} ---\n`);
  console.log(`\n--- PROJECTS HERO FONT: ${projectsHeroFont} ---\n`);
});
