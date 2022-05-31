const OK_BUTTON_LOCATOR = "//android.widget.Button[@text='OK']";

class Alert {
  get btnOk() {
    return $(OK_BUTTON_LOCATOR);
  }

  async isDisplayed() {
    return await this.btnOk.isDisplayed();
  }

  async acceptAlert() {
    await this.btnOk.click();
  }
}

module.exports = new Alert();
