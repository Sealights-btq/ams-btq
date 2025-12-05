
const fs = require("fs");
const path = require("path");

// Ian Flanagan Tricentis 2025

// Check if exactly one file path argument is provided
if (process.argv.length !== 4) {
  console.error("Usage: node editProductCatalogService.js <file_path> <file_path>2");
  process.exit(1);
}

// Resolve the absolute path of the input file
const filePath = path.resolve(process.argv[2]);

/**
 * Processes a single file, toggling the exclamation mark
 * in the string "fmt.Println(\"Calling Function\")"
 * @param {string} filePath - The path to the file to be processed
 */
function processFile(filePath) {
  try {
    // Read the file content synchronously using UTF-8 encoding
    let content = fs.readFileSync(filePath, "utf8");

    // Define the target strings with and without the exclamation mark
    const targetWithExcl = 'fmt.Println("Calling Function!")';
    const targetNoExcl = 'fmt.Println("Calling Function")';

    // Check if the content contains the target string with an exclamation mark
    if (content.includes(targetWithExcl)) {
      // If found, replace it with the string without the exclamation mark
      content = content.replace(targetWithExcl, targetNoExcl);
      console.log(`Removed exclamation mark after "Function" in ${filePath}`);
    } else if (content.includes(targetNoExcl)) {
      // If the string without the exclamation mark is found, add it back
      content = content.replace(targetNoExcl, targetWithExcl);
      console.log(`Added exclamation mark after "Function" in ${filePath}`);
    } else {
      // If neither target string is found, log a message
      console.log(`Target line not found in ${filePath}`);
    }

    // Write the modified content back to the file
    fs.writeFileSync(filePath, content, "utf8");
  } catch (err) {
    // Handle any errors during file processing
    console.error(`Error processing file ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

// Process the single file specified as an argument
processFile(filePath);
