const fs = require("fs");
const path = require("path");

const siteUrl = "https://mittalindustry.co.in"; // <-- apna domain yaha dalna

// Pages list (jo aapke screenshot me the)
const pages = [
  "/",          // index.js
  "/about",
  "/cart",
  "/checkout",
  "/contact",
  "/login",
  "/orders",
  "/products",
  "/register",
  "/services",
  "/success",
  "/404",
  "/blog",      // folder
  "/product"    // folder
];

function generateSitemap(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (url) => `
  <url>
    <loc>${siteUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("\n") +
    "\n</urlset>";

  const outputPath = path.join(__dirname, "public", "sitemap.xml");

  // public/ folder me sitemap.xml create karega
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`✅ Sitemap generated at ${outputPath} with ${urls.length} URLs`);
}

generateSitemap(pages);
