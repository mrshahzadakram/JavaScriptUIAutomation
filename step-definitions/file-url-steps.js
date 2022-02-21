const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');

module.exports = async function () {

    this.Then(/^I should see the file-url modal$/, async function () {
        await utils.waitUntilElementIsVisible('file-url-file');
        return true;
    });

    this.When(/^I select the option "([^"]*)" in the file-url modal$/, async function (option) {
        switch (option) {
            case 'File':
                await utils.selectCheckbox('file-url-file-switch');
                break;
            case 'URL':
                await utils.selectCheckbox('file-url-url-switch');
                break;
        }
        await utils.sleep(1000);
        return true;
    });

    this.When(/^I enter the file title$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        await utils.typeInInput('file-url-file-name', data['Custom File Name (Optional)']);
        await utils.sleep(1500);
        return true;
    });

    this.When(/^I enter the matter$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        await utils.selectAutoCompleteOption('file-url-client-matter', data['Client:Matter']);
        await utils.sleep(1500);

        return true;
    });

    this.When(/^I enter the following information in the url modal$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];
        await utils.typeInInput('file-url-url-title', data['Title']);
        await utils.sleep(1500);

        await utils.typeInInput('file-url-url', data['URL']);
        await utils.sleep(1500);

        await utils.selectAutoCompleteOption('file-url-client-matter', data['Client:Matter']);
        await utils.sleep(3000);

        return true;
    });

    //Generic save
    this.Then(/^I save the "([^"]*)" url$/, async function (value) {


        if (value == "empty") {

            await utils.clickButton('file-url-save');
            await utils.waitUntilElementIsVisibleByCss('.validation-errors li');
            return true;

        } else {
            await driver.findElement(by.id('file-url-save')).click();
            return true;
        }
    });

    this.Then(/^I cancel the add new file modal$/, async function () {
        await utils.clickButton('file-url-cancel');
        await utils.waitUntilElementIsNotVisible('file-url-title');
        return true;
    });

    this.Then(/^I close the add new file modal$/, async function () {
        await utils.clickButton('file-url-close');
        await utils.waitUntilElementIsNotVisible('file-url-title');
        await utils.sleep(1000);
        return true;
    });

    this.Then(/^I click on drag n drop section to upload a file$/, async function () {

        let uploader = await driver.findElement(by.id(`file-uploader`)).findElement(by.css(`.ng-star-inserted`));

        let fullPath = path.join(__dirname, '..', 'assets', 'images', 'rocket-matter-logo.png');

        uploader.sendKeys(fullPath);

        await utils.sleep(1500);

        return true;
    });

    this.Then(/^I click on done$/, async function () {
        await utils.waitUntilElementIsVisible('file-url-done');
        await utils.sleep(500);

        await driver.findElement(by.id('file-url-done')).click();
        await utils.sleep(1000);

        await utils.waitUntilElementIsNotVisible('file-url-client-matter');
        await utils.sleep(1000);
        return true;
    });

    // Check the message error under empty/missing field
    this.Then(/^I should see url error message validations$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        let clientName = await driver.findElement(by.id('file-url-client-matter')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        let titleName = await driver.findElement(by.id('file-url-url-title')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        let dirURL = await driver.findElement(by.id('file-url-url')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        expect(clientName, `The error message should be ${data['clientnameMessage']}`).to.equal(data['clientnameMessage']);
        expect(titleName, `The error message should be ${data['titlenameMessage']}`).to.equal(data['titlenameMessage']);
        expect(dirURL, `The error message should be ${data['dirMessage']}`).to.equal(data['dirMessage']);
        await utils.sleep(1000);

        return true;
    });

    //wait to verify file opened
    this.Then(/^I should see the document modal as "([^"]*)"$/, async function (name) {
        let cleanedName = genericUtils.convertString(name);

        await utils.waitUntilElementIsVisible('document-bill-title');
        await utils.sleep(1000);

        let fileName = await utils.getTextFromElement(`document-bill-title-download`);
        await utils.sleep(1000);


        expect(fileName, "Document name should match with").to.equal(cleanedName);


        return true;

    });
};