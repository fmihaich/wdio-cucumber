@Login
Feature: EriBank Login

  @Smoke
  Scenario: The user is successfully logged into the app when entering valid credentials
    Given the user completes the login data with the following credentials:
      | username | password |
      | company  | company  |
    When the user clicks on the "login" button
    Then the user is redirected to the EriBank home page

  Scenario: An error alert is shown when the user enters invalid login credentials
    Given the user completes the login data with the following credentials:
      | username | password |
      | invalid  | invalid  |
    When the user clicks on the "login" button
    Then the user sees the login "error" alert
    And the user sees the "Invalid username or password!" message in the "error" alert
