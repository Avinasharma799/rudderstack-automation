class LoginPage {
    // Locators
    get emailInput() {
        return $(`#text-input-email`);
    }

    get passwordInput() {
        return $(`#text-input-password`);
    }

    get loginButton() {
        return $(`//span[text()='Log in']/parent::button`);
    }

    get iWillDoThisLaterButton() {
        return $("//a[contains(text(),'do this later')]");
    }

    get goToDashboardButton() {
        return $(`//span[text()="Go to dashboard"]`);
    }   

    get fteCloseBtn() {
        return $(`//button[@aria-label="Close"]`);
    }
    // Login method
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

export default new LoginPage();