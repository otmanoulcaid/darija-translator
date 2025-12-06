import { By } from "selenium-webdriver";

export class TranslatorPage {
  /**
   * @param {import("selenium-webdriver").WebDriver} driver
   */
  constructor(driver) {
    this.driver = driver;

    this.inputArea = By.css(".area textarea");
    this.outputArea = By.css('.area textarea[readonly]');
    this.translateButton = By.css("button");
    this.switchButton = By.css(".switch");
    this.labels = By.css(".area span");
  }

  async typeSource(text) {
    const input = await this.driver.findElement(this.inputArea);
    await input.clear();
    await input.sendKeys(text);
  }

  async clickTranslate() {
    const button = await this.driver.findElement(this.translateButton);
    await button.click();
  }

  async getTranslation(timeout = 15000) {
    const output = await this.driver.findElement(this.outputArea);
    await this.driver.wait(async () => {
      const value = await output.getAttribute("value");
      return value && value.length > 0;
    }, timeout);
    return await output.getAttribute("value");
  }

  async switchLanguages() {
    const button = await this.driver.findElement(this.switchButton);
    await button.click();
  }

  async getLabels() {
    const spans = await this.driver.findElements(this.labels);
    const source = await spans[0].getText();
    const dest = await spans[1].getText();
    return { source, dest };
  }
}
