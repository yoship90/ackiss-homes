import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Admin/Downloads/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const url = process.argv[2];

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:/Users/Admin/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
  defaultViewport: null,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36');
await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});

console.log(`Loading ${url}...`);
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 4000));

// Click "Show all reviews" button
try {
  const allReviewsBtn = await page.$('a[href*="reviews"], button');
  const buttons = await page.$$('a, button');
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.innerText);
    if (text && text.toLowerCase().includes('show all reviews')) {
      console.log('Clicking "Show all reviews"...');
      await btn.click();
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }
} catch(e) {
  console.log('Could not find Show all reviews button:', e.message);
}

// Now click all "Show more" buttons to expand reviews
const showMoreButtons = await page.$$('button, span, a');
let expanded = 0;
for (const btn of showMoreButtons) {
  try {
    const text = await btn.evaluate(el => el.innerText?.trim());
    if (text === 'Show more') {
      await btn.click();
      await new Promise(r => setTimeout(r, 300));
      expanded++;
    }
  } catch(e) {}
}
console.log(`Expanded ${expanded} "Show more" items`);

await new Promise(r => setTimeout(r, 1000));

// Extract all review blocks
const reviews = await page.evaluate(() => {
  const results = [];
  const text = document.body.innerText;
  return text;
});

console.log('\n=== FULL PAGE TEXT AFTER EXPANSION ===\n');
console.log(reviews);

await browser.close();
