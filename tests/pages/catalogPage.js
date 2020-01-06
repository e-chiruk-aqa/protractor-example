const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    pageLocator: '//div[contains(@class, \'catalog-navigation_opened\')]',
};

const isPageOpen = async () => {
    return pageHelpers.isVisible(selectors.pageLocator);
};

const isCatalogPageByNameOpened = async (pageName) => {
    return pageHelpers.isVisible(`//div[contains(@class, 'catalog-content')]//div[@class='schema-header']/h1[contains(text(), '${pageName}')]`);
};

const selectCatalogBarItemByName = async (item) => {
    await pageHelpers.waitForSelectorAndClick(`//div[@class='catalog-bar']//a[text()='${item}']`);
};

module.exports = {
    isPageOpen,
    selectCatalogBarItemByName,
    isCatalogPageByNameOpened
};