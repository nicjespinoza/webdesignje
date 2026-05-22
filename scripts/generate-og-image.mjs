import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '..', 'public', 'images', 'og-image.jpg');

const WIDTH = 1200;
const HEIGHT = 630;

// Colores de la marca (dark theme premium)
const BG_COLOR = { r: 10, g: 10, b: 20 };   // #0a0a14
const ACCENT1 = { r: 147, g: 51, b: 234 };   // #9333ea (purple)
const ACCENT2 = { r: 59, g: 130, b: 246 };   // #3b82f6 (blue)
const WHITE = { r: 255, g: 255, b: 255 };
const GRAY = { r: 160, g: 160, b: 180 };

// Create SVG
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(${BG_COLOR.r},${BG_COLOR.g},${BG_COLOR.b})" />
      <stop offset="100%" style="stop-color:rgb(20,20,40)" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(${ACCENT1.r},${ACCENT1.g},${ACCENT1.b})" />
      <stop offset="100%" style="stop-color:rgb(${ACCENT2.r},${ACCENT2.g},${ACCENT2.b})" />
    </linearGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(${ACCENT1.r},${ACCENT1.g},${ACCENT1.b},0)" />
      <stop offset="50%" style="stop-color:rgba(${ACCENT1.r},${ACCENT1.g},${ACCENT1.b},0.6)" />
      <stop offset="100%" style="stop-color:rgba(${ACCENT2.r},${ACCENT2.g},${ACCENT2.b},0)" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="0" ry="0" />

  <!-- Grid pattern subtle -->
  <g opacity="0.03">
    ${Array.from({length: 20}, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${HEIGHT}" stroke="white" stroke-width="0.5"/>`).join('')}
    ${Array.from({length: 11}, (_, i) => `<line x1="0" y1="${i * 60}" x2="${WIDTH}" y2="${i * 60}" stroke="white" stroke-width="0.5"/>`).join('')}
  </g>

  <!-- Decorative circles -->
  <circle cx="1050" cy="100" r="180" fill="url(#accent)" opacity="0.08" />
  <circle cx="1100" cy="80" r="120" fill="url(#accent)" opacity="0.05" />
  <circle cx="100" cy="500" r="100" fill="url(#accent)" opacity="0.06" />

  <!-- Accent bar top -->
  <rect x="60" y="60" width="80" height="4" rx="2" fill="url(#accent)" />

  <!-- Main title -->
  <text x="60" y="200" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="52" font-weight="700" fill="rgb(${WHITE.r},${WHITE.g},${WHITE.b})" letter-spacing="-1">
    Joseph Espinoza
  </text>
  <text x="60" y="255" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="400" fill="rgb(${GRAY.r},${GRAY.g},${GRAY.b})" letter-spacing="1">
    Full-Stack Developer &amp; AI Engineer
  </text>

  <!-- Services line -->
  <text x="60" y="310" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="18" font-weight="300" fill="rgb(${GRAY.r},${GRAY.g},${GRAY.b})">
    Web Development · AI Solutions · SaaS · E-commerce
  </text>

  <!-- Accent line separator -->
  <rect x="60" y="340" width="200" height="2" rx="1" fill="url(#line)" />

  <!-- Bottom info -->
  <text x="60" y="420" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="16" font-weight="300" fill="rgb(${GRAY.r},${GRAY.g},${GRAY.b})">
    Next.js · React · TypeScript · Node.js · AI
  </text>
  <text x="60" y="460" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="14" font-weight="300" fill="rgba(${GRAY.r},${GRAY.g},${GRAY.b},0.6)">
    webdesignje.com
  </text>

  <!-- Badge -->
  <rect x="880" y="55" width="260" height="36" rx="18" fill="rgba(${ACCENT1.r},${ACCENT1.g},${ACCENT1.b},0.2)" stroke="rgba(${ACCENT1.r},${ACCENT1.g},${ACCENT1.b},0.4)" stroke-width="1" />
  <text x="1010" y="79" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="13" font-weight="600" fill="rgb(${ACCENT1.r},${ACCENT1.g},${ACCENT1.b})" text-anchor="middle">
    🚀 Disponible para proyectos
  </text>
</svg>
`;

async function main() {
  try {
    const svgBuffer = Buffer.from(svg);
    await sharp(svgBuffer)
      .resize(WIDTH, HEIGHT)
      .jpeg({ quality: 95 })
      .toFile(outputPath);
    console.log(`✅ OG Image creada: ${outputPath}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
