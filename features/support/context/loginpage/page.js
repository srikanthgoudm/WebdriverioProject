const { Page } = require('./../core/page');

class LoginPage extends Page {
    constructor(world) {
        super(world);
    }

    getPageTitle() {
        const pageTitle = this.getTitle();
        console.log(pageTitle)
        return pageTitle;
    }

    /**
     * Fill login credentials
     *
     * @param {string} email
     * @param {string} password
     */
    userLogin(username, password) {
        this.browser.setValue('#email', username);
        this.browser.setValue('#passwd', password);
        this.browser.click('#SubmitLogin');
    }


    isUserOnMyAccountPage() {
        return this.browser.isVisible('.info-account')
    }
}

module.exports = { LoginPage };
