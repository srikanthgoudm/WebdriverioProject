const url = require('url');

require('chai').should();

/**
 * Helper function to get parsed URL from the client.
 *
 * @returns {Url}
 * @see https://nodejs.org/api/url.html
 */
function getUrl() {
  return url.parse(this.browser.getUrl());
}

module.exports = function () {
  /**
   * Check for URL
   *
   * Example:
   * I should be on "/uk-en/train-search/standard/7015400/8727100"
   */
  this.Then(/I should be on "([^"]*)"$/, (pathname) => getUrl().pathname.
    should.equal(pathname));

  /**
   * Check for home page
   */
  this.Then(/I should be on (?:|the )home\s?page$/, () => getUrl().pathname.
    should.equal('/'));

  /**
   * Check if URL matches specified pattern
   */
  this.Then(/the url should match "(.+)"$/, (pattern) => getUrl().path.
    should.match(new RegExp(pattern.substring(1, pattern.length - 1))));

  /**
   * Check if URL matches specified pattern
   */
  this.Then(/the url parameter should match "(.+)"$/, (pattern) => getUrl().query.
    should.match(new RegExp(pattern.substring(1, pattern.length - 1))));
};
