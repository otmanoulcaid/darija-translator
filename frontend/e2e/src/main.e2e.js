import { CustomDriver } from "./driver/custom-driver.js";
import testCases from "./tests/test-cases.js";
import { TranslatorPage } from "./pages/translator-page.js";
import path from "path";
import fs from "fs/promises";

export const main = async () => {
  const driver = new CustomDriver();
  await driver.init();
  const page = new TranslatorPage(driver.driver);

  const reportsDir = path.resolve("e2e-reports");
  await fs.mkdir(reportsDir, { recursive: true });

  try {
    for (let testName in testCases) {
      try {
        const screenshotFile = `${testName.replace(/\s/g, "_")}.png`;
        const screenshotPath = path.join(reportsDir, screenshotFile);

        await testCases[testName](driver, page, screenshotPath);
      } catch (error) {
        console.error(`Erreur dans le test "${testName}":`, error);
      }
    }
  } finally {
    await driver.quit();
  }
};
