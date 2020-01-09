const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    pageLocator: '//div[contains(@class, \'product_details\')]',
    titleLabel: '//h1[@class=\'catalog-masthead__title\']'
};

const isPageOpen = async () => {
    return pageHelpers.isPresent(selectors.pageLocator);
};

const getProductTitle = async () => {
    return pageHelpers.getElementText(selectors.titleLabel);
};

module.exports = {
    isPageOpen,
    getProductTitle
};