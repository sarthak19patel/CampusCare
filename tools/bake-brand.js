const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const imgPath = path.join(projectRoot, 'gla-logo.webp');
    const cssPath = path.join(projectRoot, 'styles', 'premium.css');

    if (!fs.existsSync(imgPath)) {
      console.error('gla-logo.webp not found at', imgPath);
      process.exit(1);
    }
    if (!fs.existsSync(cssPath)) {
      console.error('styles/premium.css not found at', cssPath);
      process.exit(1);
    }

    // Load, resize, and extract raw pixel data
    const data = await sharp(imgPath)
      .resize(40, 40)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = data.data;
    const { channels } = data.info;

    const counts = Object.create(null);
    for (let i = 0; i < pixels.length; i += channels) {
      const r = pixels[i] >> 4;
      const g = pixels[i + 1] >> 4;
      const b = pixels[i + 2] >> 4;
      const key = (r << 8) | (g << 4) | b;
      counts[key] = (counts[key] || 0) + 1;
    }

    const buckets = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const toHex = (k) => {
      const ki = Number(k) || 0;
      const r = ((ki >> 8) & 0xf) << 4;
      const g = ((ki >> 4) & 0xf) << 4;
      const b = (ki & 0xf) << 4;
      const toHexByte = (n) => n.toString(16).padStart(2, '0');
      return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
    };

    const primary = toHex(buckets[0]);
    const secondary = toHex(buckets[1] || buckets[0]);
    const accent = toHex(buckets[2] || buckets[1] || buckets[0]);

    console.log('Sampled colors:', primary, secondary, accent);

    let css = fs.readFileSync(cssPath, 'utf8');

    // Replace or insert brand variables in :root. Attempt to replace existing definitions first.
    const replaceVar = (name, value) => {
      const re = new RegExp(`(--${name}:)\\s*#[0-9A-Fa-f]{3,6}\\s*;`);
      if (re.test(css)) {
        css = css.replace(re, `$1 ${value};`);
      } else {
        // fallback: insert into first :root block
        css = css.replace(/:root\s*{/, `:root {\n  --${name}: ${value};`);
      }
    };

    replaceVar('brand-primary', primary);
    replaceVar('brand-secondary', secondary);
    replaceVar('brand-accent', accent);

    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Updated', cssPath, 'with sampled brand colors.');
  } catch (err) {
    console.error('Error sampling/baking brand colors:', err);
    process.exit(1);
  }
}

run();
