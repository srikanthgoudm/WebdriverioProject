require('chai').should();

module.exports = function () {
  /**
   * Check for selected option in a select list
   */
  this.Then(/the "([^"]*)" current option contain "([^"]*)"$/, function (selector, expected) {
    const value = this.browser.getValue(selector);
    return this.browser.getHTML(`${selector} option[value="${value}"]`)
    .should.contain(expected);
  });

  /**
   * Check for field value containing string
   */
  this.Then(/the "([^"]*)" field should contain "([^"]*)"$/, function (selector, expected) {
    return this.browser.getValue(selector)
    .should.contain(expected);
  });

  /**
   * Check for field value NOT containing string
   */
  this.Then(/the "([^"]*)" field should not contain "([^"]*)"$/, function (selector, expected) {
    return this.browser.getValue(selector)
    .should.not.contain(expected);
  });
};
