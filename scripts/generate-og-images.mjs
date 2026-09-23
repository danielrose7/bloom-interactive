/**
 * Generate committed Open Graph images for Bloom's primary shareable routes.
 *
 *   pnpm og:generate
 *
 * The images are ordinary 1200x630 PNGs so link unfurlers do not depend on a
 * runtime image service. Add an entry to CARDS when a route needs its own card.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const LOGO = `file://${join(ROOT, "public/images/bloom-logo.png")}`;

const CARDS = [
  {
    dir: "app",
    eyebrow: "Principal full-stack developer + CTO",
    headline: "Build it [[better.]]\nBuild it faster.",
    alt: "Daniel Rose at Bloom Interactive — Build it better. Build it faster.",
  },
  {
    dir: "app/portfolio",
    eyebrow: "Selected work",
    headline: "If it’s on the internet,\nwe can [[build it]][[*]]",
    footnote: "*Or at least figure out how to, quickly.",
    alt: "Daniel Rose at Bloom Interactive — If it’s on the internet, we can build it. Or at least figure out how to, quickly.",
  },
  {
    dir: "app/playground",
    eyebrow: "Building better buttons",
    headline: "Playground",
    subheadline: "Tiny, joy-filled projects.",
    footnote: "Most of my recent work is private.",
    alt: "Daniel Rose at Bloom Interactive — Playground. Tiny, joy-filled projects. Most of my recent work is private.",
  },
];

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll('"', "&quot;");

function headlineHtml(headline) {
  return escapeHtml(headline)
    .replace(/\[\[\*\]\]/g, '<sup>*</sup>')
    .replace(/\[\[(.+?)\]\]/g, '<span class="accent">$1</span>')
    .replaceAll("\n", "<br>");
}

function cardHtml(card) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
    body {
      position: relative;
      background: #071b27;
      color: #f7fbfd;
      font-family: Inter, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    body::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(191,229,242,.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(191,229,242,.045) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .ghost {
      position: absolute;
      right: -145px;
      bottom: -250px;
      width: 660px;
      height: 660px;
      border: 92px solid rgba(88,201,236,.075);
      border-radius: 50%;
    }
    .ghost::after {
      content: "b";
      position: absolute;
      left: 54px;
      top: -158px;
      color: rgba(88,201,236,.075);
      font-size: 690px;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -.12em;
    }
    header {
      position: absolute;
      top: 52px;
      left: 64px;
      right: 64px;
      display: flex;
      align-items: center;
    }
    .logo { width: 54px; height: 54px; border-radius: 11px; }
    .wordmark { margin-left: 16px; font-size: 30px; font-weight: 780; letter-spacing: -.035em; }
    .brand-separator { color: #58c9ec; }
    .domain { margin-left: auto; color: #7895a3; font-size: 18px; font-weight: 650; letter-spacing: .14em; text-transform: uppercase; }
    .eyebrow {
      position: absolute;
      left: 64px;
      top: 214px;
      display: flex;
      align-items: center;
      gap: 18px;
      color: #58c9ec;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .eyebrow::before { content: ""; width: 46px; height: 2px; background: currentColor; }
    h1 {
      position: absolute;
      left: 58px;
      top: 258px;
      width: 1000px;
      margin: 0;
      font-size: 94px;
      font-weight: 800;
      line-height: .94;
      letter-spacing: -.06em;
    }
    .accent { color: #58c9ec; }
    sup { position: relative; top: -.45em; margin-left: .08em; font-size: .38em; color: #58c9ec; }
    .subheadline { position: absolute; left: 64px; top: 385px; color: #58c9ec; font-size: 48px; font-weight: 750; letter-spacing: -.035em; }
    .footnote { position: absolute; left: 64px; bottom: 62px; color: #7895a3; font-size: 17px; font-weight: 600; }
    .rule { position: absolute; left: 64px; right: 64px; bottom: 44px; height: 1px; background: rgba(191,229,242,.2); }
  </style></head><body>
    <div class="ghost"></div>
    <header><img class="logo" src="${LOGO}"><span class="wordmark">Daniel Rose <span class="brand-separator">·</span> Bloom Interactive</span><span class="domain">gobloom.io</span></header>
    <div class="eyebrow">${escapeHtml(card.eyebrow)}</div>
    <h1>${headlineHtml(card.headline)}</h1>
    ${card.subheadline ? `<div class="subheadline">${escapeHtml(card.subheadline)}</div>` : ""}
    ${card.footnote ? `<div class="footnote">${escapeHtml(card.footnote)}</div>` : ""}
    <div class="rule"></div>
  </body></html>`;
}

const tempDir = mkdtempSync(join(tmpdir(), "bloom-og-"));
const only = process.env.OG_ONLY;

for (const card of CARDS.filter(({ dir }) => !only || dir.endsWith(only))) {
  const htmlPath = join(tempDir, "card.html");
  const outputPath = join(ROOT, card.dir, "opengraph-image.png");
  mkdirSync(join(ROOT, card.dir), { recursive: true });
  writeFileSync(htmlPath, cardHtml(card));
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=1000",
    `--screenshot=${outputPath}`,
    `file://${htmlPath}`,
  ], { stdio: "ignore" });
  writeFileSync(join(ROOT, card.dir, "opengraph-image.alt.txt"), `${card.alt}\n`);
  console.log(`Generated ${card.dir}/opengraph-image.png`);
}
