// generateSitemap.js
import fs from "fs";
import path from "path";

const siteUrl = "https://mittalindustry.co.in"; 
const pagesDir = "./pages"; 
const productsFile = "./public/data/products.json";
const outputFile = "./public/sitemap.xml";

function getPages() {
  const files = fs.readdirSync(pagesDir);

  return files
    .filter(f => f.endsWith(".js"))
    .map(f => {
      let name = f.replace(".js", "");

      // ❌ इन pages को exclude कर दो
      if (["_app", "_document", "404"].includes(name)) return null;

      // ✅ बाकी pages sitemap में डालो
      return name === "index" ? `${siteUrl}/` : `${siteUrl}/${name}`;
    })
    .filter(Boolean); // null हटा देगा
}

function getProducts() {
  if (!fs.existsSync(productsFile)) return [];
  const data = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  return data.map(p => `${siteUrl}/products?id=${p.id}`);
}

function generateSitemap() {
  const pages = getPages();
  const products = getProducts();
  const urls = [...pages, ...products];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;

  fs.writeFileSync(outputFile, sitemap, "utf-8");
  console.log("✅ Sitemap generated at", outputFile);
}

generateSitemap();
