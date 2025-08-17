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
        const isOptionDisplayed = await this.connectionsOption.waitForDisplayed({ timeout: 10000 });
        isOptionDisplayed ? console.log('Connections option is displayed') : await this.collectMenu.click();
        await this.connectionsOption.click();
    }

    async getHttpSourceWriteKey() {
        const writeKeyText = await this.httpSourceWriteKey.getText();
        return writeKeyText.replaceAll("Write key ", "");
    }
}
export default new ConnectionPage();
