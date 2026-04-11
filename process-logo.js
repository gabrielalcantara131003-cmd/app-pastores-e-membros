const Jimp = require('jimp');

async function processLogo() {
  const imgPath = 'C:\\Users\\gabriel\\.gemini\\antigravity\\brain\\204c6aad-5ceb-4b17-b10b-21d8b1357259\\uploaded_media_1775877566022.img';
  const image = await Jimp.read(imgPath);
  
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log(`Original image: ${w}x${h}`);

  // We want to crop out the text at the bottom.
  // Assuming the text is in the lower 25% of the image.
  // Crop area: x=0, y=0, width=w, height=h*0.75
  const cropH = Math.floor(h * 0.75);
  image.crop(0, 0, w, cropH);

  // Resize to 512x512
  image.contain(512, 512, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
  
  // Add dark background? The user said "remove this white background, leave just the logo".
  // Let's see if we can identify background pixels.
  // If it's a checkerboard rendered, replacing white is hard.
  // If it's transparent, we don't need to do anything.
  
  await image.writeAsync('icon-512.png');
  image.resize(192, 192);
  await image.writeAsync('icon-192.png');
  console.log('Saved icons.');
}

processLogo().catch(console.error);
