import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Admin/Downloads/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const outPath = 'C:/Users/Admin/Documents/Claude Projects/Ackiss Homes Website/temporary screenshots/screenshot-10-icons.png';

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:/Users/Admin/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
  defaultViewport: null,
});
const page = await browser.newPage();
await page.setViewport({ width: 800, height: 600 });
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 2000));

// Scroll to the social section
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  const el = document.getElementById('social');
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY + 80;
    window.scrollTo(0, y);
  }
});
await new Promise(r => setTimeout(r, 1500));

// Take a viewport screenshot (not fullPage)
await page.screenshot({ path: outPath });
await browser.close();
console.log('Saved:', outPath);
