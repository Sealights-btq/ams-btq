const fs = require("fs");
const path = require("path");

// Ian Flanagan Tricentis 2025

// Expect exactly 3 arguments after "node script.js"
if (process.argv.length !== 5) {
  console.error("Usage: node editShippingService.js <file1> <file2> <file3>");
  process.exit(1);
}

const filePaths = process.argv.slice(2).map(file => path.resolve(file));

filePaths.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    const targetWithExcl = 'fmt.Println("Calling Function!")';
    const targetWithoutExcl = 'fmt.Println("Calling Function")';

    if (content.includes(targetWithExcl)) {
      // Remove the exclamation mark
      content = content.replace(targetWithExcl, targetWithoutExcl);
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Removed exclamation mark in: ${filePath}`);
    } else if (content.includes(targetWithoutExcl)) {
      // Add the exclamation mark
      content = content.replace(targetWithoutExcl, targetWithExcl);
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Added exclamation mark in: ${filePath}`);
    } else {
      console.log(`No matching line found in: ${filePath}`);
    }

  } catch (err) {
    console.error(`Error reading or writing file '${filePath}': ${err.message}`);
    process.exit(1);
  }
});
