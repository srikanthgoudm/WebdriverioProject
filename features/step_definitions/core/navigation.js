module.exports = function () {
  /**
   * Navigate to an URL
   *
   * @returns {Promise}
   */
  this.Given(/^I am on "(.*)"$/, function (path) {
    return this.browser.url(`${this.config.baseUrl}${path}`);
  });

  /**
   * Navigate to the home page
   *
   * @returns {Promise}
   */
  this.Given(/^I am on (?:|the )home\s?page$/, function () {
    return this.browser.url(`${this.config.baseUrl}/`);
  });
  this.Given(/^I go to (?:|the )home\s?page$/, function () {
    return this.browser.url(`${this.config.baseUrl}/`);
  });

  /**
   * Reload the current page
   *
   * @returns {Promise}
   */
  this.Given(/I reload the page/, function () {
    return this.browser.refresh();
  });

  /**
   * Go back one page in the browser history
   *
   * @returns {Promise}
   */
  this.Given(/I go back one page/, function () {
    return this.browser.back();
  });
};
