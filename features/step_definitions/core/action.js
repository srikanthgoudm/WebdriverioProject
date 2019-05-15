module.exports = function () {
  /**
   * Navigate to an URL
   *
   * @returns {Promise}
   */
  this.When(/^I click on "([^"]*)"$/, function (selector) {
    return this.browser.click(selector);
  });

  /**
   * Hover and navigate to an element defined by a selector
   *
   * @returns {Promise}
   */
  this.When(/^I hover "([^"]*)" element$/, function (selector) {
    return this.browser.moveToObject(selector);
  });

  /**
   * Submit a form defined by a selector
   *
   * @returns {Promise}
   */
  this.When(/^I submit "([^"]*)" form$/, function (selector) {
    return this.browser.submitForm(selector);
  });
};
