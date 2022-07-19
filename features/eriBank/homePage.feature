@HomePage
Feature: EriBank Home Page

  Scenario: The user's balance is shown in the EriBank home page
    Given the user completes the login data with the following credentials:
      | username | password |
      | company  | company  |
    When the user clicks on the "login" button
    Then the user is redirected to the EriBank home page
    And the user sees his current banace in the EriBank home page

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
