import { Given, Then, When } from '@wdio/cucumber-framework';
import connectionsPage from '../pageobjects/connections.page';
import { ApiHelper } from '../../utils/api-helper';

let dataPlaneUrlGlobal= '';
let httpSourceWriteKeyGlobal = '';
let responseGlobal: any;

Given('I navigate to the connections page', async () => {
    connectionsPage.navigateToConnectionsPage();
});


When('I read and store the Data Plane URL from the top right corner', async () => { 
    const dataPlaneUrl = await connectionsPage.dataPlaneUrl.getText();
    console.log(`Data Plane URL: ${dataPlaneUrl}`);
    dataPlaneUrlGlobal = dataPlaneUrl; 
});

When('I copy the Write Key of the HTTP source', async () => {
    const writeKey = await connectionsPage.getHttpSourceWriteKey();
    console.log(`HTTP Source Write Key: ${writeKey}`);
    httpSourceWriteKeyGlobal = writeKey; 
    await browser.pause(20000);
});

When(/^I send a test event to the HTTP Source API: (.+)$/, async (payloadType: string) => {
    // Retrieve global Data Plane URL and Write Key
    const dataPlaneUrl = dataPlaneUrlGlobal;
    const writeKey = httpSourceWriteKeyGlobal;

    if (!dataPlaneUrl || !writeKey) {
        throw new Error('Data Plane URL or Write Key is not set. Ensure previous steps are executed.');
    }
    const response = await ApiHelper.sendEvent(writeKey, dataPlaneUrl, payloadType);
    responseGlobal= response;
    console.log(`API Response Status: ${response.status}`);
    
});

Then('the API should return a success response', async () => { 
    expect(responseGlobal.status).toBe(200);
    console.log('API call was successful with 200 response code.');
});

When('I open the Webhook destination in RudderStack', async () => {
    // Navigate to the Webhook destination page
    await browser.url(`${dataPlaneUrlGlobal}/destinations/webhook`);
    await browser.pause(5000); // Wait for the page to load
});

Then('I should see the delivered events count is greater than 0', async () => {
    const deliveredEventsCount = await $('selector-for-delivered-events-count').getText();
    expect(parseInt(deliveredEventsCount, 10)).toBeGreaterThan(0);
});

Then('I should see the failed events count is 0', async () => {
    const failedEventsCount = await $('selector-for-failed-events-count').getText();
    expect(parseInt(failedEventsCount, 10)).toBe(0);
});
