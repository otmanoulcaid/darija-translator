import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

export class CustomDriver {
  driver = null;

  async init() {
    if (!this.driver) {
      const options = new chrome.Options().addArguments("--start-maximized");

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

  async quit() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }
}
