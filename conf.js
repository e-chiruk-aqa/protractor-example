const settings = require('./settings');
const suiteSetting = require('./suiteSettings');

exports.config = {
    framework: 'jasmine2',
    onPrepare: async () => {
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().maximize();
        let AllureReporter = require('jasmine-allure-reporter');
        let ScreenshotReporter = require('./tests/helpers/screenshotReporter');
        jasmine.getEnv().addReporter(new ScreenshotReporter());
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
    },
    afterEach: async (result) => {
        await browser.driver.close();
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: [
        suiteSetting.suite,
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: settings.jasmineTimeout,
        isVerbose: false,
        includeStackTrace: true,
        realtimeFailure: false,
    },
    capabilities: {
        browserName: settings.browser
    }
};