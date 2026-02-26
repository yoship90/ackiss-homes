import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Admin/Downloads/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2];
const selector = process.argv[3] || '#social';
const label = process.argv[4] || 'section';

const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const existing = fs.readdirSync(outDir).filter(f => f.startsWith('screenshot-'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const filename = `screenshot-${next}-${label}.png`;
const outPath = path.join(outDir, filename);

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:/Users/Admin/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: null,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

console.log(`Navigating to ${url}...`);
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 3000));

// Disable smooth scroll then scroll to section
await page.evaluate((sel) => {
  document.documentElement.style.scrollBehavior = 'auto';
  const el = document.querySelector(sel);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo(0, y);
  }
}, selector);

await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: outPath });
await browser.close();

console.log(`Saved: ${outPath}`);
