import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from 'fs';

export class CustomDriver {
  driver = null;

  async init(headless = true) {
    if (!this.driver) {
      const options = new chrome.Options()
        .addArguments("--disable-gpu")
        .addArguments("--no-sandbox")
        .addArguments("--disable-extensions");

      headless ? options.addArguments("--headless=new")
              : options.addArguments("--start-maximized");

      this.driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

      await this.driver.get("http://localhost:4200");
      await this.driver.wait(async () => {
        const elements = await this.driver.findElements(By.css(".area textarea"));
        return elements.length > 0;
      }, 10000); // timeout 10s
    }
  }

  async screenshot(filename) {
    if (!this.driver) return;
    const image = await this.driver.takeScreenshot();
    fs.writeFileSync(filename, image, "base64");
  }

  async quit() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }
}
