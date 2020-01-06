const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    pageLocator: '//div[contains(@class, \'product_details\')]',
    titleLabel: '//p[@itemprop=\'description\']'
};

const isPageOpen = async () => {
    return pageHelpers.isPresent(selectors.pageLocator);
};

const getProductTitle = async () => {
    await pageHelpers.getElementText(selectors.titleLabel);
};

module.exports = {
    isPageOpen,
    getProductTitle
};