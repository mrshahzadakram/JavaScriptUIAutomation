const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');
const { waitUntilElementIsVisibleByCss } = require('../utils/uiUtils');
const { WebElement, Key } = require('selenium-webdriver');

module.exports = async function () {


    this.When(/^I click on the create new link of the add employee menu$/, async function () {
        await driver.findElement(by.css(`li[data-testid='create-new-item']`)).click();
        await utils.sleep(1000);
        return true;
    });

    this.Then(/^I should see the "([^"]*)" message on the page$/, async function (text) {
        await utils.sleep(8000);
        let actualText = await driver.findElement(by.xpath(`//h1[text()='Where do you want to hire?']`)).getText();
        await utils.sleep(1000);
        expect(text).to.equal(actualText);
        return true;
    });

   
    this.When(/^I select the "([^"]*)" country from the dropdown$/, async function (country) {
        await utils.sleep(1000);
        await utils.waitUntilElementIsVisibleByCss(`#main-container div[class*='-indicatorContainer']`);
        await driver.findElement(by.css(`#main-container div[class*='-indicatorContainer']`)).click();
        await utils.sleep(2000);
        await driver.findElement(by.css(`input[id*='react-select-']`)).sendKeys(country);
        await utils.sleep(1000);
        await driver.findElement(by.css(`div[class$='-menu']`)).click();
        await utils.sleep(3000);
        return true;
    });

    this.When(/^I click the get Started button on country selections page$/, async function () {
        await utils.sleep(1000);
        await utils.waitUntilElementIsVisibleByCss(`#onboarding-get-started-btn span`);
        await driver.findElement(by.css(`#onboarding-get-started-btn span`)).click();
        await utils.sleep(1000);
        return true;
    });

    this.Then(/^the following information should match for the contrat details page:$/, async function(table){
        await utils.sleep(5000);
        let data = genericUtils.getObjectListFromTable(table)[0];

        let stepList = await driver.findElements(by.xpath(`//ul[@data-testid='side-bar']//parent::span`));
        let step1_text = await stepList[1].getText();
        let step2_text = await stepList[3].getText();
        let step3_text = await stepList[5].getText();
        let step4_text = await stepList[7].getText();
        let step5_text = await stepList[9].getText();
        await utils.sleep(1000);
        console.log(step1_text);
        
        expect(step1_text).to.equal(`${data['STEP1']}`);
        expect(step2_text).to.equal(`${data['STEP2']}`);
        expect(step3_text).to.equal(`${data['STEP3']}`);
        expect(step4_text).to.equal(`${data['STEP4']}`);
        expect(step5_text).to.equal(`${data['STEP5']}`);
       
        await utils.sleep(1000);

        return true;
    });

    this.When(/^I fill the employee agreement details of step 1 using following information:$/, async function(table){
        await utils.sleep(3000);
        let data = genericUtils.getObjectListFromTable(table)[0];
        await driver.findElement(by.css(`input[placeholder*='first name']`)).sendKeys(`${data["Talent's First Name"]}`);
        await driver.findElement(by.css(`input[placeholder*='last name']`)).sendKeys(`${data["Talent's Last Name"]}`);
       let radioButtons = await driver.findElements(by.css(`p[class$='label']`));
       await utils.sleep(1000);
       let toggleSwitch = await driver.findElements(by.css(`div[class='react-switch-handle']`));

       if(`${data["Eligible To Work"]}`=="yes")
       {
       await radioButtons[0].click();
       }
       else
       {
        await radioButtons[1].click();
       }

       if(`${data["Executive"]}`=="yes")
       {
       await radioButtons[2].click();
       }
       else
       {
        await radioButtons[3].click();
       }

       await driver.findElement(by.css(`input[placeholder*='UI/UX']`)).sendKeys(`${data["Job Title"]}`);
       
       await driver.findElement(by.css(`textarea[placeholder*='description']`)).sendKeys(`${data["Job Description"]}`);
       console.log(__dirname);
       await utils.sleep(1500);
       //upload a file
    //    <qa job details>
       let uploader = await driver.findElement(by.css(`button#onboarding-upload-file-btn input`));

      let fullPath = path.join(__dirname, '..','qajobdetails.txt');
      console.log(fullPath);
     
       await uploader.sendKeys(fullPath);

       await utils.sleep(4500);

       //employment type selection

       if(`${data["Employment Type"]}`=="full-time")
       {
       await radioButtons[4].click();
       }
       else
       {
        await radioButtons[5].click();
       }
       await utils.sleep(1500);
    //Working hours
    await driver.findElement(by.css(`input[type='number']`)).click();
    await utils.sleep(1500);
    await driver.findElement(by.css(`input[type='number']`)).clear();
    await utils.sleep(1500);
    await driver.findElement(by.css(`input[type='number']`)).sendKeys(Key.BACK_SPACE);
    await driver.findElement(by.css(`input[type='number']`)).sendKeys(Key.BACK_SPACE);
    await utils.sleep(1500);
    await driver.findElement(by.css(`input[type='number']`)).sendKeys(`${data["Working Hours"]}`);

    //contract type 
    if(`${data["Contract Type"]}`=="fixed-term")
    {
    await toggleSwitch[0].click();
    }
    //contract start date
    await utils.sleep(1500);
    let datePickers = await driver.findElements(by.css("div[class^='react-datepicker'] input"));
    await datePickers[0].click();
    await utils.sleep(1500);
    await datePickers[0].sendKeys(`${data["Contract Start Date"]}`);
    //contract end date if it is fixed term
    if(`${data["Contract Type"]}`=="fixed-term")
    {
        await datePickers[1].sendKeys(`${data["Contract End Date"]}`);
    }

    //reimbursement 
    if(`${data["Reimburse Expenses"]}`=="yes")
    {
    await toggleSwitch[1].click();
    }

    //work from home
    if(`${data["Work From Home"]}`=="no")
    {
    await toggleSwitch[2].click();

   await driver.findElement(by.css(`textarea[placeholder*='addressline']`)).sendKeys("Test Address");
    }

    //Cost center / Invoice Reference
    await driver.findElement(by.css(`input[placeholder*='Cost Center']`)).sendKeys(`${data["Invoice Reference"]}`);

    // Entity Receiving Talent's Services

    await driver.findElement(by.css(`input[placeholder*='Please insert']`)).sendKeys(`${data["Entity"]}`);

    return true;

    });

    //continue

    this.When(/^I click continue button$/, async function () {
        await utils.sleep(3000);
        await driver.findElement(by.css(`button[id='onboarding-continue-btn']`)).click();
        //await driver.findElement(by.css(`#onboarding-get-started-btn span`)).click();
        await utils.sleep(1000);
        return true;
    });

    //fill the contract clauses details of step 2 

    this.When(/^I fill the contract clauses details of step 2 using following information:$/, async function(table){

        await utils.sleep(6000);
        if (await driver.findElement(by.xpath(`//h1[text()='Contract Clauses']`)).getText()=="Contract Clauses")
        {
        
        let data = genericUtils.getObjectListFromTable(table)[0];

        let timeEntries = await driver.findElements(by.css(`input[type='number']`));
        await timeEntries[0].click();
    await utils.sleep(1500);
    await timeEntries[0].clear();
    await utils.sleep(1500);
    await timeEntries[0].sendKeys(Key.BACK_SPACE);
    await timeEntries[0].sendKeys(Key.BACK_SPACE);
        await utils.sleep(1000);
        await timeEntries[0].sendKeys(`${data["PTO"]}`);
        await utils.sleep(3000);
        if(`${data["Probationary Period"]}`=="yes")
        {
            //probation period
         await driver.findElement(by.css(`div[class='react-switch-handle']`)).click();
         await utils.sleep(3000);
         await timeEntries[1].click();
    await utils.sleep(1500);
    await timeEntries[1].clear();
    await utils.sleep(1500);
    await timeEntries[1].sendKeys(Key.BACK_SPACE);
    await timeEntries[1].sendKeys(Key.BACK_SPACE);
        await utils.sleep(1000);
         await timeEntries[1].sendKeys(`${data["Probation Period"]}`);
         await utils.sleep(2000);
         //termination period
    await timeEntries[2].click();
    await utils.sleep(1500);
    await timeEntries[2].clear();
    await utils.sleep(1500);
    await timeEntries[2].sendKeys(Key.BACK_SPACE);
    await timeEntries[2].sendKeys(Key.BACK_SPACE);
        await utils.sleep(1000);
         
         await timeEntries[2].sendKeys(`${data["Termination Period"]}`);
        }
        else
        {
            await utils.sleep(1000);
             //only termination period
             await timeEntries[1].click();
             await utils.sleep(1500);
             await timeEntries[1].clear();
             await utils.sleep(1500);
             await timeEntries[1].sendKeys(Key.BACK_SPACE);
             await timeEntries[1].sendKeys(Key.BACK_SPACE);
                 await utils.sleep(1000);
         await timeEntries[1].sendKeys(`${data["Termination Period"]}`);
        }

        //Additional information/Anything else
        await utils.sleep(1000);
        await driver.findElement(by.css(`textarea[placeholder*='additional']`)).sendKeys(`${data["Anything Else"]}`);
    }

        return true;
    });


    // Step 3
    this.When(/^I fill the salary calculator details of step 3 using following information:$/, async function(table){

        await utils.sleep(5000);
        if (await driver.findElement(by.xpath(`//h1[text()='Salary Calculator']`)).getText()=="Salary Calculator")
        {
        
        let data = genericUtils.getObjectListFromTable(table)[0];
        
        await utils.sleep(2000);
        
        await utils.sleep(2000);
        if(`${data["Bonus"]}`=="yes")
        {
            await driver.findElement(by.css(`div[class='react-switch-handle']`)).click();
            await utils.sleep(3000);
            let inputTexts = await driver.findElements(by.css(`input[type='number']`));
            await inputTexts[0].sendKeys(`${data["Base Salary"]}`);
            let frequencyOptions = await driver.findElements(by.css(`p[class$='label']`));
            fequencyValue = `${data["Bonus Frequency"]}`;
            switch (fequencyValue) {
                case 'yearly':
                    await frequencyOptions[0].click();
                    break;
                case 'half-yearly':
                    await frequencyOptions[1].click();
                    break;
                case 'quarterly':
                    await frequencyOptions[2].click();
                case 'monthly':
                    await frequencyOptions[3].click();
                    break;
            }
            await utils.sleep(2000);
            await inputTexts[1].sendKeys(`${data["Gross Annual Bonus"]}`);
            await utils.sleep(2000);
            await driver.findElement(by.css(`textarea[placeholder*='bonus']`)).sendKeys(`${data["Anything Else"]}`);
            await utils.sleep(2000);
            
        }
       


    }

        return true;
    });


    this.When(/^I click on calculate button on salary calculator$/, async function () {
        await utils.sleep(2000);
        await driver.findElement(by.css(`button[name='calculate'] span`)).click();
        await utils.sleep(1000);
        return true;
    });


