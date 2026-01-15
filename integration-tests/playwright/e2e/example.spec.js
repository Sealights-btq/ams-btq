// @ts-check
// Try using Sealights as test wrapper instead of reporter

// const { test, expect } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { test } = require('sealights-playwright-plugin');
const config = require('./config');
const PlaywrightHelper = require('./playwrightHelper');
const { isGeneratorFunction } = require('util/types');

const testData = {
  email: 'ian@sealights.com',
  address: '123 Main Street',
  city: 'Austin',
  state: 'TX',
  zip: '78757',
  cvv: '123',
  baseURL: 'https://ams-btq.btq.sealights.co/'
};

function getTitle(expectedTitle) {

  let expectedTitle = 'Space & Beyond | Testim.io demo';
  let isFound = false;
   let currentTitle = page.title();
  
  try {
   
    if (expectedTitle === currentTitle) {
      console.log('passed');
      isFound = true;

    } else {
      console.log(`currentTitle ${currentTitle} doesnt match expected Title ${expectedTitle}`);
    }

  } catch (err) {
      console.log('cant run method getTitle() ' +err);
  }
  return isFound;
}

async function fillCheckoutForm(page, data) {
  await page.getByLabel('E-mail Address').fill(data.email);
  await page.getByLabel('Street Address').fill(data.address);
  await page.getByLabel('Zip Code').fill(data.zip);
  await page.getByLabel('City').fill(data.city);
  await page.getByLabel('State').fill(data.state);
  await page.getByLabel('CVV').fill(data.cvv);
}

test('Add single item to cart and complete checkout', async ({ page }) => {
  await page.goto(testData.baseURL);
  await page.locator('.col-md-4 > a').first().click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await fillCheckoutForm(page, testData);
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page.getByText('Your order is complete!')).toBeVisible();
  await expect(page.getByText(/[\d]+\.\d{2}/)).toBeVisible();
});

test('Add Loafers to Cart and Validate', async ({ page }) => {
  await page.goto(testData.baseURL);
  await page.locator('div:nth-child(5) > a').click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await page.getByRole('heading', { name: 'Loafers' }).click();
  await page.getByText('$89.99').click();
  await page.getByText('$8.99').click();
  await page.getByText('$98.98').click();
  await page.getByRole('button', { name: 'Empty Cart' }).click();
});

test('Add Mug to cart and validate', async ({ page }) => {
  await page.goto(testData.baseURL);
  await page.locator('div:nth-child(10) > a').click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await page.getByRole('heading', { name: 'Mug' }).click();
  await page.getByText('Quantity:').click();
  await page.getByRole('strong').click();
  await page.locator('div').filter({ hasText: /^\$8\.99$/ }).click();
  await page.getByText('SKU #6E92ZMYYFZ').click();
  await page.getByText('$17.98').click();
  await page.getByRole('button', { name: 'Empty Cart' }).click();
});
