const path = require('path');
const sharp = require('sharp');

const origPath = 'C:\\Users\\manoj\\.gemini\\antigravity\\brain\\118683c5-a67e-44d0-8782-bed37d423fec\\.user_uploaded\\media_1793555028887_c90c23cf.jpg';
const outputPath = path.resolve(__dirname, '../public/me.png');

async function createPerfectCutout() {
  const { data, info } = await sharp(origPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Background mask: 1 = background, 0 = foreground
  const isBg = new Uint8Array(width * height);

  function isStudioGrey(x, y) {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const avg = (r + g + b) / 3;
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return avg >= 165 && avg <= 225 && maxDiff <= 16;
  }

  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  function pushSeed(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const pos = y * width + x;
    if (isBg[pos] === 1) return;
    if (isStudioGrey(x, y)) {
      isBg[pos] = 1;
      queue[qTail++] = pos;
    }
  }

  // Outer perimeter seeds
  for (let x = 0; x < width; x++) pushSeed(x, 0);
  for (let y = 0; y < height; y++) {
    pushSeed(0, y);
    pushSeed(width - 1, y);
  }
  for (let x = 0; x < 90; x++) pushSeed(x, height - 1);
  for (let x = width - 90; x < width; x++) pushSeed(x, height - 1);

  // Interior armhole seeds (left & right triangles between inner elbows and waist)
  for (let dy = -15; dy <= 15; dy++) {
    for (let dx = -15; dx <= 15; dx++) {
      pushSeed(230 + dx, 800 + dy);
      pushSeed(715 + dx, 800 + dy);
    }
  }

  // 4-way flood fill
  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const npos = ny * width + nx;
        if (isBg[npos] === 0 && isStudioGrey(nx, ny)) {
          isBg[npos] = 1;
          queue[qTail++] = npos;
        }
      }
    }
  }

  console.log(`Flooded ${qTail} background pixels.`);

  // Create 1-channel raw alpha buffer (0 for background, 255 for foreground)
  const alphaBuffer = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    alphaBuffer[i] = isBg[i] === 1 ? 0 : 255;
  }

  // Anti-alias edge with precise 1px Gaussian blur in 1-channel greyscale
  const featheredAlpha = await sharp(alphaBuffer, { raw: { width, height, channels: 1 } })
    .toColourspace('b-w')
    .blur(0.9)
    .raw()
    .toBuffer();

  // Create RGBA image with smooth bottom gradient fade and edge decontamination
  const outBuffer = Buffer.alloc(width * height * 4);
  const fadeStartY = Math.floor(height * 0.82);

  for (let y = 0; y < height; y++) {
    let fade = 1.0;
    if (y >= fadeStartY) {
      const t = (y - fadeStartY) / (height - fadeStartY);
      fade = 0.5 * (1.0 + Math.cos(t * Math.PI));
    }

    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const rgbIdx = idx * 3;
      const rgbaIdx = idx * 4;

      let r = data[rgbIdx];
      let g = data[rgbIdx + 1];
      let b = data[rgbIdx + 2];
      let a = featheredAlpha[idx];

      if (a < 5) {
        outBuffer[rgbaIdx] = 0;
        outBuffer[rgbaIdx + 1] = 0;
        outBuffer[rgbaIdx + 2] = 0;
        outBuffer[rgbaIdx + 3] = 0;
        continue;
      }

      // Edge defringing: suppress any gray wall spill at boundary
      if (a < 220 && isStudioGrey(x, y)) {
        a = Math.round(a * 0.55);
      }

      const finalAlpha = Math.round(a * fade);

      outBuffer[rgbaIdx] = r;
      outBuffer[rgbaIdx + 1] = g;
      outBuffer[rgbaIdx + 2] = b;
      outBuffer[rgbaIdx + 3] = finalAlpha;
    }
  }

  // Output pristine PNG with optimal compression and no color loss
  await sharp(outBuffer, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Saved pristine cutout to ${outputPath}`);
}

createPerfectCutout().catch(console.error);