this.Then(/^I should see "([^"]*)" section containing "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" and "([^"]*)" details on salary calculator page$/, async function (str1, str2, str3, str4, str5, str6 ) {
    await utils.sleep(2000);
   let Actualtext = await driver.findElement(by.xpath(`//p[contains(text(),'Other payments')]`)).getText();
    await utils.sleep(1000);
    
    return true;
});




// Step 4
this.When(/^I fill the invite employee details of step 4 using following information:$/, async function(table){

    await utils.sleep(5000);
    if (await driver.findElement(by.xpath(`//h1[text()='Now it is time to invite your employee.']`)).getText()=="Now it is time to invite your employee.")
    {
    
    let data = genericUtils.getObjectListFromTable(table)[0];
    let inputText = await driver.findElement(by.css(`input[type='email']`));
let emailText = "talent_test" + genericUtils.getRandomNumber(1, 10000) + "@mailinator.com";
    await inputText.sendKeys(emailText);

    }
    return true;
});

//I should see that the summary review details on step 5 has "CONTRACT DETAILS" "CONTRACT CLAUSES" "SALARY CALCULATOR" "INVITE EMPLOYEE" "FEE ESTIMATE" sections 

this.Then(/^I should see that the summary review details on step 5 has "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" sections$/, async function (str1, str2, str3, str4, str5 ) {
    await utils.sleep(6000);
   let Actualtext = await driver.findElement(by.xpath(`//p[contains(text(),'Contract Details')]`)).getText();
    await utils.sleep(1000);
    expect(str1.toLowerCase()).to.equal(Actualtext.toLowerCase());
    return true;
});
/*
this.Then(/^I should see "([^"]*)" section containing "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" and "([^"]*)" details on salary calculator page$/, async function (str1, str2, str3, str4, str5, str6 ) {
    await utils.sleep(2000);
   let Actualtext = await driver.findElement(by.xpath(`//p[contains(text(),'Other payments')]`)).getText();
    await utils.sleep(1000);
    expect(str1.toLowerCase()).to.equal(Actualtext.toLowerCase());
    return true;
});
*/
this.Then(/^I should be able to download agreement$/, async function () {
    await utils.sleep(2000);
   await driver.findElement(by.xpath(`//span[contains(text(),'Download Agreement')]`)).click();
    await utils.sleep(3000);
    return true;
});

// I click the checkbox on summary review page to confirm onboarding process
this.When(/^I click the checkbox on summary review page to confirm onboarding process$/, async function () {
    await utils.sleep(2000);
   await driver.findElement(by.css(`[for='serviceAgreement'] span`)).click();
    await utils.sleep(2000);
    return true;
});


this.When(/^I click finish button to complete onboarding$/, async function () {
    await utils.sleep(3000);
   await driver.findElement(by.css(`#onboarding-finish-btn`)).click();
    await utils.sleep(2000);
    return true;
});

//Congratulations, Onboarding has started!

this.Then(/^I should see a message "([^"]*)" on new page$/, async function(str){

    await utils.sleep(5000);
  actualText = await driver.findElement(by.xpath(`//h1[contains(text(),'Congratulations, Onboarding has started!')]`)).getText();

  expect(str).to.equal(actualText);
    return true;
});

