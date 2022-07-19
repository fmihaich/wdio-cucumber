const BALANCE_TEXT_LOCATOR = "xpath://android.view.View[contains(@text, 'Your balance is:')]";
const BUTTON_LOCATOR = "xpath://android.widget.Button[@text='{btnText}']";

class HomePage {
  get balanceText() {
    return $(BALANCE_TEXT_LOCATOR);
  }

  getButton(btnText) {
    return $(BUTTON_LOCATOR.replace('{btnText}', btnText));
  }

  async waitUntilIsLoaded() {
    const balanceTextTittle = await this.balanceText;
    await balanceTextTittle.waitForDisplayed({ timeout: 40000 })
  }

  async isBalanceTextDisplayed() {
    return await this.balanceText.isDisplayed();
  }

  async isButtonDisplayed(btnText) {
    return await this.getButton(btnText).isDisplayed();
  }
}

module.exports = new HomePage();