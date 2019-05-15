require('chai').should();

const {LoginPage} = require('../support/context/loginpage/page');

module.exports = function () {
   
    this.When(/^I login with username \"([^\"]*)\" and password \"([^\"]*)\"$/, function (username, password) {
        this.page = new LoginPage(this);
        return this.page.userLogin(username,password);
    });
    
    this.When(/^I should be login successfully$/, function () {
        this.page = new LoginPage(this);
        return this.page.isUserOnMyAccountPage()
            .should.be.true;
    });

};