//I should see "ADDITIONAL DETAILS NEEDED" text on new page
this.Then(/^I should see "([^"]*)" text on new page$/, async function(str){

    await utils.sleep(5000);
  actualText = await driver.findElement(by.xpath(`//h2[contains(text(),'Additional Details needed')]`));
    return true;
});

//I fill the additional finance details and manager details using following information:
this.When(/^I fill the additional finance details and manager details using following information:$/, async function(table){

    let data = genericUtils.getObjectListFromTable(table)[0];
    let inputText = await driver.findElement(by.css(`input[name='financeContactEmail']`));

    await inputText.sendKeys(`${data["Email Address"]}`);

let fname = await driver.findElement(by.css(`input[name='managerDetails.firstName']`));

    await fname.sendKeys(`${data["First Name"]}`);

    let lname = await driver.findElement(by.css(`input[name='managerDetails.lastName']`));

    await lname.sendKeys(`${data["Last Name"]}`);
    await utils.sleep(2000);
    let emailText = await driver.findElement(by.css(`input[name='managerDetails.email']`));

    await emailText.sendKeys(`${data["Manager Email"]}`);
    await utils.sleep(2000);

    return true;
});

//button[type='submit'] span

this.When(/^I click finish button$/, async function(){

    await utils.sleep(2000);
 await driver.findElement(by.css(`button[type='submit'] span`)).click();
    return true;
});

