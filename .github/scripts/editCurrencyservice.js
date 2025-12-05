const fs = require('fs');

// Ian Flanagan Tricentis 2025

// Get the file path from the command-line arguments
// process.argv[0] is 'node', process.argv[1] is the script file path
// So, the first argument passed by the user will be at index 2
const filePath = process.argv[2];

// Check if a file path was provided
if (!filePath) {
  console.error('Usage: node editCurrencyservice.js <file-path>');
  process.exit(1); // Exit with an error code
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`); // Use err.message for clearer error
    return;
  }

  let updatedData = data;
  if (updatedData.includes('"USD": "1.1305"')) {
    updatedData = updatedData.replace('"USD": "1.1305"', '"USD": "1.2"');
  } else if (updatedData.includes('"USD": "1.2"')) {
    updatedData = updatedData.replace('"USD": "1.2"', '"USD": "1.1305"');
  }

  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`); // Use err.message for clearer error
      return;
    }
    console.log('File updated successfully!');
  });
});
