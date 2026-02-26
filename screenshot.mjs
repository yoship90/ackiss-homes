import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Admin/Downloads/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2];
const label = process.argv[3] || '';

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const existing = fs.readdirSync(outDir).filter(f => f.startsWith('screenshot-'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const outPath = path.join(outDir, filename);

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:/Users/Admin/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-blink-features=AutomationControlled',
    '--start-maximized',
  ],
  defaultViewport: null,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36');
await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

// Hide webdriver property
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});

console.log(`Navigating to ${url}...`);
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 5000));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
