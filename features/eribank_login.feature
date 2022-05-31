Feature: EriBank Login

  @Login
  Scenario: User is successfully logged into the app when entering valid credentials
    Given the user completes the login data with valid credentials
    When the user clicks on the login button
    Then the user is correctly loged into the app
