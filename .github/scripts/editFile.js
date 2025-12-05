const fs = require('fs');
const path = require('path');

// Ian Flanagan Tricentis 2025

if (process.argv.length < 3) {
  console.error('Usage: node editFile.js <path-to-java-file>');
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found - ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Regex to match the target line, capturing if '!' is present
const regex = /System\.err\.println\("\*\*\* server shut down(!?)"\);/;

const updatedContent = content.replace(regex, (match, exclamation) => {
  if (exclamation === '!') {
    // Remove the exclamation
    return 'System.err.println("*** server shut down");';
  } else {
    // Add the exclamation
    return 'System.err.println("*** server shut down!");';
  }
});

fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log(`File updated successfully: ${filePath}`);

