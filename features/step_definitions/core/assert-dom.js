require('chai').should();

/**
 * Helper function to check element states.
 *
 * @param method
 * @param state
 * @returns {Function}
 */
function elementState(method, state) {
  return function (selector) {
    return this.driver[method](selector).
      should.be[state];
  };
}

module.exports = function () {
  /**
   * Check for text on the page
   */
  this.Then(/I should see "([^"]*)"$/, function (content) {
    return this.browser.getHTML('body').
      should.include(content);
  });

  /**
   * Check for text NOT on the page
   */
  this.Then(/I should not see "([^"]*)"$/, function (content) {
    return this.browser.getHTML('body').
      should.not.include(content);
  });

  /**
   * Check for text matching a pattern on the page
   */
  this.Then(/I should see text matching "([^"]*)"$/, function (pattern) {
    return this.browser.getHTML('body').
      should.match(new RegExp(pattern.substring(1, pattern.length - 1)));
  });

  /**
   * Check for text matching a pattern NOT on the page
   */
  this.Then(/I should not see text matching "([^"]*)"$/, function (pattern) {
    return this.browser.getHTML('body').
      should.not.match(new RegExp(pattern.substring(1, pattern.length - 1)));
  });

  /**
   * Check if element can be found N times on the page
   */
  this.Then(/I should see (\d+) "([^"]*)" elements?$/, function (count, selector) {
    return this.browser.elements(selector).
      value.length.
      should.equal(parseInt(count, 10));
  });

  /**
   * Check for an element containing the specified text
   */
  this.Then(/I should see "([^"]*)" in the "([^"]*)" element$/, function (content, selector) {
    return this.browser.getHTML(selector).
      should.include(content);
  });

  /**
   * Check for an element not containing the specified text
   */
  this.Then(/I should not see "([^"]*)" in the "([^"]*)" element$/, function (content, selector) {
    return this.browser.getHTML(selector).
      should.not.include(content);
  });

  /**
   * Check if an element is visible
   */
  this.Then(/I should see an? "([^"]*)" element$/, () => elementState('isVisible', true));
  this.Then(/the "([^"]*)" element should be visible$/, () => elementState('isVisible', true));

  /**
   * Check if an element is NOT visible
   */
  this.Then(/I should not see an? "([^"]*)" element$/, () => elementState('isVisible', false));
  this.Then(/the "([^"]*)" element should not be visible$/, () => elementState('isVisible', false));

  /**
   * Check if an element exists
   */
  this.Then(/the "([^"]*)" element should exist$/, () => elementState('isExisting', true));

  /**
   * Check if an element does not exist
   */
  this.Then(/the "([^"]*)" element should not exist$/, () => elementState('isExisting', false));

  /**
   * Check if a field is disabled
   */
  this.Then(/the "([^"]*)" field should be enabled$/, () => elementState('isEnabled', true));

  /**
   * Check if a field is enabled
   */
  this.Then(/the "([^"]*)" field should be disabled$/, () => elementState('isEnabled', false));

  /**
   * Check if a checkbox is checked
   */
  this.Then(/the "([^"]*)" checkbox should be checked$/, () => elementState('isChecked', true));
  this.Then(/the checkbox "([^"]*)" (?:is|should be) checked$/, () => elementState('isChecked', true));

  /**
   * Check if a checkbox is NOT checked
   */
  this.Then(/the "([^"]*)" checkbox should not be checked$/, () => elementState('isChecked', false));
  this.Then(/the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/, () => elementState('isChecked', false));
  this.Then(/the checkbox "([^"]*)" is (?:unchecked|not checked)$/, () => elementState('isChecked', false));

  /**
   * Check for the page title
   */
  this.Then(/the page title should be "([^"]*)"$/, function (title) {
    return this.browser.getTitle().
      should.equal(title);
  });

  /**
   * Check if page title is NOT the specified one
   */
  this.Then(/the page title should not be "([^"]*)"$/, function (title) {
    return this.browser.getTitle().
      should.not.equal(title);
  });

  /**
   * Check if the page title matches pattern
   */
  this.Then(/the page title should match "([^"]*)"$/, function (pattern) {
    return this.browser.getTitle().
      should.match(new RegExp(pattern.substring(1, pattern.length - 1)));
  });

  /**
   * Check if the page title does NOT match pattern
   */
  this.Then(/the page title should not match "([^"]*)"$/, function (pattern) {
    return this.browser.getTitle().
      should.not.match(new RegExp(pattern.substring(1, pattern.length - 1)));
  });
};
