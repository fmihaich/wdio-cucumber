const USERNAME_INPUT_LOCATOR = "id:com.experitest.ExperiBank:id/usernameTextField";
const PASSWORD_INPUT_LOCATOR = "id:com.experitest.ExperiBank:id/passwordTextField";
const SUBMIT_BUTTON_LOCATOR = "id:com.experitest.ExperiBank:id/loginButton";

class LoginPage {
  get inputUsername() {
    return $(USERNAME_INPUT_LOCATOR);
  }

  get inputPassword() {
    return $(PASSWORD_INPUT_LOCATOR);
  }

  get btnSubmit() {
    return $(SUBMIT_BUTTON_LOCATOR);
  }

  async completeUserData(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
  }

  async submitUserData() {
    await this.btnSubmit.click();
  }
}

module.exports = new LoginPage();
