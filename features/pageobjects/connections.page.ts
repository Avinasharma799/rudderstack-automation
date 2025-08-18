/**
 * Author: Avinash Kumar
 * Date: 2025-08-18
 * Description: Page object and methods for the Connections page in RudderStack.
 */
class ConnectionPage {
    get dataPlaneUrl() {
        return $(`//span[text()="Data Plane"]//following::span[1]`);
    }

    get collectMenu() {
        return $(`//div[@data-testid="menu-collect"]/*[@data-testid="Collect-submenu-arrow"]`);
    }

    get connectionsOption() {
        return $(`//a[@data-testid="sub-menu-connections"]`);
    }

    get httpSourceWriteKey() {
        return $(`//span[contains(text(),'Write key')]`);
    }

    async navigateToConnectionsPage() {
        await browser.refresh(); 
        const isOptionDisplayed = await this.connectionsOption.waitForDisplayed({ timeout: 10000 });
        isOptionDisplayed ? console.log('Connections option is displayed') : await this.collectMenu.click();
        await this.connectionsOption.click();
        await this.connectionsOption.click();
        await browser.pause(2000); // Wait for the page to load
    }

    async getHttpSourceWriteKey() {
        await this.httpSourceWriteKey.waitForDisplayed({ timeout: 10000 });
        const writeKeyText = await this.httpSourceWriteKey.getText();
        return writeKeyText.replaceAll("Write key ", "");
    }

    async getDataPlaneUrl() {
        let retries = 3;
        while (retries > 0) {
            try {
            await this.dataPlaneUrl.waitForDisplayed({ timeout: 10000 });
            await browser.waitUntil(
                async () => {
                const text = await this.dataPlaneUrl.getText();
                return text !== '';
                },
                {
                timeout: 10000,
                timeoutMsg: 'Data Plane URL text did not appear within 10s',
                }
            );
            break; 
            } catch (error) {
            retries--;
            if (retries === 0) {
                throw new Error('Data Plane URL not visible after 3 retries');
            }
            await browser.refresh();
            }
        }
        return await this.dataPlaneUrl.getText();
    }
}
export default new ConnectionPage();
