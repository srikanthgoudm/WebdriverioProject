require('chai').should();

const {HomepagePage} = require('../support/context/homepage/page');

module.exports = function () {
    this.Given(/I am on the Automation practice homepage/, function () {
        this.page = new HomepagePage(this);
        return this.page.open();
    });

    this.Then(/the page title should be \"([^\"]*)\"$"/, function (pageTitle) {
        console.log("the page title should be");
        this.page = new HomepagePage(this);
        const title = this.page.getPageTitle()
        return title.should.equal(pageTitle);
    });

    this.When(/^I select SignIn$/, function () {
        return this.browser.click('.login');
    });

    this.Then(/^I should be on the SignIn page$/, function () {
        return this.browser.isVisible('#login_form')
            .should.be.true;
    });

};
