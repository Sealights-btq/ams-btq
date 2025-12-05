
const fs = require('fs').promises; 

// Ian Flanagan Tricentis 2025

async function editFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8'); 
    const lines = data.split(/\r?\n/); 

    const targetStart = 'print("Calling Function'; 
    let fileModified = false;

    const newLines = lines.map(line => {
      if (line.trim().startsWith(targetStart)) {
        if (line.includes('Function!")')) {
          // Remove the exclamation mark
          fileModified = true;
          return line.replace('Function!")', 'Function")');
        } else if (line.includes('Function")')) {
          // Add the exclamation mark
          fileModified = true;
          return line.replace('Function")', 'Function!")');
        }
      }
      return line;
    });

    if (fileModified) {
      await fs.writeFile(filePath, newLines.join('\n'), 'utf8');
      console.log(`File '${filePath}' modified successfully.`);
    } else {
      console.log(`File '${filePath}' did not contain the target line or no changes were needed.`);
    }

  } catch (err) {
    console.error(`Error editing file '${filePath}': ${err.message}`);
  }
}

// Ensure exactly 3 file paths were provided
const filePaths = process.argv.slice(2);
if (filePaths.length !== 3) {
  console.error("Please provide exactly 3 file paths as arguments.");
  console.error("Usage: node editScript.js <file1> <file2> <file3>");
  process.exit(1);
}

// Process each file
(async () => {
  for (const filePath of filePaths) {
    await editFile(filePath);
  }
})();
