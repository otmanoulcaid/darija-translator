import { CustomDriver } from "./custom-driver.js";
import { TranslatorPage } from "./translator-page.js";

(async () => {
  const driver = new CustomDriver();
  await driver.init();
  
  const page = new TranslatorPage(driver.driver);

  try {
    // Test 1 : traduction
    await page.typeSource("Hello");
    await page.clickTranslate();
    const translated = await page.getTranslation();
    console.log("Traduction :", translated);

    // Test 2 : switch langues
    const labelsBefore = await page.getLabels();
    await page.switchLanguages();
    const labelsAfter = await page.getLabels();
    console.log("Avant switch :", labelsBefore);
    console.log("Après switch :", labelsAfter);

    if (labelsBefore.source === labelsAfter.dest && labelsBefore.dest === labelsAfter.source) {
      console.log("✅ Switch de langues OK");
    } else {
      console.log("❌ Switch de langues KO");
    }
  } finally {
    await driver.quit();
  }
})();
