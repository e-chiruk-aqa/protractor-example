const settings = require('./settings');
const log4js = require("log4js");
const suiteSetting = require('./suiteSettings');
const fs = require('fs');

exports.config = {
    framework: 'mocha',
    beforeLaunch : function () {
        if (fs.existsSync('./attachments/ExecutionLog.log')) {
            fs.unlinkSync('./attachments/ExecutionLog.log')
        }
        log4js.configure({
            appenders: {
                out: {type: 'log4js-protractor-appender', category: 'logger'},
                app: {
                    type: "file",
                    filename: './attachments/ExecutionLog.log',
                    category: 'logger'
                }
            },
            categories: {
                default: { appenders: [ 'out', 'app' ], level: 'ALL'}
            }
        });
    },
    onPrepare: async () => {
        browser.logger = log4js.getLogger('logger');
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().maximize();
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: [
        suiteSetting.suite,
    ],
    mochaOpts: {
        reporter: 'mocha-allure-reporter',
        timeout: settings.mochaTimeout,
        fullTrace: true,
        asyncOnly: true,
        allowUncaught: true,
        bail: true
    },
    capabilities: {
        browserName: settings.browser
    }
};