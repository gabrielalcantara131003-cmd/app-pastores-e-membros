const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function createIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Load the newly generated image (it has a #0f172a background and no text)
  const imgPath = 'C:\\Users\\gabriel\\.gemini\\antigravity\\brain\\204c6aad-5ceb-4b17-b10b-21d8b1357259\\church_logo_new_1775877604852.png';
  const img = await loadImage(imgPath);

  // We want to make the #0f172a background transparent if possible, or keep it dark. 
  // The user said "remove white background". Our new image doesn't have white background, it's dark.
  // We'll keep the dark background for a premium app icon look, but if we need transparency, we can chroma key.
  // Actually, let's keep the dark background because it fits the app perfectly, and just draw it.
  
  // Fill solid background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, size, size);

  // Draw logo image in the center, scaled down slightly to leave room for text
  const padding = size * 0.15;
  const drawAreaY = padding;
  const drawAreaW = size - (padding * 2);
  const drawAreaH = size - (padding * 2.5); // leave more room at bottom
  
  ctx.drawImage(img, padding, drawAreaY, drawAreaW, drawAreaH);

  // Draw text "App para pastores e membros"
  ctx.fillStyle = '#e2e8f0'; // light gray/silver text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  
  // Font sizes relative to image size
  const fontSize1 = Math.floor(size * 0.045);
  const fontSize2 = Math.floor(size * 0.055);
  
  ctx.font = `bold ${fontSize2}px Arial, sans-serif`;
  ctx.fillStyle = '#eab308'; // gold
  ctx.fillText('MINISTERIAL', size / 2, size - (size * 0.12));
  
  ctx.font = `${fontSize1}px Arial, sans-serif`;
  ctx.fillStyle = '#94a3b8'; // gray
  ctx.fillText('App para pastores e membros', size / 2, size - (size * 0.05));

  // Save to file
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
  return new Promise(resolve => out.on('finish', resolve));
}

(async () => {
  try {
    await createIcon(512, 'icon-512.png');
    await createIcon(192, 'icon-192.png');
    console.log('Icons generated successfully.');
  } catch (err) {
    console.error(err);
  }
})();