//Then I should see a confirmation message "Thanks for completing the onboarding experience!"
this.Then(/^I should see a confirmation message "([^"]*)"$/, async function(str){

    await utils.sleep(5000);
  actualText = await driver.findElement(by.xpath(`//h1[contains(text(),'Congratulation')]`));
    return true;
});

//I click action items link from left panel of the page
this.When(/^I click action items link from left panel of the page$/, async function(){
    await utils.sleep(2000);
  await driver.findElement(by.xpath(`//span[contains(text(),'Action Items')]`)).click();
    return true;
});

this.Then(/^I should see "([^"]*)" page containing "([^"]*)" related records$/, async function(str1, str2){
    await utils.sleep(5000);
  actualText = await driver.findElement(by.xpath(`//h2[contains(text(),'Action items')]`));
  let records = await driver.findElements(by.css(`section[data-is-completed='false']`));
    return true;
});


//I click mark as done button against newly created record
this.When(/^I click mark as done button against newly created record$/, async function(){
    await utils.sleep(2000);
  btns = await driver.findElements(by.css(`section[data-is-completed='false'] button[id*='mark-done']`));
   await btns[0].click();


    return true;
});

this.Then(/^I should see that new entry has now done status in action items page$/, async function(){

    await utils.sleep(2000);
  filterBtns = await driver.findElements(by.css(`header button[type='button']`));
  await filterBtns[2].click();
  await utils.sleep(2000);
  await driver.findElement(by.xpath(`//li[contains(text(),'Done')]`)).click();
  await utils.sleep(6000);
  doneRecords = await driver.findElements(by.css(`span[data-is-completed='true']`));
  await utils.sleep(3000);
  let Actualtext = "done";
  let doneText = await doneRecords[0].getText();
  console.log(doneText);
  expect(doneText.toLowerCase()).to.equal(Actualtext);
  
    return true;
});



};