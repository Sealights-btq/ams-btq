# playwright

to setup to report to Sealights

https://www.npmjs.com/package/sealights-playwright-plugin

1. install the plugin 

npm i sealights-playwright-plugin

2. export env variables 

export SL_TOKEN=<your-sl-token>
export SL_LAB_ID=<your-lab-id>
export SL_TEST_STAGE=playwright


3. Run tests 

npx playwright test

tests created in playwright 

Follow the docs to setup https://playwright.dev/docs/intro


Playwright CheatSheet Ian Flanagan 2025

# starts recorder
npx playwright codegen

#runs all tests 
npx playwright test

# see report URL 
npx playwright show-report

# walk through each step of the test and visually see what was happening before, during #and after each step
npx playwright test --ui

# run tests in headed mode 
npx playwright test --headed

# run all tests on one browser
npx playwright test --project firefox

# run a test with a specific title
npx playwright test -g "TestName"

# run a single test file 
npx playwright test login.spec.js

# debug tests with playwright inspector
npx playwright test --debug

# Run one tests on one browser 
npx playwright test -g  "Login Test Demo Site" --project=chromium --headed


