const protractor = require('protractor');
let EC = protractor.ExpectedConditions;
const timeoutConstants = require('../constants/timeoutConstants');
const defaultWaitOptions = require('../../settings').defaultWaitOptions;

const getElement = async (selector) => {
    browser.logger.info(`Find element with selector: ${selector}`);
    if (selector.includes('//')) {
        return element(by.xpath(`${selector}`));
    } else {
        return $$(`${selector}`).first();
    }
};

const waitForSelector = async (selector, timeout = defaultWaitOptions) => {
    try {
        const element = await getElement(selector);
        await browser.wait(EC.presenceOf(element), timeout);
        await browser.wait(EC.visibilityOf(element), timeout);
    } catch (e) {
        throw new Error(`Timeout error: Element '${selector}' not found during ${timeout} seconds`);
    }
};

const getElements = async (selector) => {
    await waitForSelector(selector);
    return $$(selector);
};

const getElementsByXpath = async (selector) => {
    await waitForSelector(selector);
    return element.all(by.xpath(`${selector}`));
};

const getElementsWithoutWaiting = async (selector) => {
    return $$(selector);
};

const waitForSelectorAndClick = async (selector, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    await waitForSelector(selector, timeout);
    browser.logger.info(`Click element with selector: ${selector}`);
    await browser.wait(EC.elementToBeClickable(element), timeout)
        .then(element.click);
};

const waitForSelectorNotVisible = async (selector, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    await browser.wait(EC.invisibilityOf(element), timeout);
};

const waitForSelectorAndType = async (selector, text, timeout = defaultWaitOptions) => {
    const element = await getElement(selector);
    browser.logger.info(`Sending keys: ${selector}`);
    await browser.wait(EC.presenceOf(element), timeout);
    element.sendKeys(text);
};

const isVisible = async (selector) => {
    try {
        const element = await getElement(selector);
        browser.logger.info(`Check is displayed: ${selector}`);
        await browser.wait(EC.presenceOf(element), timeoutConstants.TIMEOUTS.MAX);
        await browser.wait(EC.visibilityOf(element), timeoutConstants.TIMEOUTS.MEDIUM);
        return true;
    } catch (e) {
        return false;
    }
};

const isPresent = async (selector) => {
    try {
        const element = await getElement(selector);
        browser.logger.info(`Check existence: ${selector}`);
        await browser.wait(EC.presenceOf(element), timeoutConstants.TIMEOUTS.MAX);
        return true;
    } catch (e) {
        return false;
    }
};

const getElementText = async (selector, options = {}) => {
    await waitForSelector(selector, defaultWaitOptions);
    const element = await getElement(selector);
    browser.logger.info(`Getting text: ${selector}`);
    if (options.innerText) {
        return element.getAttribute('innerText');
    } else if (options.innerHTML) {
        return element.getAttribute('innerHTML');
    }
    return element.getText();
};

const getElementValue = async (selector) => {
    const elem = await getElement(selector);
    browser.logger.info(`Getting value: ${selector}`);
    return elem.getAttribute('value');
};

const clickViaJS = async (selector) => {
    const elm = await getElement(selector);
    browser.logger.info(`Clicking via js: ${selector}`);
    await browser.executeScript('arguments[0].click();', elm.getWebElement());
};

const navigateToPage = async (link) => {
    browser.logger.info(`Navigate to: ${link}`);
    return browser.get(link);
};

const reloadPage = async () => {
    browser.logger.info(`Reloading page`);
    return browser.driver.navigate().refresh();
};

const selectOption = (selectLocator, typeName) => {
    browser.logger.info(`Selecting option: ${typeName}`);
    $(selectLocator).element(By.cssContainingText('option', typeName)).click();
};

const scrollToElement = async (selector) => {
    const elm = await getElement(selector);
    browser.logger.info(`Scrolling to element: ${selector}`);
    await browser.executeScript("arguments[0].scrollIntoView();", elm.getWebElement());
};

module.exports = {
    selectOption,
    reloadPage,
    navigateToPage,
    clickViaJS,
    waitForSelectorAndClick,
    waitForSelector,
    waitForSelectorAndType,
    isVisible,
    getElementText,
    getElementValue,
    waitForSelectorNotVisible,
    getElements,
    isPresent,
    getElementsWithoutWaiting,
    getElementsByXpath,
    scrollToElement
};