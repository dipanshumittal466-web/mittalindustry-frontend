
// amazonScraper.js
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { createObjectCsvWriter } from "csv-writer";
import fetch from "node-fetch";

// Load config
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const queries = config.queries || ["inverter"];
const pages = config.pages || 1;

async function scrapeAmazon(query, pages) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (let p = 1; p <= pages; p++) {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}&page=${p}`;
    console.log(`🔎 Scraping: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    const products = await page.$$eval("div.s-main-slot div[data-asin]", items =>
      items.map(el => {
        const asin = el.getAttribute("data-asin");
        const title = el.querySelector("h2 a span")?.innerText || "";
        const productUrl = el.querySelector("h2 a")?.href || "";
        const imageUrl = el.querySelector("img")?.src || "";
        const price = el.querySelector(".a-price-whole")?.innerText || "";
        return { asin, title, productUrl, imageUrl, price };
      })
    );

    results.push(...products.filter(p => p.asin));
  }

  await browser.close();
  return results;
}

async function downloadImage(url, filename, folder) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const buffer = await res.buffer();
    fs.writeFileSync(path.join(folder, filename), buffer);
    console.log("📥 Image saved:", filename);
  } catch (err) {
    console.error("⚠️ Error downloading", url, err.message);
  }
}

async function main() {
  let allResults = [];

  for (const q of queries) {
    const r = await scrapeAmazon(q, pages);
    allResults = allResults.concat(r);
  }

  // Output folders
  const outFolder = path.resolve("./scraped_images");
  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

  // Save CSV
  const csvWriter = createObjectCsvWriter({
    path: "scraped_products.csv",
    header: [
      { id: "asin", title: "ASIN" },
      { id: "title", title: "Title" },
      { id: "productUrl", title: "Product URL" },
      { id: "imageUrl", title: "Image URL" },
      { id: "price", title: "Price" }
    ]
  });

  await csvWriter.writeRecords(allResults);
  console.log(`✅ Saved scraped_products.csv with ${allResults.length} rows`);

  // Download images
  for (const p of allResults) {
    if (p.imageUrl) {
      const safeName = `${p.asin || Date.now()}.jpg`;
      await downloadImage(p.imageUrl, safeName, outFolder);
    }
  }
}

main();
