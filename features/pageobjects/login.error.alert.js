const TITLE_LOCATOR = "id:android:id/alertTitle";
//const TITLE_LOCATOR = "xpath://android.widget.TextView[@resource-id='android:id/alertTitle']";
//const MESSAGE_LOCATOR = "android:id/message";
const MESSAGE_LOCATOR = "xpath://android.widget.TextView[@resource-id='android:id/message']";

class LoginErrorAlert {
  get alertTitle() {
    return $(TITLE_LOCATOR);
  }

  get alertMessage() {
    return $(MESSAGE_LOCATOR);
  }

  async isDisplayed() {
    return await this.alertTitle.isDisplayed();
  }

  async getMessage() {
    return await this.alertMessage.getText();
  }
}

module.exports = new LoginErrorAlert();
