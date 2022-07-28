@HomePage
Feature: EriBank Home Page

  @Q-3
  Scenario: The user's balance is shown in the EriBank home page
    Given the user completes the login data with the following credentials:
      | username | password |
      | company  | company  |
    When the user clicks on the "login" button
    Then the user is redirected to the EriBank home page
    And the user sees his current banace in the EriBank home page

  @Q-4
  Scenario: The expected buttons are shown in the EriBank home page
    Given the user completes the login data with the following credentials:
      | username | password |
      | company  | company  |
    When the user clicks on the "login" button
    Then the user is redirected to the EriBank home page
    And the user sees the "Make Payment" button in the EriBank home page
    And the user sees the "Mortgage Request" button in the EriBank home page
    And the user sees the "Expense Report" button in the EriBank home page
    And the user sees the "Logout" button in the EriBank home page

  @Q-5 @userInfo
  Scenario: The user sees the "Get user info" button in the home page
    Given the user completes the login data with the following credentials:
      | username | password |
      | company  | company  |
    When the user clicks on the "login" button
    Then the user is redirected to the EriBank home page
    And the user sees the "Get user info" button in the EriBank home page
