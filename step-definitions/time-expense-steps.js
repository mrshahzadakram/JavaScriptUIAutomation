const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');

module.exports = async function () {

    this.Then(/^I should see the time expense modal$/, async function () {
        await utils.waitUntilElementIsVisible('activity-type-time');
        await utils.sleep(500);
        return true;
    });

    this.When(/^I select the option "([^"]*)" in the time expense modal$/, async function (option) {
        switch (option) {
            case 'Time':
                await utils.selectCheckbox('activity-type-time');
                break;
            case 'Expense':
                await utils.selectCheckbox('activity-type-expense');
                break;
            case 'Flat Fee':
                await utils.selectCheckbox('activity-type-flat-fee');
                await utils.clickButton('activity-description-multi-line');
                break;
        }
        await utils.sleep(1000);
        return true;
    });
 
    this.When(/^I enter the following information in the time modal$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];
        //await utils.typeInInput('matter-name', data['Client : Matter']);
        await utils.selectAutoCompleteOption('matter-name', data['Client : Matter']);
        await utils.sleep(1000);
        await driver.findElement(by.css(`#DescriptionTxtArea`)).sendKeys(data['Description']);
        await utils.sleep(1000);
        await utils.typeInInput('activity-units', data['Billable Units']);
        await utils.sleep(1000);
        return true;
    });

    this.Then(/^I wait for the previous information in the time modal$/, async function () {
        await utils.waitUntilElementIsVisible('DescriptionTxtArea');
        await utils.sleep(2500);
        return true;
    });
   
    this.When(/^I enter the following information in the edit time modal$/, async function (table) {      
        let data = genericUtils.getObjectListFromTable(table)[0];     
        await driver.findElement(by.css(`#DescriptionTxtArea`)).sendKeys(data['Description']);
        await utils.sleep(1000);
        return true;
    });

    this.When(/^I enter the following information in the expense modal$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];
        //await utils.typeInInput('matter-name', data['Client : Matter']);
        await utils.selectAutoCompleteOption('matter-name', data['Client : Matter']);
        await utils.sleep(1000);
        await driver.findElement(by.css(`#DescriptionTxtArea`)).sendKeys(data['Description']);
        await utils.sleep(1000);
        await utils.typeInInput('activity-amount', data['Amount']);
        await utils.sleep(1000);
        await utils.typeInInput('tag-input', data['Tags']);
        await utils.sleep(1000);
        await utils.clickButton('select-tag');
        await utils.sleep(1000);
        return true;
    });

    this.When(/^I enter the following information in the flat fee modal$/, async function (table) {
        let data = genericUtils.getObjectListFromTable(table)[0];
        //await utils.typeInInput('matter-name', data['Client : Matter']);
        await utils.selectAutoCompleteOption('matter-name', data['Client : Matter']);
        await utils.sleep(1000);
        await driver.findElement(by.css(`#DescriptionTxtArea`)).sendKeys(data['Description']);
        await utils.sleep(1000);
        await utils.typeInInput('Flat-Fee', data['Amount']);
        await utils.sleep(1000);
        return true;
    });

    //Generic save
    this.Then(/^I save the "([^"]*)" time-expense$/, async function (value) {

        if(value == "empty")
        {            
            await utils.clickButton('activity-save');
            await utils.sleep(1500);
            return true;

        } else {
            await utils.clickButton('activity-save');
            await utils.waitUntilElementIsNotVisible('DescriptionTxtArea');
            return true;
        }
    });

    this.Then(/^I cancel time and expense modal$/, async function () {
        await driver.findElement(by.className(`cancel-link`)).click();
        await utils.sleep(1000);

        await utils.waitUntilElementIsNotVisible('DescriptionTxtArea');
        return true;
    });

    this.Then(/^I delete time-expense-flatfee$/, async function(){
        await utils.clickButton('activity-delete');
        await utils.sleep(1000);
        await utils.clickButton('delete_button');
        await utils.sleep(1000);
        await utils.waitUntilElementIsVisible('app-main');
        await utils.sleep(500);
        return true;
    });

      //Error validation -time
      this.Then(/^I should see time message error validation$/, async function(table){
        let data = genericUtils.getObjectListFromTable(table)[0];
        
        let clientName = await driver.findElement(by.id('matter-name')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        let billableUnits = await driver.findElement(by.id('activity-units')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        expect(clientName, `The error message should be ${data['matterMessage']}`).to.equal(data['matterMessage']);
        expect(billableUnits, `The error message should be ${data['billableMessage']}`).to.equal(data['billableMessage']);
        await utils.sleep(1000);

        return true;
    });

      //Error validation -expense
      this.Then(/^I should see expense message error validation of missing field$/, async function(table){
        let data = genericUtils.getObjectListFromTable(table)[0];
        
        let clientName = await driver.findElement(by.id('matter-name')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        let activityAmount = await driver.findElement(by.id('activity-amount')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        expect(clientName, `The error message should be ${data['matterMessage']}`).to.equal(data['matterMessage']);
        expect(activityAmount, `The error message should be ${data['amountMessage']}`).to.equal(data['amountMessage']);
        await utils.sleep(1000);

        return true;
    });
    
      //Error validation -flat fee    
      this.Then(/^I should see flat fee message error validation$/, async function(table){
        let data = genericUtils.getObjectListFromTable(table)[0];

        let matterName = await driver.findElement(by.id('matter-name')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        let flatfeeEntry = await driver.findElement(by.id('Flat-Fee')).findElement(by.css('.validation-errors li')).getText();
        await utils.sleep(1000);

        expect(matterName, `The error message should be ${data['matterMessage']}`).to.equal(data['matterMessage']);
        expect(flatfeeEntry, `The error message should be ${data['flatfeeMessage']}`).to.equal(data['flatfeeMessage']);
        await utils.sleep(1000);

        return true;
    });
};