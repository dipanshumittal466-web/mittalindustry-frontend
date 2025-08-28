const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.mittalindustry.com";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function generateSitemap() {
  const productsPath = path.join(__dirname, "../public/products.json");
  const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

  if (!fs.existsSync(productsPath)) {
    console.error("products.json not found at", productsPath);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

  let urls = [];

  // Home
  urls.push(`
    <url>
      <loc>${BASE_URL}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`);

  // Products
  products.forEach((p) => {
    const slug = slugify(p.name);
    urls.push(`
    <url>
      <loc>${BASE_URL}/products/${slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n")}
  </urlset>`;

  fs.writeFileSync(sitemapPath, sitemap, "utf-8");
  console.log("✅ Sitemap generated successfully at public/sitemap.xml");
}

generateSitemap();
