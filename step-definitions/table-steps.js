const { onboardingService } = require("../services/authenticationService");
const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');

module.exports = async function() {

    this.Then(/^I should see the "([^"]*)" table$/, async function(feature) {
        await utils.waitUntilElementIsVisible(`${feature}-table`);
        await utils.sleep(1000);
        return true;
    });

    this.When(/^I click the add new button from the "([^"]*)" table$/, async function(feature) {
        let table = await driver.findElement(by.id(`${feature}-table`));
        await (table.findElement(by.id(`table-add-new`))).click();
        await utils.sleep(2000);
        return true;
    });

    this.When(/^I click the row matching this values$/, async function(table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        let index = await utils.getIndexOfValueInTable(data['Table'], data['Value'], data['Column']);
        if (index !== -1) {
            let tableElement = await driver.findElement(by.id(`${data['Table']}-table`));
            await (tableElement.findElement(by.id(`tableElement${index}-${data['Column']}`))).click();
            await utils.sleep(1000); 
        } else { //? Searched text not found
            expect(true, 'The given row does not exist in the table').to.equal(false); //? Hack to make the scenario fail
        }
        
        return true;
    });

    this.When(/^I click the edit button for the row matching this values$/, async function(table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        let index = await utils.getIndexOfValueInTable(data['Table'], data['Value'], data['Column']);
        if (index !== -1) { 
            let tableElement = await driver.findElement(by.id(`${data['Table']}-table`));
            await (tableElement.findElement(by.id(`tableElement${index}-edit-button`))).click();
            await utils.sleep(2000);
        } else { //? Searched text not found
            expect(true, 'The given row does not exist in the table').to.equal(false); //? Hack to make the scenario fail
        }
        
        return true;
    });

    this.When(/^I click the delete button for the row matching this values$/, async function(table) {
        let data = genericUtils.getObjectListFromTable(table)[0];

        let index = await utils.getIndexOfValueInTable(data['Table'], data['Value'], data['Column']);
        if (index !== -1) { 
            let tableElement = await driver.findElement(by.id(`${data['Table']}-table`));

            await (tableElement.findElement(by.id(`tableElement${index}-delete-button`))).click();
            await utils.sleep(2000);

            if(data['HasConfirmModal']){
                await driver.findElement(by.css(`#delete_button`)).click();
            }
        } else { //? Searched text not found
            expect(true, 'The given row does not exist in the table').to.equal(false); //? Hack to make the scenario fail
        }
        
        return true;
    });

    this.Then(/^The following values should match for the given table$/, async function(table) {
        await utils.sleep(5000); //? Give 5 seconds in order to wait for the table data to be refreshed from the API
        
        let data = genericUtils.getObjectListFromTable(table);

        for(let value of data){ 
            let exists = await utils.valueExistsInTable(value['Table'], value['Value'], value['Column']);
            expect(exists, 'The expected value does not exist in the table').to.equal(true);
        }
        
        await utils.sleep(1500)
        return true;
    });

    this.Then(/^The following values should not match for the given table$/, async function(table) {
        await utils.sleep(5000); //? Give 5 seconds in order to wait for the table data to be refreshed from the API
        let data = genericUtils.getObjectListFromTable(table)[0];
        let exists = await utils.valueExistsInTable(data['Table'], data['Value'], data['Column']);

        expect(exists, 'The expected value was found but should not exist in the table').to.equal(false);
        await utils.sleep(1500)
        return true;
    });
    
};