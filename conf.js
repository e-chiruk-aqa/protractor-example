const settings = require('./settings');
const log4js = require("log4js");
const suiteSetting = require('./suiteSettings');
const fs = require('fs');

exports.config = {
    framework: 'jasmine2',
    beforeLaunch : function () {
        if (fs.existsSync('./attachments/ExecutionLog.log')) {
            fs.unlinkSync('./attachments/ExecutionLog.log')
        }
        log4js.configure({
            appenders: {
                out: {type: 'log4js-protractor-appender', category: 'protractorLog4js'},
                app: {
                    type: "file",
                    filename: './attachments/ExecutionLog.log',
                    category: 'protractorLog4js'
                }
            },
            categories: {
                default: { appenders: [ 'out', 'app' ], level: 'info'}
            }
        });
    },
    onPrepare: async () => {
        browser.logger = log4js.getLogger('protractorLog4js');
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().maximize();
        var HtmlReporter = require('protractor-beautiful-reporter');
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'attachments',
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());
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