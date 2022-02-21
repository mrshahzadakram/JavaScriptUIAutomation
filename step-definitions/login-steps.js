const { onboardingService } = require("../services/authenticationService");
const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');

module.exports = async function () {
 
    this.When(/^I enter the credentials$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        await driver.findElement(by.css(`#LoginCtrl_UserName`)).sendKeys(data['UserName']);
        await driver.findElement(by.css(`#LoginCtrl_Password`)).sendKeys(data['Password']);

        return true;
    });

    this.When(/^I click login$/, async function () {
        await driver.findElement(by.css(`#LoginCtrl_LoginButton`)).click();
        await utils.sleep(1000);
        await utils.waitUntilElementIsVisible('ctl00_HomeLinkImage');
        await utils.sleep(1000);
        return true;
    });
};