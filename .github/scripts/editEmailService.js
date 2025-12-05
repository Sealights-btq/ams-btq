const fs = require("fs");
const path = require("path");
// Ian Flanagan Tricentis 2025

if (process.argv.length < 4) {
  console.error("Usage: node editEmailService.js <path_to_email_client.py> <path_to_email_server.py>");
  process.exit(1);
}

const clientFilePath = path.resolve(process.argv[2]);
const serverFilePath = path.resolve(process.argv[3]);

function editEmailClient(filePath) {
  const targetNoPeriod = "  logger.info('Client for email service')";
  const targetWithPeriod = "  logger.info('Client for email service.')";

  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(targetWithPeriod)) {
    content = content.replace(targetWithPeriod, targetNoPeriod); // remove period
    console.log(`Removed period in email_client.py`);
  } else if (content.includes(targetNoPeriod)) {
    content = content.replace(targetNoPeriod, targetWithPeriod); // add period
    console.log(`Added period in email_client.py`);
  } else {
    console.log(`Target line not found in email_client.py`);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

function editEmailServer(filePath) {
  const targetNoPeriod = '  logger.info("Successfully started Stackdriver Profiler")';
  const targetWithPeriod = '  logger.info("Successfully started Stackdriver Profiler.")';

  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes(targetWithPeriod)) {
    content = content.replace(targetWithPeriod, targetNoPeriod); // remove period
    console.log(`Removed period in email_server.py`);
  } else if (content.includes(targetNoPeriod)) {
    content = content.replace(targetNoPeriod, targetWithPeriod); // add period
    console.log(`Added period in email_server.py`);
  } else {
    console.log(`Target line not found in email_server.py`);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

// Run edits
editEmailClient(clientFilePath);
editEmailServer(serverFilePath);

console.log("Edits completed.");
