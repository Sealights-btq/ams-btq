
const fs = require('fs');
const path = require('path');

// Ian Flanagan Tricentis 2025

// Check for 3 file paths as arguments
if (process.argv.length < 5) { // process.argv includes 'node' and the script file itself
  console.error('Usage: node editPaymentService.js <path-to-file1.js> <path-to-file2.js> <path-to-file3.js>');
  process.exit(1);
}

const filePaths = process.argv.slice(2); // Get all file paths from arguments

for (const filePath of filePaths) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found – ${absolutePath}`);
    continue; // Continue to the next file if one is not found
  }

  let content = fs.readFileSync(absolutePath, 'utf8');

  // Check for 'console.log("Calling Function!");' and modify the exclamation mark
  const consoleLogPattern = /console\.log\("Calling Function!"\);/;
  const consoleLogNoExclamationPattern = /console\.log\("Calling Function"\);/;

  if (consoleLogPattern.test(content)) {
    content = content.replace(consoleLogPattern, 'console.log("Calling Function");');
    console.log(`Removed exclamation mark in "console.log('Calling Function!');" in ${absolutePath}`);
  } else if (consoleLogNoExclamationPattern.test(content)) {
    content = content.replace(consoleLogNoExclamationPattern, 'console.log("Calling Function!");');
    console.log(`Added exclamation mark to "console.log('Calling Function');" in ${absolutePath}`);
  } else {
    console.log(`"console.log('Calling Function');" or "console.log('Calling Function!');" not found in ${absolutePath}`);
  }

  fs.writeFileSync(absolutePath, content, 'utf8');
}
