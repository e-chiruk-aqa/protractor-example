const pageHelpers = require('../helpers/pageHelpers');

const checkboxSelector = function (sectionName, checkboxName)  {
    return `//div[@class='schema-filter__label' and ./span[contains(text(), '${sectionName}')]]/following-sibling::div//ul//span[contains(text(), '${checkboxName}')]/preceding-sibling::span`
};

const applyFilters = async (filters) => {
    for(let section = 0; section < filters.length; section++) {
        filters[section].checkboxes.split(',').forEach(function (item) {
            pageHelpers.scrollToElement(checkboxSelector(filters[section].sectionName, item));
            pageHelpers.waitForSelectorAndClick(checkboxSelector(filters[section].sectionName, item));
        })
    }
};

module.exports = {
    applyFilters
};