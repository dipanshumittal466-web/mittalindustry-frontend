const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.mittalindustry.com";

function generateRobots() {
  const robotsPath = path.join(__dirname, "../public/robots.txt");

  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

  fs.writeFileSync(robotsPath, robotsContent, "utf-8");
  console.log("✅ Robots.txt generated successfully at public/robots.txt");
}

generateRobots();
