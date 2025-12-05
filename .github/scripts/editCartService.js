const fs = require("fs");

// Ian Flanagan Tricentis 2025

// Require exactly three arguments (paths to files)
const files = process.argv.slice(2);
if (files.length !== 3) {
    console.error("Usage: node editCartService.js <file1> <file2> <file3>");
    process.exit(1);
}

// Regex patterns for match
const regexWithExclamation = /Console\.WriteLine\(\s*"Calling Function!"\s*\);/;
const regexWithoutExclamation = /Console\.WriteLine\(\s*"Calling Function"\s*\);/;

files.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, "utf8");

        if (regexWithExclamation.test(content)) {
            // Remove the exclamation point
            content = content.replace(regexWithExclamation, 'Console.WriteLine("Calling Function");');
            console.log(`Removed exclamation point in: ${filePath}`);
        } else if (regexWithoutExclamation.test(content)) {
            // Add the exclamation point
            content = content.replace(regexWithoutExclamation, 'Console.WriteLine("Calling Function!");');
            console.log(`Added exclamation point in: ${filePath}`);
        } else {
            console.log(`Target Console.WriteLine not found in: ${filePath}`);
        }

        fs.writeFileSync(filePath, content, "utf8");
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
    }
});

