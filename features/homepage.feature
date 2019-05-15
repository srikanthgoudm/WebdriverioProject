Feature: User login for automationpractice.com website
  As a customer
  I want to see login page
  So that I can login and access my aacount

  @smoke
  Scenario: I can login successfully into my account
    Given I am on the Automation practice homepage
    Then the page title should be "My Store"
    When I select SignIn
    Then I should be on the SignIn page
    When I login with username "testaccount@mailinator.com" and password "Password1"
    Then I should be login successfully
