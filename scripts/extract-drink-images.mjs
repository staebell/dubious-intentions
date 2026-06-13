import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDocument } from '/Users/tylerstaebell/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '/Users/tylerstaebell/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/@napi-rs+canvas@0.1.100/node_modules/@napi-rs/canvas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const pdfPath = '/Users/tylerstaebell/Downloads/Drink Recipes.pdf';
const outDir = path.join(root, 'public', 'images', 'drinks');

const drinkPages = [
  ['el-chupacabra', 3],
  ['pisco-sour', 3],
  ['sugar-cookie-martini', 3],
  ['sidecar', 4],
  ['horsefeather', 27],
  ['cadillac-margarita', 10],
  ['pineapple-jalapeno-margarita', 11],
  ['serrano-pineapple-margarita', 12],
  ['paloma', 16],
  ['tequila-sour', 17],
  ['moscow-mule', 5],
  ['mojito', 22],
  ['french-75', 29],
  ['spicy-frozen-pineapple-margarita', 58],
  ['pina-colada', 59],
  ['miami-vice', 59],
  ['frozen-coconut-mojito', 60],
  ['strawberry-frose', 60],
  ['painkiller', 20],
];

fs.mkdirSync(outDir, { recursive: true });
const pdfData = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await getDocument({ data: pdfData }).promise;

const pageCache = new Map();

for (const [drinkId, pageNumber] of drinkPages) {
  let buffer = pageCache.get(pageNumber);
  if (!buffer) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.7 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const context = canvas.getContext('2d');

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    buffer = canvas.toBuffer('image/jpeg', 0.86);
    pageCache.set(pageNumber, buffer);
  }

  const outPath = path.join(outDir, `${drinkId}.jpg`);
  fs.writeFileSync(outPath, buffer);
  console.log('wrote', outPath);
}
