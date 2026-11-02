const path = require('path');
const puppeteer = require('puppeteer-core');

async function takeScreenshot(outputPath, width, height) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--enable-webgl'],
    defaultViewport: { width, height, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const targetFile = path.resolve(__dirname, '..', outputPath);
  await page.screenshot({ path: targetFile, fullPage: false });
  console.log('Saved:', targetFile);
  await browser.close();
}

const [, , file, w, h] = process.argv;
takeScreenshot(file, parseInt(w, 10), parseInt(h, 10)).catch((err) => {
  console.error(err);
  process.exit(1);
});
