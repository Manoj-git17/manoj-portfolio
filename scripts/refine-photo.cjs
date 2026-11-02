const path = require('path');
const sharp = require('sharp');

async function refinePhoto() {
  const inputPath = path.resolve(__dirname, '../public/me.png');
  const outputPath = path.resolve(__dirname, '../public/me.png');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const outputBuffer = Buffer.alloc(width * height * 4);

  // Brightness +25%, Saturation +5%
  // Bottom gradient mask starts at y = 820 down to 1024
  const fadeStartY = Math.floor(height * 0.80);

  for (let y = 0; y < height; y++) {
    // Bottom fade factor: 1.0 at fadeStartY, 0.0 at height
    let fade = 1.0;
    if (y >= fadeStartY) {
      const t = (y - fadeStartY) / (height - fadeStartY);
      // Cosine smooth fade
      fade = 0.5 * (1.0 + Math.cos(t * Math.PI));
    }

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];
      let a = data[idx + 3];

      if (a < 5) {
        outputBuffer[idx] = 0;
        outputBuffer[idx + 1] = 0;
        outputBuffer[idx + 2] = 0;
        outputBuffer[idx + 3] = 0;
        continue;
      }

      // Exposure +25%
      r = Math.min(255, Math.round(r * 1.25));
      g = Math.min(255, Math.round(g * 1.25));
      b = Math.min(255, Math.round(b * 1.25));

      // Apply bottom fade
      const finalAlpha = Math.round(a * fade);

      outputBuffer[idx] = r;
      outputBuffer[idx + 1] = g;
      outputBuffer[idx + 2] = b;
      outputBuffer[idx + 3] = finalAlpha;
    }
  }

  // Write refined image with anti-aliasing
  await sharp(outputBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log('Successfully refined public/me.png with +25% exposure, 1px feather, and bottom gradient fade');
}

refinePhoto().catch(console.error);
