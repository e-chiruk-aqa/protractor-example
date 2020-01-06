const ScreenshotReporter = function () {
    const screenshot = (testDescription) => {
        browser.takeScreenshot().then(async (png) => {
            await allure.createAttachment(`Screenshot_${testDescription}`, () => {
                return Buffer.from(png, 'base64');
            }, 'image/png')();
        });
    };

    this.specDone = (spec) => {
        if (spec.status === 'failed') {
            screenshot(spec.fullName);
        }
    };
};

module.exports = ScreenshotReporter;