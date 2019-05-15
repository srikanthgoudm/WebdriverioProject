/**
 * Helper function to check checkboxes.
 *
 * @param state
 * @returns {Function}
 */
function checkInput(state) {
  return function (selector) {
    return this.browser.isChecked(selector)
    .then(isChecked => {
      if (isChecked !== state) {
        return this.driver.check(selector);
      }
      return null;
    });
  };
}

module.exports = function () {
  /**
   * Enter a value to a field
   *
   * @returns {Promise}
   */
  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/, function (selector, value) {
    return this.browser.setValue(selector, value);
  });

  /**
   * Select an option from a select list
   *
   * @returns {Promise}
   */
  this.When(/^I select "([^"]*)" from "([^"]*)"$/, function (text, selector) {
    return this.browser.selectByVisibleText(selector, text);
  });

  /**
   * Check a checkbox
   *
   * @returns {Promise}
   */
  this.When(/^I check "([^"]*)"$/, () => checkInput(true));
  this.When(/^I uncheck "([^"]*)"$/, () => checkInput(false));
};
