const fs = require("fs");
const path = require("path");

// Ian Flanagan Tricentis 2025

if (process.argv.length < 3) {
  console.error("Usage: node editadService.js <path-to-java-file>");
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found - ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, "utf8");

// Match the AdServiceClient print statement
const patternWithout = /System\.out\.println\("Starting function with the class name: AdServiceClient"\);/;
const patternWith = /System\.out\.println\("Starting function with the class name: AdServiceClient!"\);/;

if (patternWith.test(content)) {
  // Remove the !
  content = content.replace(
    patternWith,
    'System.out.println("Starting function with the class name: AdServiceClient");'
  );
  console.log(`Removed "!" from print statement in ${filePath}`);
} else if (patternWithout.test(content)) {
  // Add the !
  content = content.replace(
    patternWithout,
    'System.out.println("Starting function with the class name: AdServiceClient!");'
  );
  console.log(`Added "!" to print statement in ${filePath}`);
} else {
  console.log(`No matching print statement found in ${filePath}`);
}

fs.writeFileSync(filePath, content, "utf8");

