// Generates tasteful brand-gradient placeholder JPGs for the trial.
// Real photos drop in over the exact same filenames (see public/images/README.md).
// Run: node scripts/generate-placeholders.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const C = {
  moss: "#3B4A25",
  deepForest: "#1C2415",
  mist: "#EDE9DE",
  teal: "#5B7B7A",
  gold: "#C9A24B",
  cream: "#F7F5EF",
};

// filename -> { label, from, to, w, h }
const IMAGES = [
  // Experiences — tea hills (misty green)
  { name: "tea-hills-1", label: "Tea Hills", from: C.teal, to: C.deepForest },
  { name: "tea-hills-2", label: "Sunrise Ridge", from: C.moss, to: C.deepForest },
  { name: "tea-hills-3", label: "Estate Drive", from: C.teal, to: C.moss },
  // Backwaters (bluish teal)
  { name: "backwaters-1", label: "Backwaters", from: C.teal, to: C.deepForest },
  { name: "backwaters-2", label: "Kettuvallam", from: C.moss, to: C.teal },
  { name: "backwaters-3", label: "Sunset Deck", from: C.gold, to: C.teal },
  // Offbeat trails (gold/moss)
  { name: "offbeat-trails-1", label: "Offbeat Trails", from: C.gold, to: C.moss },
  { name: "offbeat-trails-2", label: "Hidden Falls", from: C.moss, to: C.deepForest },
  { name: "offbeat-trails-3", label: "Ridge Route", from: C.teal, to: C.moss },
  // Packages
  { name: "backwater-escape-1", label: "Backwater Escape", from: C.teal, to: C.deepForest },
  { name: "backwater-escape-2", label: "Kumarakom", from: C.moss, to: C.teal },
  { name: "munnar-mist-1", label: "Munnar Mist", from: C.teal, to: C.deepForest },
  { name: "munnar-mist-2", label: "Kolukkumalai", from: C.moss, to: C.deepForest },
  { name: "full-360-kerala-1", label: "Full 360 Kerala", from: C.teal, to: C.moss },
  { name: "full-360-kerala-2", label: "The Full Loop", from: C.gold, to: C.deepForest },
];

const W = 1600;
const H = 1200;

function svg({ label, from, to }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="mist" cx="50%" cy="24%" r="60%">
      <stop offset="0" stop-color="${C.mist}" stop-opacity="0.5"/>
      <stop offset="0.6" stop-color="${C.mist}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#mist)"/>
  <!-- faint layered ridgelines -->
  <path d="M0 820 Q 400 720 800 800 T 1600 780 V1200 H0 Z" fill="${C.deepForest}" opacity="0.25"/>
  <path d="M0 960 Q 500 880 900 940 T 1600 920 V1200 H0 Z" fill="${C.deepForest}" opacity="0.35"/>
  <!-- compass mark -->
  <g transform="translate(${W / 2} ${H / 2 - 40})" opacity="0.9">
    <circle r="70" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="5 9"/>
    <path d="M0 -44 L9 -9 L44 0 L9 9 L0 44 L-9 9 L-44 0 L-9 -9 Z" fill="${C.gold}"/>
  </g>
  <text x="${W / 2}" y="${H / 2 + 110}" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="52" letter-spacing="4"
    fill="${C.cream}" opacity="0.92">${label.toUpperCase()}</text>
  <text x="${W / 2}" y="${H / 2 + 160}" text-anchor="middle"
    font-family="monospace" font-size="22" letter-spacing="6"
    fill="${C.gold}" opacity="0.85">MUNNAR 360°  ·  PLACEHOLDER</text>
</svg>`;
}

await mkdir(OUT, { recursive: true });

for (const img of IMAGES) {
  const buf = Buffer.from(svg(img));
  await sharp(buf)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, `${img.name}.jpg`));
  console.log("wrote", `${img.name}.jpg`);
}
console.log(`\nDone — ${IMAGES.length} placeholders in public/images/`);
