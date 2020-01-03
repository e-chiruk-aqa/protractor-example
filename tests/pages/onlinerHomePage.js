const pageHelpers = require('../helpers/pageHelpers');

const selectors = {
    pageLocator: '//input[@data-project=\'onliner_main\']',
};

const isPageOpen = async () => {
    return pageHelpers.isVisible(selectors.pageLocator);
};

module.exports = {
    isPageOpen
};