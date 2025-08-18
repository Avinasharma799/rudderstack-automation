/**
 * Clicks the element if it is visible.
 * @param {any} element - The WebdriverIO element to click.
 * @returns {Promise<void>}
 */
export async function clickIfVisible(element:any): Promise<void> {
    try {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    } catch (error) {
        console.error(`Element not visible or clickable: ${error}`);
    }
}