const pageHelpers = require('../../helpers/pageHelpers');
const settings = require('../../../settings');
const onlinerHomePage = require('../../pages/onlinerHomePage');
const catalogPage = require('../../pages/catalogPage');
const catalogFilterForm = require('../../pages/catalogFiltersForm');
const catalogProductsForm = require('../../pages/catalogProductsForm');
const catalogProductPage = require('../../pages/catalogProductPage');
const asserts = require('../../helpers/asserts');

/*const openOnlinerHome = allure.createStep('Open onliner home page', async () => {
    await pageHelpers.navigateToPage(settings.homePageLink);
    await asserts.assertEquals( true, await onlinerHomePage.isPageOpen(), "");
});

const goToCatalogTab = allure.createStep('Go to Catalog tab', async () => {
    await onlinerHomePage.openTabByName('Каталог');
    await asserts.assertEquals( true, await catalogPage.isPageOpen(), "");
});

const goToMobilePhones = allure.createStep('Go to Mobile phones page from catalog', async () => {
    await catalogPage.selectCatalogBarItemByName('Мобильные телефоны');
    await asserts.assertEquals(true, await catalogPage.isCatalogPageByNameOpened('Мобильные телефоны'), "");
});

const selectIphoneWithFilters = allure.createStep('Select iPhone 11 with applying filters', async () => {
    let filters = [{sectionName : 'Производитель', checkboxes : 'Apple'}];
    await catalogFilterForm.applyFilters(filters);
    await catalogProductsForm.selectProduct('Смартфон Apple iPhone 11 64GB (черный)');
    await asserts.assertEquals(true, await catalogProductPage.isPageOpen(), "");
    await asserts.assertEquals('Смартфон Apple iPhone 11 64GB (черный)', await catalogProductPage.getProductTitle(), "")
});*/

/*describe('Onliner', () => {
    it('Search IPhone in Catalog', async () => {
        await openOnlinerHome();
        await goToCatalogTab();
        await goToMobilePhones();
        await selectIphoneWithFilters();
    });
});*/

describe('Onliner', () => {
    describe('Search IPhone in Catalog',  () => {
        it('Open onliner home page', async () => {
            await pageHelpers.navigateToPage(settings.homePageLink);
            await asserts.assertEquals( true, await onlinerHomePage.isPageOpen(), "");
        });
        it('Go to Catalog tab', async () => {
            await onlinerHomePage.openTabByName('Каталог');
            await asserts.assertEquals( true, await catalogPage.isPageOpen(), "");
        });
        it('Go to Mobile phones page from catalog', async () => {
            await catalogPage.selectCatalogBarItemByName('Мобильные телефоны');
            await asserts.assertEquals(true, await catalogPage.isCatalogPageByNameOpened('Мобильные телефоны'), "");
        });
        it('Select iPhone 11 with applying filters', async () => {
            let filters = [{sectionName : 'Производитель', checkboxes : 'Apple'}];
            await catalogFilterForm.applyFilters(filters);
            await catalogProductsForm.selectProduct('Смартфон Apple iPhone 11 64GB (черный)');
            await asserts.assertEquals(true, await catalogProductPage.isPageOpen(), "");
            await asserts.assertEquals('Смартфон Apple iPhone 11 64GB (черный)', await catalogProductPage.getProductTitle(), "")
        });
    });
});