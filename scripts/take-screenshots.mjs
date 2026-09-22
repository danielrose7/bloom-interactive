import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "portfolio");

const sites = [
  { name: "plantiful", url: "https://plantiful.ai/" },
  { name: "goji", url: "https://goji.health/" },
  {
    name: "tote",
    url: "https://tote.tools/",
    prepare: async (page) => {
      await page.evaluate(() => {
        const heading = [...document.querySelectorAll("h1")].find((element) =>
          element.textContent?.includes("Save anything you might buy"),
        );
        const hero = heading?.closest("section");
        const announcement = [...document.querySelectorAll("a")].find((element) =>
          element.textContent?.includes("now on the App Store"),
        );

        announcement?.remove();
        if (hero instanceof HTMLElement) {
          hero.style.paddingTop = "2.25rem";
        }
      });
    },
  },
  { name: "arborbridge", url: "https://www.arborbridge.com/" },
  { name: "tcs-classes", url: "https://www.thecodingspace.com/classes" },
];

async function run() {
  const browser = await puppeteer.launch({ headless: true, channel: "chrome" });
  const requestedSites = new Set(process.argv.slice(2));
  const selectedSites = requestedSites.size
    ? sites.filter((site) => requestedSites.has(site.name))
    : sites;

  for (const site of selectedSites) {
    console.log(`Screenshotting ${site.url}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 30000 });
    await site.prepare?.(page);
    await page.screenshot({
      path: path.join(outDir, `${site.name}.png`),
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    await page.close();
    console.log(`  -> ${site.name}.png`);
  }

  await browser.close();
  console.log("Done!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
