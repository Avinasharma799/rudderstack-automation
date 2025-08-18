import { Given } from '@wdio/cucumber-framework';
import loginPage from '../pageobjects/login.page';
import {clickIfVisible} from '../../utils/utility';

let islogin=false;
/**
 * Author: Avinash Kumar
 * Date: 2025-08-18
 * Description: Step definition to ensure the user is logged in to the RudderStack application
 */
Given('I am logged in to the RudderStack application', async () => {
    // RudderStack App URL - ideally keep this in wdio.conf.ts or an env variable
    if (islogin) {
        console.log('Already logged in, skipping login step.');
        return;
    }
    const url = process.env.APP_URL || "https://app.rudderstack.com/";
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
    await clickIfVisible(loginPage.goToDashboardButton);
    await clickIfVisible(loginPage.fteCloseBtn);
    islogin = true;
});