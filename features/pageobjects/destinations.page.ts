class DestinationsPage{ 
    get destinationsOption() {
        return $(`//a[@data-testid="sub-menu-destinations"]`);
    }
    get collectMenu() {
        return $(`//div[@data-testid="menu-collect"]/*[@data-testid="Collect-submenu-arrow"]`);
    }

    get webhookSecurityDestination() {
        return $(`//div[text()='Webhook Security' and not(@role)]`);
    }

    get eventsTab() {
        return $(`//div[@role="tab" and text()="Events"]`);
    }

    get refreshButton() {
        return $(`//span[text()='Refresh']//parent::button`);
    }

    get deliveredEventsCount() {
        return $(`//span[text()='Delivered']//following::span[1]`);
    }

    get failedEventsCount() {
        return $(`//span[text()='Failed']//following::span[1]`);
    }

    async navigateToDestinationsPage() {
        const isOptionDisplayed = await this.destinationsOption.waitForDisplayed({ timeout: 10000 });
        isOptionDisplayed ? console.log('Destinations option is displayed') : await this.collectMenu.click();
        await this.destinationsOption.click();
    }

    async getDeliveredEventsCount() {
        await this.deliveredEventsCount.waitForDisplayed({ timeout: 10000 });
        const countText = await this.deliveredEventsCount.getText();
        return parseInt(countText, 10);
    }
    
    async getFailedEventsCount() {
        await this.failedEventsCount.waitForDisplayed({ timeout: 10000 });
        const countText = await this.failedEventsCount.getText();
        return parseInt(countText, 10);
    }
}
export default new DestinationsPage();