const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');
path = require('path')

module.exports = async function() {

    this.Then(/^I should see the portal logo modal$/, async function() {
        await utils.sleep(1000)
        await utils.waitUntilElementIsVisible('portal-logo-sub-title')

        return true;
    });

    this.When(/^I click "([^"]*)" logo button$/, async function(option) {
        await utils.sleep(1000);
        switch (option) {
            case "disable":
                await utils.clickButton('portal-logo-disable-image');
                await utils.sleep(1500);
                return true;
            case "upload":
                await utils.clickButton('portal-logo-upload-image')
                await utils.waitUntilElementIsNotVisible('portal-logo-upload-image')
                return true;
            default:
                break;
        }

        return true;
    });

    this.Then(/^I upload a portal logo$/, async function() {
        let uploader = await driver.findElement(by.id(`portal-logo-disable-image`)).findElement(by.css(`.ng-star-inserted`));

        let fullPath = path.join(__dirname, '..', 'assets', 'images', 'rocket-matter-logo.png');

        uploader.sendKeys(fullPath);

        await utils.sleep(1500);

        return true;
    });

    this.Then(/^I confirm that I want to upload the portal logo$/, async function() {
        await driver.findElement(by.id(`portal-logo-disable-image`)).findElement(by.css(`.confirm`)).click();
        await utils.sleep(1500);

        return true;
    });

    this.When(/^I click view current logo$/, async function() {

        await driver.findElement(by.id(`lnkViewCurrentLogo`)).click();
        await utils.sleep(1500);

        return true;
    });

    this.Then(/^I should see the portal logo image I just uploaded$/, async function() {
        await utils.waitUntilElementIsVisible('portal-logo-image')
        await utils.sleep(1500);

        return true;
    });

    this.Then(/^I close the portal logo modal$/, async function() {
        await utils.clickButton('portal-logo-close-button')
        await utils.waitUntilElementIsNotVisible('portal-logo-close-button')
        return true;
    });
}