const pageHelpers = require('../../helpers/pageHelpers');
const settings = require('../../../settings');
const onlinerHomePage = require('../../pages/onlinerHomePage');
const catalogPage = require('../../pages/catalogPage');
const catalogFilterForm = require('../../pages/catalogFiltersForm');
const catalogProductsForm = require('../../pages/catalogProductsForm');
const catalogProductPage = require('../../pages/catalogProductPage');
const asserts = require('../../helpers/asserts');
const appRoot = require('app-root-path');
const path = require('path');
const fs = require('fs');

const openOnlinerHome = allure.createStep('Open onliner home page', async () => {
    await pageHelpers.navigateToPage(settings.homePageLink);
    await asserts.assertEquals( true, await onlinerHomePage.isPageOpen(), "Onliner home page opened");
});

const goToCatalogTab = allure.createStep('Go to Catalog tab', async () => {
    await onlinerHomePage.openTabByName('Каталог');
    await asserts.assertEquals( true, await catalogPage.isPageOpen(), "Catalog page opened");
});

const goToMobilePhones = allure.createStep('Go to Mobile phones page from catalog', async () => {
    await catalogPage.selectCatalogBarItemByName('Мобильные телефоны');
    await asserts.assertEquals(true, await catalogPage.isCatalogPageByNameOpened('Мобильные телефоны'), "Mobile phones page opened");
});

const selectIphoneWithFilters = allure.createStep('Select iPhone 11 with applying filters', async () => {
    let filters = [{sectionName : 'Производитель', checkboxes : 'Apple'}];
    await catalogFilterForm.applyFilters(filters);
    await catalogProductsForm.selectProduct('Смартфон Apple iPhone 11 64GB (черный)');
    await asserts.assertEquals(true, await catalogProductPage.isPageOpen(), "Catalog product page opened");
    await asserts.assertEquals('Смартфон Apple iPhone 11 64GB (черный)', await catalogProductPage.getProductTitle(), "Product title displayed correctly")
});

describe('Onliner', () => {
    it('Search IPhone in Catalog', async () => {
        await openOnlinerHome();
        await goToCatalogTab();
        await goToMobilePhones();
        await selectIphoneWithFilters();
    });
    afterEach(function () {
        allure.createAttachment('Log', fs.readFileSync(path.join(appRoot.path, '/attachments/ExecutionLog.log')), 'text/plain');
        if(this.currentTest.state === 'failed') {
            browser.takeScreenshot().then(async (png) => {
                await allure.createAttachment(`Screenshot`, () => {
                    return Buffer.from(png, 'base64');
                }, 'image/png')();
            });
        }
    })
});
