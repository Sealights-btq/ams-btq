const fs = require('fs');

// Ian Flanagan Tricentis 2025

async function modifyMainGo(filePath) {
    const targetNoPeriod = 'log.Info("Tracing enabled")';
    const targetWithPeriod = 'log.Info("Tracing enabled.")';

    await modifyLine(filePath, targetNoPeriod, targetWithPeriod, "main.go");
}

async function modifyMiddlewareGo(filePath) {
    const targetNoPeriod = '"http.resp.bytes":   rr.b}).Debugf("request complete")';
    const targetWithPeriod = '"http.resp.bytes":   rr.b}).Debugf("request complete.")';

    await modifyLine(filePath, targetNoPeriod, targetWithPeriod, "middleware.go");
}

async function modifyHandlersGo(filePath) {
    const targetNoPeriod = 'fmt.Println("env platform is either empty or invalid")';
    const targetWithPeriod = 'fmt.Println("env platform is either empty or invalid.")';

    await modifyLine(filePath, targetNoPeriod, targetWithPeriod, "handlers.go");
}

async function modifyMoneyGo(filePath) {
    const targetNoPeriod = 'ErrMismatchingCurrency = errors.New("mismatching currency codes")';
    const targetWithPeriod = 'ErrMismatchingCurrency = errors.New("mismatching currency codes.")';

    await modifyLine(filePath, targetNoPeriod, targetWithPeriod, "money.go");
}

async function modifyLine(filePath, noPeriod, withPeriod, fileLabel) {
    try {
        let fileContent = await fs.promises.readFile(filePath, 'utf8');
        let updatedContent;

        if (fileContent.includes(withPeriod)) {
            // Remove the period
            updatedContent = fileContent.replace(withPeriod, noPeriod);
            await fs.promises.writeFile(filePath, updatedContent, 'utf8');
            console.log(`Period removed in ${fileLabel}.`);
        } else if (fileContent.includes(noPeriod)) {
            // Add the period
            updatedContent = fileContent.replace(noPeriod, withPeriod);
            await fs.promises.writeFile(filePath, updatedContent, 'utf8');
            console.log(`Period added in ${fileLabel}.`);
        } else {
            console.log(`Target line not found in ${fileLabel}.`);
        }
    } catch (error) {
        console.error(`Error modifying ${fileLabel}:`, error);
    }
}

async function main() {
    if (process.argv.length < 6) {
        console.error('Usage: node modifyFiles.js <main.go> <middleware.go> <handlers.go> <money.go>');
        process.exit(1);
    }

    const [mainGoPath, middlewareGoPath, handlersGoPath, moneyGoPath] = process.argv.slice(2);

    await modifyMainGo(mainGoPath);
    await modifyMiddlewareGo(middlewareGoPath);
    await modifyHandlersGo(handlersGoPath);
    await modifyMoneyGo(moneyGoPath);

    console.log("Processing complete.");
}

main();
