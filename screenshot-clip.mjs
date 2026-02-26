import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Admin/Downloads/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2];
const selector = process.argv[3] || '#social';
const label = process.argv[4] || 'clip';

const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const existing = fs.readdirSync(outDir).filter(f => f.startsWith('screenshot-'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const outPath = path.join(outDir, `screenshot-${next}-${label}.png`);

const browser = await puppeteer.launch({
  headless: false,
  executablePath: 'C:/Users/Admin/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
  defaultViewport: null,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 3000));

const clip = await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, width: r.width, height: r.height };
}, selector);

if (clip) {
  await page.screenshot({ path: outPath, clip });
} else {
  await page.screenshot({ path: outPath });
}
await browser.close();
console.log('Saved: ' + outPath);
