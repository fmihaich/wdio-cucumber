const { Then } = require('@wdio/cucumber-framework');
const assert = require('assert');

const HomePage = require('../pageobjects/home.page');

Then(/^the user is redirected to the EriBank home page$/, async function () {
  await HomePage.waitUntilIsLoaded();
  const balanceTextIsDisplayed = await HomePage.isBalanceTextDisplayed();
  assert.equal(balanceTextIsDisplayed, true, "The user is not in the app home page");
});

Then(/^the user sees his current banace in the EriBank home page$/, async function () {
  const balanceTextIsDisplayed = await HomePage.isBalanceTextDisplayed();
  assert.equal(balanceTextIsDisplayed, true, "The user balance is not displayed");
});

Then(/^the user sees the "(.*)" button in the EriBank home page$/, async function (btnText) {
  const buttonIsDisplayed = await HomePage.isButtonDisplayed(btnText);
  assert.equal(buttonIsDisplayed, true, "The expected button is not displayed: ", btnText);
});
