const settings = require('./settings');
const suiteSetting = require('./suiteSettings');

exports.config = {
    framework: 'jasmine2',
    onPrepare: async () => {
        const chai = require('chai');
        const chaiAsPromised = require("chai-as-promised"); // deal with promises from protractor
        chai.use(chaiAsPromised); // add promise candy to the candy of chai
        global.expect = chai.expect;
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().maximize();
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
    },
    afterEach: async (result) => {
      if(result.failedExpectations.length > 0) {
          await browser.takeScreenshot().then(async (png) => {
              await allure.createAttachment('Screenshot', () => {
                  return Buffer.from(png, 'base64');
              }, 'image/png')();
          });
      }
    },
    specDone: async () => {
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