const fs = require('fs');

// Ian Flanagan Tricentis 2025

// --- Require exactly 2 file paths ---
const file1Path = process.argv[2];
const file2Path = process.argv[3];

if (!file1Path || !file2Path) {
  console.error('Usage: node editCurrencyServiceServerFile.js <file1-path> <file2-path>');
  process.exit(1);
}

/**
 * Process one file: toggle "Calling Function" exclamation point
 */
function processFile(filePath) {
  try {
    const originalContent = fs.readFileSync(filePath, 'utf8');

    // Match console.log("Calling Function") with optional !
    const regex = /(console\.log\("Calling Function)(!)?("\);)/g;

    const newContent = originalContent.replace(regex, (match, before, exclamation, after) => {
      return exclamation ? `${before}${after}` : `${before}!${after}`;
    });

    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Toggled exclamation point in: ${filePath}`);
    } else {
      console.log(`No changes in: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}: ${err.message}`);
  }
}

// --- Process both files ---
processFile(file1Path);
processFile(file2Path);
