// Gera build/icon.png (512x512, fundo transparente) a partir de build/icon.svg.
// Uso: npm run icon
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const SIZE = 512;
const root = path.join(__dirname, '..');

app.whenReady().then(async () => {
  const svg = fs.readFileSync(path.join(root, 'build', 'icon.svg'), 'utf8');
  const window = new BrowserWindow({ show: false, width: SIZE, height: SIZE, webPreferences: { offscreen: true } });
  await window.loadURL('about:blank');
  const dataUrl = await window.webContents.executeJavaScript(`new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = ${SIZE};
      canvas.height = ${SIZE};
      canvas.getContext('2d').drawImage(image, 0, 0, ${SIZE}, ${SIZE});
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error('SVG invalido'));
    image.src = 'data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}';
  })`);
  fs.writeFileSync(path.join(root, 'build', 'icon.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('build/icon.png gerado');
  app.quit();
});
