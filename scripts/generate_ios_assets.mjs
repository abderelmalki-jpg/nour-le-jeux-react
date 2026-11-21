// Génère l'icône App Store (1024x1024, sans transparence) et les écrans de lancement iOS
// à partir de public/logo.png. Usage : node scripts/generate_ios_assets.mjs
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logo = path.join(root, 'public', 'logo.png');
const assets = path.join(root, 'ios', 'App', 'App', 'Assets.xcassets');
const BG = '#0e0b14'; // même couleur que theme-color dans index.html

// Icône : l'App Store refuse toute transparence -> on aplatit sur le fond de l'app.
await sharp(logo)
  .resize(1024, 1024, { fit: 'cover' })
  .flatten({ background: BG })
  .removeAlpha()
  .png()
  .toFile(path.join(assets, 'AppIcon.appiconset', 'AppIcon-512@2x.png'));

// Splash : logo centré (~40 % de la largeur) sur fond uni.
const size = 2732;
const inner = Math.round(size * 0.4);
const logoBuf = await sharp(logo).resize(inner, inner, { fit: 'contain', background: BG }).flatten({ background: BG }).toBuffer();
const splash = await sharp({ create: { width: size, height: size, channels: 3, background: BG } })
  .composite([{ input: logoBuf, gravity: 'center' }])
  .png()
  .toBuffer();

for (const f of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
  await sharp(splash).toFile(path.join(assets, 'Splash.imageset', f));
}
console.log('Assets iOS générés.');
