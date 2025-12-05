const fs = require("fs");
const path = require("path");

// Ian Flanagan Tricentis 2025

if (process.argv.length < 3) {
  console.error("Usage: node update-product-names.js <path-to-json-file>");
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found - ${filePath}`);
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!Array.isArray(data.products)) {
    console.error("Invalid JSON: 'products' array not found.");
    process.exit(1);
  }

  data.products.forEach((product) => {
    if (product.name && typeof product.name === "string") {
      if (product.name.endsWith("_new")) {
        // Remove "_new"
        product.name = product.name.slice(0, -4);
      } else {
        // Add "_new"
        product.name = `${product.name}_new`;
      }
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
  console.log(`Toggled "_new" suffix for product names in ${filePath}`);
} catch (err) {
  console.error("Error processing file:", err.message);
  process.exit(1);
}

