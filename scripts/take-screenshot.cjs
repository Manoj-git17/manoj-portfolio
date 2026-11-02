const path = require('path');
const puppeteer = require('puppeteer-core');

async function takeScreenshot(outputPath = 'screenshot-step.png') {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--enable-webgl'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  // Wait for loading screen counter to complete and fade out
  await new Promise((resolve) => setTimeout(resolve, 2200));

  const targetFile = path.resolve(__dirname, '..', outputPath);
  await page.screenshot({ path: targetFile, fullPage: false });
  console.log('Saved screenshot to:', targetFile);

  await browser.close();
}

const outputFile = process.argv[2] || 'screenshot-step.png';
takeScreenshot(outputFile).catch((err) => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
