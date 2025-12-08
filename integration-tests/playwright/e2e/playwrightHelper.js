const { chromium } = require('playwright');

class PlaywrightHelper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async type(selector, text) {
    await this.page.type(selector, text);
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async login(username, password, signedInUser) {

  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('#login input[type="text"]').click();
  await page.locator('#login input[type="text"]').fill(username);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('navigation').getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Hello, John' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  }

  async screenshot(path) {
    await this.page.screenshot({ path });
  }

  async close() {
    await this.browser.close();
  }
}

module.exports = PlaywrightHelper;

