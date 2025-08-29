
// updater.js
import fs from "fs";
import csvParser from "csv-parser";

const scrapedCSV = "scraped_products.csv";
// 👉 आपकी website का सही path (adjust if needed)
const outputJSON = "../your-website/public/data/products.json"; 

let products = [];
let idCounter = 1;

fs.createReadStream(scrapedCSV)
  .pipe(csvParser())
  .on("data", (row) => {
    products.push({
      id: idCounter++,
      name: row.Title || "Unnamed Product",
      price: row.Price ? parseInt(row.Price.replace(/,/g, "")) : 0,
      rating: 4.0, // default rating
      category: "Imported", // fallback category
      short: "Imported from Amazon",
      image: row["Image URL"] || ""
    });
  })
  .on("end", () => {
    fs.writeFileSync(outputJSON, JSON.stringify(products, null, 2), "utf-8");
    console.log(`✅ Updated ${outputJSON} with ${products.length} products`);
  });
