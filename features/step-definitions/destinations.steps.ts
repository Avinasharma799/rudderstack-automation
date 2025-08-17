import { Given, When } from '@wdio/cucumber-framework';
import destinationsPage from '../pageobjects/destinations.page';

When('I open the Webhook destination in RudderStack', async () => {
    await destinationsPage.navigateToDestinationsPage();
    await destinationsPage.webhookSecurityDestination.waitForDisplayed({ timeout: 10000 });
    await destinationsPage.webhookSecurityDestination.click();
    console.log('Webhook Security destination is opened.');
});

When('I check the events tab', async () => {
    await destinationsPage.eventsTab.waitForDisplayed({ timeout: 10000 });
    await destinationsPage.eventsTab.click();
    console.log('Events tab is opened.');
});

Given('I read the count of delivered and failed events from the Webhook destination', async () => {
    await destinationsPage.refreshButton.waitForDisplayed({ timeout: 10000 });
    await destinationsPage.refreshButton.click();
    console.log('Refreshed the Webhook destination to get the latest event counts.');
    
    // Assuming there are elements to get delivered and failed events count
    const deliveredEventsCount = await $('selector-for-delivered-events-count').getText();
    const failedEventsCount = await $('selector-for-failed-events-count').getText();
    
    console.log(`Delivered Events Count: ${deliveredEventsCount}`);
    console.log(`Failed Events Count: ${failedEventsCount}`);
});