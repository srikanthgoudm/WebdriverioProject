const path = require('path');

module.exports = function () {
  /**
   * Wait N seconds
   *
   * @returns {Promise}
   *
   * Example:
   * I wait for 3 seconds
   */
  this.When(/I wait (\d+) seconds?$/, function (seconds) {
    return this.browser.pause(parseInt(seconds, 10) * 1000);
  });

  /**
   * Set the viewport to a desired size
   *
   * @returns {Promise}
   */
  this.Given(/the viewport is set to "(\d+x\d+)"$/, function (size) {
    const parsed = size.split('x');

    return this.browser.setViewportSize({
      width: parseInt(parsed[0], 10),
      height: parseInt(parsed[1], 10),
    }, true);
  });

  /**
   * Take a screenshot
   *
   * @returns {Promise}
   *
   * Example:
   * I take a screenshot
   */
  this.Then(/I take a screenshot/, function () {
    return this.browser.saveScreenshot(path.resolve(__dirname, `../../../screenshots/${Date.now()}.png`));
  });
};
