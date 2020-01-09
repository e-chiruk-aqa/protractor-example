const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const assertEquals = (exp, act, msg) => {
    browser.logger.info(`${msg} : Actual value: ${act} equals expected: ${exp}`);
    return expect(exp, `${msg} : Actual value: ${act}, Expected value: ${exp}`).to.deep.equal(act);
};

module.exports = {
    assertEquals,
};