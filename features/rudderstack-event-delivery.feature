Feature: Validate RudderStack Data Pipeline
  As a QA engineer
  I want to send an event from an HTTP source
  So that I can verify its delivery to the webhook destination

Background:
    Given I am logged in to the RudderStack application
    And I navigate to the connections page
    And I read and store the Data Plane URL from the top right corner
    And I copy the Write Key of the HTTP source

  Scenario: Validate event delivery from HTTP source API: Identify to Webhook destination
    Given I open the Webhook destination in RudderStack
    And I check the events tab
    And I read the count of delivered and failed events from the Webhook destination
    When I send a test event to the HTTP Source API: identify
    Then the API should return a success response
    When I refresh the Webhook destination in RudderStack
    Then I should see the delivered events count is greater than 0
    # And I should see the failed events count is 0
