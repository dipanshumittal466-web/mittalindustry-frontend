
// generateSitemap.js
import fs from "fs";
import path from "path";

const siteUrl = "https://mittalindustry.co.in"; // 👉 अपनी domain डालें
const pagesDir = "./frontend/pages";       // 👉 आपकी website का pages folder
const productsFile = "./frontend/public/data/products.json"; 
const outputFile = "./frontend/public/sitemap.xml";

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
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u, i) => `
      <url>
        <loc>${u}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${i === 0 ? "daily" : "weekly"}</changefreq>
        <priority>${i === 0 ? "1.0" : "0.8"}</priority>
      </url>`
      )
      .join("\n")}
  </urlset>`;

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
