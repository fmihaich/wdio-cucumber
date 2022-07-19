const { Then } = require('@wdio/cucumber-framework');
const assert = require('assert');

const LoginErrorAlert = require('../pageobjects/login.error.alert');

Then(/^the user sees the login "error" alert$/, async function () {
  const isDisplayed = await LoginErrorAlert.isDisplayed();
  assert.equal(isDisplayed, true, "The user does not see the login error alert");
});

Then(/^the user sees the "(.*)" message in the "error" alert$/, async function (expectedMessage) {
  const actualMessage = await LoginErrorAlert.getMessage();
  assert.equal(actualMessage, expectedMessage, "The error message is not the expected");
});
