const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    pageLocator: '//input[@data-project=\'onliner_main\']',
};

const isPageOpen = async () => {
    return pageHelpers.isVisible(selectors.pageLocator);
};

const openTabByName = async (tabName) => {
    await pageHelpers.waitForSelectorAndClick(`//span[@class='b-main-navigation__text' and text()='${tabName}']`);
};

module.exports = {
    isPageOpen,
    openTabByName
};