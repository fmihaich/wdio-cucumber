const {Given, When} = require('@wdio/cucumber-framework');

const Alert = require('../pageobjects/alert');
const LoginPage = require('../pageobjects/login.page');

Given(/^the user completes the login data with the following credentials:$/, async function (dataTable) {
  const data = dataTable.hashes();
  try {
    const displayedAlert = await Alert.isDisplayed();
    if (displayedAlert) {
      await Alert.acceptAlert();
    }
    await LoginPage.completeUserData(data[0].username, data[0].password);
  } catch (error) {
    console.log(error);
  }
});

When(/^the user clicks on the "login" button$/, async function () {
  await LoginPage.submitUserData();
});
