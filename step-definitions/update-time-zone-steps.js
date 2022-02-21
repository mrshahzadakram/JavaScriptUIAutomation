const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');

module.exports = async function() {

    this.Then(/^I click on the Update Time Zone link$/, async function() {
        await driver.findElement(by.id(`settings-timeZone`)).click();
        await utils.sleep(1000);
        return true;
    });

    this.Then(/^I change the Time Zone value to "([^"]*)"$/, async function(value) {
        await utils.selectOption('timeZones-select-input', value);
        await utils.sleep(1500);

        return true;
    });

    this.Then(/^I click the save time zone button$/, async function() {
        await utils.clickButton(`timeZones-save-button`);
        await utils.waitUntilElementIsNotVisible(`timeZones-save-button`);

        await utils.sleep(1000)
        return true;
    });
};