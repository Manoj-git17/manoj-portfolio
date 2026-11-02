const path = require('path');
const sharp = require('sharp');

async function generateDepthMap() {
  const inputPath = path.join(__dirname, '../public/me.png');
  const outputPath = path.join(__dirname, '../public/me-depth.png');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const depthBuffer = Buffer.alloc(width * height);

  // Anatomical landmark centers (calibrated to Manoj's pose in me.png)
  // Image is 934 x 1024
  const headCenterX = 482;
  const headCenterY = 320;
  const headRadiusX = 140;
  const headRadiusY = 170;

  const noseX = 482;
  const noseY = 350;

  const chestX = 482;
  const chestY = 640;

  const leftShoulderX = 280;
  const leftShoulderY = 540;
  const rightShoulderX = 684;
  const rightShoulderY = 540;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const alpha = data[idx + 3];

      if (alpha < 15) {
        depthBuffer[y * width + x] = 0;
        continue;
      }

      // Base depth profile
      let depth = 110; // Base baseline for body silhouette

      // 1. Head dome depth
      const dxHead = (x - headCenterX) / headRadiusX;
      const dyHead = (y - headCenterY) / headRadiusY;
      const distHeadSq = dxHead * dxHead + dyHead * dyHead;
      if (distHeadSq < 1.0) {
        const headDome = Math.sqrt(Math.max(0, 1.0 - distHeadSq));
        depth = Math.max(depth, 140 + headDome * 100);
      }

      // 2. Nose protrusion
      const distNose = Math.hypot((x - noseX) / 45, (y - noseY) / 50);
      if (distNose < 1.0) {
        depth += (1.0 - distNose) * 20;
      }

      // 3. Neck recession
      if (y >= 440 && y <= 510 && Math.abs(x - headCenterX) < 70) {
        depth = Math.min(depth, 160);
      }

      // 4. Chest and Torso volume
      if (y > 490) {
        const dyChest = (y - chestY) / 260;
        const dxChest = (x - chestX) / 240;
        const chestFactor = Math.max(0, 1.0 - (dxChest * dxChest * 0.8 + dyChest * dyChest * 0.6));
        const chestDepth = 150 + chestFactor * 90;
        depth = Math.max(depth, chestDepth);
      }

      // 5. Shoulder curvature
      const distLeftShoulder = Math.hypot((x - leftShoulderX) / 160, (y - leftShoulderY) / 120);
      if (distLeftShoulder < 1.0 && y > 450) {
        depth = Math.max(depth, 150 + (1.0 - distLeftShoulder) * 50);
      }
      const distRightShoulder = Math.hypot((x - rightShoulderX) / 160, (y - rightShoulderY) / 120);
      if (distRightShoulder < 1.0 && y > 450) {
        depth = Math.max(depth, 150 + (1.0 - distRightShoulder) * 50);
      }

      // 6. Blend high-frequency luminance texture for realistic fabric folds and facial features
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      depth += (luminance - 128) * 0.12;

      // Soft clamp depth between 40 and 255
      depth = Math.min(255, Math.max(40, depth));

      // Feather towards silhouette edge based on alpha
      const alphaNorm = alpha / 255;
      const edgeFeather = Math.min(1.0, alphaNorm * 1.5);
      depthBuffer[y * width + x] = Math.round(depth * edgeFeather);
    }
  }

  // Smooth the depth map using a gentle blur to avoid polygonal stepping
  await sharp(depthBuffer, {
    raw: {
      width,
      height,
      channels: 1,
    },
  })
    .blur(4.5)
    .png()
    .toFile(outputPath);

  console.log('Generated /public/me-depth.png successfully');
}

generateDepthMap().catch(console.error);
