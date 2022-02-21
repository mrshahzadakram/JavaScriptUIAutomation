const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require("../utils/genericUtils");

module.exports = async function() {

    this.Given(/^I load the login page$/, async function() {
        await helpers.loadPage(consts.baseUrl);
        return true;
    });

    //this.Given(/^Im logged into workmotion as "([^"]*)"$/, async function(user)
    this.Given(/^Im logged into workmotion as "([^"]*)"$/, async function (user)
     {
        await helpers.loadPage(consts.baseUrl);
        await driver.findElement(by.css(`input[name='email']`)).sendKeys(user);
        await driver.findElement(by.css(`input[id='password']`)).sendKeys(consts.defaultPassword);
        await driver.findElement(by.css(`button[type='submit'] div`)).click();
        await utils.sleep(2000);
        await utils.waitUntilElementIsVisibleByCss(`[data-testid='add-employee-menu']`);
        return true;
    });

    this.When(/^I click on the add employee button$/, async function() {
        await utils.waitUntilElementIsVisibleByCss(`button[data-testid='add-employee-menu']`);
        await driver.findElement(by.css(`button[data-testid='add-employee-menu']`)).click();
        await utils.sleep(1000);
        return true;
    });

    this.When(/^I select the add new option "([^"]*)"$/, async function(option) {
        let menu = await driver.findElement(by.css(`.add-new-panel ul`));
        switch (option) {
            case 'Time or Expense':
                await menu.findElement(by.id('add-new-time-expense')).click();
                break;
            case 'Flat fee':
                await menu.findElement(by.id('add-new-flatfee')).click();
                break;
            case 'Task':
                await menu.findElement(by.id('add-new-task')).click();
                break;
            case 'Message':
                await menu.findElement(by.id('add-new-message')).click();
                break;
            case 'File or URL':
                await menu.findElement(by.id('add-new-file')).click();
                break;
            case 'Contact':
                await menu.findElement(by.id('add-new-contact')).click();
                break;

            case 'Event':
                await menu.findElement(by.id('add-new-event')).click();
                break;
        }
        await utils.sleep(2000);
        return true;
    });

    this.Then(/^I should be on the main dashboard$/, async function() {
        await utils.waitUntilElementIsVisible('ctl00_HomeLinkImage');
        return true;
    });

    this.When(/^I navigate to the settings page$/, async function() {
        await helpers.loadPage(consts.settingsUrl);
        await utils.waitUntilElementIsVisible('settings-page');

        return true;
    });

    this.Then(/^I verify that the modal is closed$/, async function() {
        await utils.waitUntilElementIsVisible('app-main');
        await utils.sleep(1000);
        return true;
    });

    /**
     * Check the message inside a toaster alert. 
     * 
     * @param table should only contain 1 column named "Message" with the intented toaster alert message.
     */
    this.Then(/^I should see a success toaster alert with the following message$/, async function(table) {
        let data = genericUtils.getObjectListFromTable(table)[0];
        utils.waitUntilElementIsVisibleByCss('.message');

        let toasterMessage = await driver.findElement(by.css(`.message span`)).getText();

        expect(toasterMessage, `The toaster message should be ${data['Message']}`).to.equal(data['Message']);
        await utils.sleep(1000);
        return true;
    });

    this.Then(/^I refresh the site$/, async function() {
        await driver.navigate().refresh();
        await utils.sleep(1500);
        return true;
    });

    /**
     * Check if the current url includes the old page value
     * 
     * @param page The old page route (E.g: UserAddEdit.aspx)
     */
    this.Then(/^I should be redirected to the old "([^"]*)" page$/, async function(page) {
        await utils.waitUntilElementIsVisible('ctl00_bannerArea');
        let url = await driver.getCurrentUrl();
        expect(url.toString()).to.include(page);
        await utils.sleep(1000)
        return true;
    });

    /**
     * This common step if the the Origin Generic Modal,
     * so we can click any option inside of that modal.
     */
    this.Then(/^I click the confirm "([^"]*)" button from the confirmation modal$/, async function(option) {
        await utils.sleep(1500)
        switch (option) {
            case 'delete':
                await utils.clickButton('delete_button');
                await utils.waitUntilElementIsNotVisible('delete_button');
                break;
            case 'cancel':
                await utils.clickButton('cancel_button');
                await utils.waitUntilElementIsNotVisible('cancel_button');
                break;
            case 'ok':
                await utils.clickButton('ok_button');
                await utils.waitUntilElementIsNotVisible('ok_button');
                break;
            case 'confirm':
                await utils.clickButton('confirm_button');
                await utils.waitUntilElementIsNotVisible('confirm_button');
                break;
            default:
                break;
        }

        return true;
    });

    this.When(/^I navigate to the "([^"]*)" page$/, async function(page) {

        switch (page) {
            case 'tools':
                await helpers.loadPage(consts.toolsUrl);
                await utils.waitUntilElementIsVisible('tools-custom-fields');
                break;
            case 'contacts':
                await helpers.loadPage(consts.contactUrl);
                await utils.waitUntilElementIsVisible('contact-details-contact-listing');
                break;
            case 'calendar':
                await helpers.loadPage(consts.calendarUrl);
                await utils.waitUntilElementIsVisible('calendar-container');
                break;
            case 'legacy firm settings':
                await helpers.loadPage(consts.firmSettingsUrl);
                await utils.waitUntilElementIsVisible('A1');
                break;
            case 'user dashboard':
                await helpers.loadPage(consts.userDashboardUrl);
                await utils.waitUntilElementIsVisible('user-dashboard');
            case 'tasks':
                await helpers.loadPage(consts.tasksUrl);
                await utils.waitUntilElementIsVisible('task-grid');
                break;
            case 'cancel-subscription':
                await helpers.loadPage(consts.cancelSubscriptionUrl);
                await utils.waitUntilElementIsVisible('cancel-subscription-layout');
                break;
            case 'reports':
                await helpers.loadPage(consts.reportsUrl);
                await utils.waitUntilElementIsVisible('report-container');
                break;
            default:
                break;
        }

        return true;
    });

    this.When(/^I click on the user menu icon$/, async function() {
        await utils.clickButton('user-menu');
        await utils.sleep(1000)
        return true;
    });

    this.When(/^I click on the "([^"]*)" link of the user menu$/, async function(link) {

        switch (link) {
            case 'My Profile':
                await driver.findElement(by.css('#userMenu-myProfile a')).click();
                break;
            case 'Account Settings':
                await driver.findElement(by.css('#userMenu-settings a')).click();
                break;
            case 'Log Out':
                await driver.findElement(by.css('#userMenu-logout a')).click();
                break;
            default:
                break;
        }

        await utils.sleep(2000)

        return true;
    });
};