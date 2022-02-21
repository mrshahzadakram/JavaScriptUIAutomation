const genericUtils = require("./genericUtils");

class utils {
    static async typeInInput(id, text) {
        await this.scrollToElement(id);
        await driver.findElement(by.css(`#${id} input`)).sendKeys(text);
    }

    static async typeInTextarea(id, text) {
        await this.scrollToElement(id);
        await driver.findElement(by.css(`#${id} textarea`)).sendKeys(text);
    }
    
    static async typeInTagInput(id, text) {
        await this.scrollToElement(id);
        await driver.findElement(by.css(`#${id} input`)).sendKeys(text);
        await driver.findElement(by.css(`#${id} .add`)).click();
    }

    static async clickButton(id) {
        await this.scrollToElement(id);
        await driver.findElement(by.css(`#${id}`)).click();
    }

    static async selectCheckbox(id) {
        await this.scrollToElement(id);
        await driver.findElement(by.css(`#${id} label`)).click();
    }

    static async selectOption(id, option) {
        await this.scrollToElement(id);
        await driver.findElement(by.css(`#${id}`)).click();
        this.sleep(300);
        await this.scrollToElement('select-option0');
        this.sleep(300);
        await driver.findElement(by.css(`#${id} .options li`)).findElement(by.xpath(`//*[contains(text(), '${option}')]`)).click();
        this.sleep(300);
    }

    static async selectAutoCompleteOption(id, text) {
        await utils.typeInInput(id, text);
        await this.sleep(1500);
        await driver.findElement(by.css(`#${id} .options li`)).click();
        await this.sleep(300);
    }

    static sleep(milliseconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, milliseconds);
        });
    }

    static async enterDataInForm(table) {
        let values = genericUtils.getKeyValFromTable(table);

        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            await utils.typeInInput(value.key, value.value);
        }
    }

    static async scrollToElement(id) {
        let element = driver.findElement(by.css(`#${id}`));
        await driver.executeScript("arguments[0].scrollIntoView()", element);
        await driver.sleep(300);
    }

    static async scrollToElementById(id) {
        let element = driver.findElement(by.id(id));
        await driver.executeScript("arguments[0].scrollIntoView()", element);
        await driver.sleep(300);
    }

    static async goToFrame(id) {
        await driver.switchTo().frame(id);
    }

    static async waitUntilElementIsVisible(id) {
        await driver.wait(until.elementsLocated(by.id(id)), 10000);
    }

    static async waitUntilElementIsVisibleByCss(css) {
        await driver.wait(until.elementsLocated(by.css(css)), 10000);
    }

    static async waitUntilElementIsNotVisible(id) {
        await driver.wait(async function() {
            try {
                let element = await driver.findElement(by.css(`#${id}`));
                return element == null;
            } catch (e) {
                return true;
            }
        }, 10000);
    }

    static async waitUntilElementIsNotVisibleByCss(css) {
        await driver.wait(async function() {
            return driver.getTitle().then(function(title) {
                try {
                    let element = driver.findElement(by.css(css));
                    return false;
                } catch (e) {
                    return true;
                }
            });
        }, 10000);
    }

    /**
     * Get the value inside a HTML input element.
     * 
     * @param element The id or class of the element.
     * @param isById Flag to decide if the element is looked by id.
     */
    static async getValueFromElement(element, isById = false) {

        if (isById) {
            var value = await driver.findElement(by.id(`${element}`)).getAttribute("value");
        } else {
            var value = await driver.findElement(by.css(`.${element}`)).getAttribute("value");
        }

        return value;
    }

    /**
     * Get the text from a HTML element.
     * 
     * @param element The id or class of the element.
     * @param isById Flag to decide if the element is looked by id.
     */
    static async getTextFromElement(element, isById = false) {
        let text;
        if (isById) {
            text = await driver.findElement(by.id(`${element}`)).getText();
        } else {
            text = await driver.findElement(by.css(`.${element}`)).getText();
        }

        return text;
    }

    /**
     * Get the value of a custom RM text-input component.
     * 
     * @param id The id of the element to look for.
     */
    static async getValueFromTextInput(id) {
        await this.scrollToElement(id);
        return await driver.findElement(by.css(`#${id} input`)).getAttribute('value');
    }

    /**
     * Clear Text Input field
     * 
     * @param value The id of the element to look for.
     */
    static async clearInput(value) {
        await driver.findElement(by.css(`#` + value + ` input`)).clear();
    }
    
    /**
     * Clear Text Area field
     * 
     * @param value The id of the element to look for.
     */
    static async clearTextarea(value) {
        await driver.findElement(by.css(`#` + value + ` textarea`)).clear();
    }

    /**
     * Makes the validation
     * 
     * @param tag The html element
     * @param expectedValue The expected value
     */
    static async matchExpectedValue(tag, expectedValue) {
        let actualValue = await this.getTextFromElement(tag);

        expect(actualValue, 'The actual value should match the expected value.').to.equal(expectedValue);
    }

    static async valueExistsInTable(tableName, expectedValue, column) {
        let table = await driver.findElement(by.id(`${tableName}-table`));
        let body = await (table.findElement(by.tagName(`tbody`)));
        let rowsCount = (await (body.findElements(by.tagName(`tr`)))).length;

        for (let i = 0; i < rowsCount; i++) {
            let text = await table.findElement(by.id(`tableElement${i}-${column}`)).getText();

            if (text.includes(expectedValue)) {
                return true;
            }
        }

        return false;
    }

    static async getIndexOfValueInTable(tableName, expectedValue, column) {
        let table = await driver.findElement(by.id(`${tableName}-table`));
        let body = await (table.findElement(by.tagName(`tbody`)));
        let rowsCount = (await (body.findElements(by.tagName(`tr`)))).length;

        for (let i = 0; i < rowsCount; i++) {
            let text = await table.findElement(by.id(`tableElement${i}-${column}`)).getText();

            if (text.includes(expectedValue)) {
                return i;
            }
        }

        return -1;
    }
}

module.exports = utils;