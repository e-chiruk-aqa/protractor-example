const pageHelpers = require('../../helpers/pageHelpers');
const settings = require('../../../settings');
const onlinerHomePage = require('../../pages/onlinerHomePage');

describe('Onliner', () => {
    describe('Search IPhone in Catalog:', () => {
        it('Open onliner home page', async () => {
            await pageHelpers.navigateToPage(settings.homePageLink);
            let result = await onlinerHomePage.isPageOpen();
            expect(result).to.be.false;
        })
    });
});