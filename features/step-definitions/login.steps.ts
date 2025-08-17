import { Given } from '@wdio/cucumber-framework';
import loginPage from '../pageobjects/login.page';
import {clickIfVisible} from '../../utils/utility';

Given('I am logged in to the RudderStack application', async () => {
    // RudderStack App URL - ideally keep this in wdio.conf.ts or an env variable
    const url = process.env.RUDDERSTACK_URL || "https://app.rudderstack.com/";
    const username = process.env.USERNAME || "prod_user";
    const password = process.env.PASSWORD || "prod_password";
    await browser.url(url);
    await browser.maximizeWindow();
    await browser.waitUntil(
        async () => (await browser.getTitle()).length > 0,
        {
            timeout: 10000,
            timeoutMsg: 'RudderStack app did not load in time'
        }
    );
    await loginPage.login(username, password);
    await clickIfVisible(loginPage.iWillDoThisLaterButton);
    await browser.pause(1000); // Optional: Pause to ensure the page is fully loaded
    await clickIfVisible(loginPage.goToDashboardButton);
    await browser.pause(1000);
    await clickIfVisible(loginPage.fteCloseBtn);
});