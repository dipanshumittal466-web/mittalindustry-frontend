
// generateSitemap.js
import fs from "fs";
import path from "path";

const siteUrl = "https://mittalindustry.co.in"; // 👉 अपनी domain डालें
const pagesDir = "../your-website/pages";       // 👉 आपकी website का pages folder
const productsFile = "../your-website/public/data/products.json"; 
const outputFile = "../your-website/public/sitemap.xml";

function getPages() {
  const files = fs.readdirSync(pagesDir);
  return files
    .filter(f => f.endsWith(".js"))
    .map(f => {
      let name = f.replace(".js", "");
      return name === "index" ? siteUrl : `${siteUrl}/${name}`;
    });
}

function getProducts() {
  if (!fs.existsSync(productsFile)) return [];
  const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  return data.map(p => `${siteUrl}/products?id=${p.id}`);
}

function generateSitemap(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(u => `  <url><loc>${u}</loc></url>`)
    .join("\n")}\n</urlset>`;
  fs.writeFileSync(outputFile, xml, "utf-8");
  console.log(`✅ Sitemap generated at ${outputFile} with ${urls.length} URLs`);
}

function main() {
  const pageUrls = getPages();
  const productUrls = getProducts();
  const allUrls = [...pageUrls, ...productUrls];
  generateSitemap(allUrls);
}

main();
