const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    nextPage : By.id('schema-pagination')
};

const productSelector = (name) => {
    return `//div[@class='schema-product__title']//span[contains(text(), '${name}')]`
};

const selectProduct = async (name) => {
    while (!await pageHelpers.isPresent(productSelector(name))) {
        await pageHelpers.scrollToElement(selectors.nextPage);
        await pageHelpers.waitForSelectorAndClick(selectors.nextPage);
    }
    await pageHelpers.waitForSelector(productSelector(name));
    await pageHelpers.scrollToElement(productSelector(name));
    await pageHelpers.waitForSelectorAndClick(productSelector(name));
};

module.exports = {
    selectProduct
};

