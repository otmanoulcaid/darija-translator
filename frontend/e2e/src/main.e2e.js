import { CustomDriver } from "./driver/custom-driver.js";
import testCases from "./tests/test-cases.js";
import { TranslatorPage } from "./pages/translator-page.js";

export const main = async () => {
  const driver = new CustomDriver();
  await driver.init();
  const page = new TranslatorPage(driver.driver);

  try {
    for (let testName in testCases) {
      try {
        let screenshotPath = `e2e/reports/${testName.replace(/\s/g, "_")}.png`;
        await testCases[testName](driver, page, screenshotPath)
      } catch (error) {
        console.log(error);
      }
    }
  } finally {
    await driver.quit();
  }
};
