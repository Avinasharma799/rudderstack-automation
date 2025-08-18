import { Given, When , Then} from '@wdio/cucumber-framework';
import destinationsPage from '../pageobjects/destinations.page';
import allure from '@wdio/allure-reporter';

let deliveredEventsCountBefore: number;
let failedEventsCountBefore: number;

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
    await destinationsPage.deliveredEventsCount.waitForDisplayed({ timeout: 10000 });
    deliveredEventsCountBefore = await destinationsPage.getDeliveredEventsCount();
    console.log(`Delivered Events Count Before: ${deliveredEventsCountBefore}`);
    await destinationsPage.failedEventsCount.waitForDisplayed({ timeout: 10000 });
    failedEventsCountBefore = await destinationsPage.getFailedEventsCount();
    console.log(`Failed Events Count Before: ${failedEventsCountBefore}`);
});

When('I refresh the Webhook destination in RudderStack', async () => {
    await destinationsPage.refreshButton.waitForDisplayed({ timeout: 10000 });
    await destinationsPage.refreshButton.click();
    await browser.pause(2000); // Wait for the refresh to complete
    console.log('Webhook destination is refreshed.');
});

Then('I should see the delivered events count is increased by {int}', async (increment: number) => {
    let retries = 8;
    let deliveredEventsCountAfter = await destinationsPage.getDeliveredEventsCount();
    while (deliveredEventsCountAfter !== deliveredEventsCountBefore + increment && retries > 0) {
        await destinationsPage.refreshButton.click();
        await browser.pause(15000);
        deliveredEventsCountAfter = await destinationsPage.getDeliveredEventsCount();
        retries--;
    }
    expect(deliveredEventsCountAfter).toBe(deliveredEventsCountBefore + increment);
    await browser.call(() => allure.addStep(`Delivered events count increased by ${increment}` + `: ${deliveredEventsCountAfter}`));
});

Then('I should see the failed events count is unchanged', async () => {
    const failedEventsCountAfter = await destinationsPage.getFailedEventsCount();
    expect(failedEventsCountAfter).toBe(failedEventsCountBefore);
    await browser.call(() => allure.addStep(`Failed count is unchanged: ${failedEventsCountAfter}`));
});