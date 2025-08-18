#Author: Avinash Kumar
#Date: 2025-08-18
#Description: This feature file validates the event delivery from an HTTP source to a Webhook destination
#             using various event types like identify, track, page, screen, group, alias, and batch.
Feature: Validate RudderStack Data Pipeline
  As a QA engineer
  I want to send an event from an HTTP source
  So that I can verify its delivery to the webhook destination

Background:
    Given I am logged in to the RudderStack application
    And I navigate to the connections page
    And I read and store the Data Plane URL from the top right corner
    And I copy the Write Key of the HTTP source
    And I open the Webhook destination in RudderStack
    And I check the events tab

  Scenario: Validate event delivery from HTTP source API: Identify to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: identify
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 1
    And I should see the failed events count is unchanged

   Scenario: Validate event delivery from HTTP source API: Track to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: track
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 1
    And I should see the failed events count is unchanged

   Scenario: Validate event delivery from HTTP source API: Page to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: page
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 1
    And I should see the failed events count is unchanged

  Scenario: Validate event delivery from HTTP source API: Screen to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: screen
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 1
    And I should see the failed events count is unchanged

  Scenario: Validate event delivery from HTTP source API: Group to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: group
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 1
    And I should see the failed events count is unchanged

   Scenario: Validate event delivery from HTTP source API: Alias to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: alias
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 1
    And I should see the failed events count is unchanged

   Scenario: Validate event delivery from HTTP source API: Batch to Webhook destination
    Given I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: batch
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is increased by 6
    And I should see the failed events count is unchanged