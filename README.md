<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img align="center" src="assets/images/rm_banner_logo.png" alt="Logo" height="80">

<h1 align="center">UI Automation</h1>

  <p align="center">
    UI Automation for every feature on WorkMotion application. 
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
### Built With

* [Node.js](https://nodejs.org/en/)
* [Selenium Cucumber JS](https://www.npmjs.com/package/selenium-cucumber-js)
* [Cucumber - Gherking](https://cucumber.io/docs/gherkin/reference/)
* [Chai Assertion Library](https://www.chaijs.com/api/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Project Structure

* **`Assets`**: All images, files or documents that are required for testing.
* **`Features`**: All Gherking and test cases are declared here.
* **`Scripts`**: Useful scripts to run a specific scenario for a given feature or run all scenarios and features at a time.
* **`Step Definitions`**: Where Gherking and code connects. Wireup the steps defined in the feature.
* **`Utils`**: Any useful UI utils and JS generic utils that can be used on the project.



<!-- GETTING STARTED -->
## Getting Started

In order to start using or testing the project, there are a series of steps that must be followed. To get a working local copy, follow these steps.

### Prerequisites

If you haven't cloned the project yet, the first step you should do is clone the repository via HTTPS or SSH, if you have your keys configured.

```sh
   git clone https://{user}@bitbucket.org/rocketmatter/automation-v3.git
```

In order to run the project's commands and scripts, you need to have NodeJS  and NPM installed. If you don't have it installed yet, follow these steps:

1. Download NodeJS operating system you use from this link below:

    [Node.js](https://nodejs.org/en/download/)

2. Once the installer finishes downloading, launch it. Open the downloads link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch, and then follow the steps that the installer will indicate in order to have NodeJs and NPM installed.

3. Finnaly, once the installation process is done, you can verify the instalattion with this steps:

* Open a command prompt (or PowerShell), and enter the following:
  ```sh
  node -v
  ```
  The system should display the Node.js version installed on your system.

* You can do the same for NPM:
  ```sh
   npm -v
  ```
### Installation

Once you have the prerequisites and the project on your machine, before you can start working on the project, but you must first install all the necessary packages and libraries for the project. These are the steps you must follow in order to run the project correctly:

1. Open your preferred text editor, and open the project within the editor. [(Visual Studio Code Recommended)](https://code.visualstudio.com/download)

2. Open a command prompt (or PowerShell), and make sure you are in the /automation-v3 directory. Once inside that directory, run the following command to install NPM packages: 
   ```sh
   npm install
   ```
3. Automation requires an instance of Chrome to run the features, so it is necessary to have the chrome driver updated with your version of Chrome on your machine. Check the version of your Chrome browser, then you can go and download the driver that matches the version of your browser version.
This is the link where you can download the [ChromeDriver](https://chromedriver.chromium.org/downloads).
  
4. Now that you have downloaded the chrome driver, go to the zip file inside your downloads (or the place where you have downloaded the chromedriver) anf make sure that the zip file is unbloked. You can verify that by right clicking on the file, then going to properties, and seeing if the Unblocked checkbox is selected.

5. In your terminal, on the root of the project (automation-v3), run this command:

    ```sh
    npm install chromedriver --chromedriver_filepath={pathToYourChromedriver}\chromedriver_win32.zip
    ```
5. Then, run these commands:

    ```sh
    cd .\node_modules\selenium-cucumber-js\
    ```
    ```sh
    npm install chromedriver --chromedriver_filepath={pathToYourChromedriver}\chromedriver_win32.zip
    ```
6. Now you should be able to work and test the project!


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Now that you are done with the installation, you should now be able to work and test the project!

### Scripts

There are some scripts that will help you to run a specific scenario or the complete project. Those scripts are located on the `scripts` folder.

> :alien: **To use the scripts** you will have to be on the /scrips directory. 

#### Run specific scenario

* Windows
    ```sh
    .\run-specific-scenario.bat name-of-the-scenario
    ```
* Mac OS
    ```sh
    .\run-specific-scenario.sh name-of-the-scenario
    ```
#### Run all scenarios

* Windows
    ```sh
    .\run-all-scenarios.bat
    ```
* Mac OS
    ```sh
    .\run-all-scenarios.sh
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- File Examples -->
## File Examples

These are some examples that you can use when creating new features.

### Feature File

```gherkin
Feature: Feature_Name
  Feature description goes here.

  @example-scenario
  Scenario: 001 Example of a feature file
    Given Im logged into Rocket Matter as "sjones"
    When I navigate to the "settings" page
    Then I should see settings page features
    And I should be able to see the add-new button
```
### Step Definition File

```javascript
const utils = require('../utils/uiUtils');
const consts = require('../utils/consts');
const genericUtils = require('../utils/genericUtils');

module.exports = async function() 
{
    /*
    * This is an example of a simple Then step definition
    */
    this.Then(/^$/, async function() 
    {
        return true;
    });

    /*
    * This is an example of a simple When step definition
    */
    this.When(/^$/, async function() 
    {
        return true;
    });

    /*
    * This is an exmaple of how you recieve a variable form the feature/
    * gherking.
    */
    this.Then(/^"([^"]*)"$/, async function(value) 
    {
        return true;
    });
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- File Examples -->
## Change Environment or Install

Inside the utils folder, in the file **consts.js** you will see that there is a base constant, you can use that constant to change the environment or install, you just have to change it in that line of code.

```javascript
//Change the environment or install.
//const base = `http://localhost/otive_test/`;
const base = `https://rm31az2.rocketmatter.net/API_V3_Test01/`;
```


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- File Examples -->
## Notes

For this project we have some good programming practices and version control management, in order to have a clean code of the best quality.

1. For any change or new feature that we make to the project, a new branch must be created from master. You can use the following command to create a new branch from master: 
    ```sh
    git checkout -b name_new_branch origin/master
    ```
    > **name_new_branch** will be the name of the new branch.

2. When we have finished a feature or some change, we create a pull request from the branch we created to master. You can do that from the Bitbucket interface.

3. To ensure that the code we are delivering is always at the highest level of quality and logic, the Pull Requests will be reviewed by the other members of the team in order to verify that everything is optimal.


<p align="right">(<a href="#top">back to top</a>)</p>
