const { expect } = require('chai');

const assertObjectsEquals = (exp, act, msg) => {
    return new Promise((resolve, reject) => {
        if (expect(exp).to.deep.equal(act)) {
            browser.logger.info(`${msg} : Actual value: ${act} equals expected: ${exp}`);
            resolve(`Actual value: ${act} equals expected: ${exp}`);
        } else {
            browser.logger.info(`${msg} : Actual value: does not ${act} equals expected: ${exp}`);
            reject(`Actual value: does not ${act} equal expected: ${exp}`);
        }
    });
};

const assertEquals = async (exp, act, msg) => {
    await assertObjectsEquals(exp, act, msg);
};

module.exports = {
    assertEquals,
};