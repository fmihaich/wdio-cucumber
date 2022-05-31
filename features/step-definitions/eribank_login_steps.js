const {Given, When, Then} = require('@wdio/cucumber-framework');

const Alert = require('../pageobjects/alert');
const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');


const assert = require('assert');
/*const SecurePage = require('../pageobjects/secure.page');

const pages = {
  login: LoginPage
}*/

Given(/^the user completes the login data with valid credentials$/, async function () {
  const VALID_USERNAME = 'company';
  const VALID_PASSWORD = 'company';

  try {
    console.log('Then: Provide application credentials... Start');

    const displayedAlert = await Alert.isDisplayed();
    if (displayedAlert) {
      await Alert.acceptAlert();
    }

    await LoginPage.completeUserData(VALID_USERNAME, VALID_PASSWORD);

    console.log('Then: Provide application credentials...  End');
    console.log(' ');
  } catch (error) {
    console.log(error);
  }
});

When(/^the user clicks on the login button$/, async function () {
  console.log('When: Click on the login button ... Start');
  await LoginPage.submitUserData();
  console.log('When: Click on the login button... End');
  console.log('');
});

Then(/^the user is correctly loged into the app$/, async function () {
  console.log('Then: Checking if login suceeds... Start');

  await HomePage.waitUntilIsLoaded();
  let displayedLogout = await HomePage.isLogoutButtonDisplayed();
  assert.equal(displayedLogout, true, "The user is not loged into the app");
  console.log('Then: Checking if login suceeds... End');

});

/*Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});*/
