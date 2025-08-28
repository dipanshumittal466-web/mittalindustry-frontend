// frontend/pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const baseUrl = "https://mittalindustry.co.in";

  // ---- Fetch Blogs ----
  let blogs = [];
  try {
    const blogRes = await fetch(`${baseUrl}/api/blogs`);
    blogs = await blogRes.json();
  } catch (err) {
    console.error("Blog fetch error:", err);
  }

  // ---- Fetch Products ----
  let products = [];
  try {
    const productRes = await fetch(`${baseUrl}/api/products`);
    products = await productRes.json();
  } catch (err) {
    console.error("Product fetch error:", err);
  }

  // ---- Static routes ----
  const staticRoutes = [
    "/",
    "/cart",
    "/checkout",
    "/blog",
    "/admin/blogs/new"
  ];

  // ---- Build XML ----
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
      </url>`
      )
      .join("")}

    ${blogs
      .map(
        (b) => `
      <url>
        <loc>${baseUrl}/blog/${b.slug}</loc>
      </url>`
      )
      .join("")}

    ${products
      .map(
        (p) => `
      <url>
        <loc>${baseUrl}/product/${p.id}</loc>
      </url>`
      )
      .join("")}
  </urlset>`;

  // ---- Send XML response ----
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null; // Next.js will handle XML response
}
