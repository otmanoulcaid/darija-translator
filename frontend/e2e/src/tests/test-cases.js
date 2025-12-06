const testCases = {
    "Translate English to Darija": async (driver, page, screenshotPath) => {
        await page.typeSource("Hello");
        await page.clickTranslate();
        const translated = await page.getTranslation();
        console.log("Traduction :", translated);
        await driver.screenshot(screenshotPath);
    },

    "switch label": async (driver, page, screenshotPath) => {
        const labelsBefore = await page.getLabels();
        await page.switchLanguages();
        const labelsAfter = await page.getLabels();
        console.log("Avant switch :", labelsBefore);
        console.log("Après switch :", labelsAfter);
        await driver.screenshot(screenshotPath);
    }
}

export default testCases;