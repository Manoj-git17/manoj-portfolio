const path = require('path');
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: { width: 390, height: 844 },
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('button[aria-label="Open menu"]');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(__dirname, '..', 'ss-mobile-menu-open.png') });
  await browser.close();
  console.log('Saved menu open');
})();
