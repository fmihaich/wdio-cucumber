const LOGOUT_BUTTON_LOCATOR = "xpath://android.widget.Button[@text='Logout']";

class HomePage {
  get btnLogout() {
    return $(LOGOUT_BUTTON_LOCATOR);
  }

  async waitUntilIsLoaded() {
    const myElem = await this.btnLogout;
    await myElem.waitForDisplayed({ timeout: 40000 })
  }

  async isLogoutButtonDisplayed() {
    return await this.btnLogout.isDisplayed();
  }
}

module.exports = new HomePage();