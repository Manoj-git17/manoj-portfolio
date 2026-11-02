const path = require('path');
const puppeteer = require('puppeteer-core');

const filename = process.argv[2] || 'ss-scroll.png';
const width = parseInt(process.argv[3], 10) || 390;
const height = parseInt(process.argv[4], 10) || 844;
const scrollY = parseInt(process.argv[5], 10) || 0;

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--enable-webgl'],
    defaultViewport: { width, height, deviceScaleFactor: 1 },
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  
  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise((r) => setTimeout(r, 1000));
  } else {
    await new Promise((r) => setTimeout(r, 1500));
  }

  const targetFile = path.resolve(__dirname, '..', filename);
  await page.screenshot({ path: targetFile });
  console.log('Saved:', targetFile);
  await browser.close();
})();
