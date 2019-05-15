/**
 * Class representing a page
 */
class Page {
  /**
   * Create a page
   *
   * @param {object} world
   * @property {object} browser  Reference to the webdriverio driver
   * @property {object} config   Complete webdriverio configuration object
   * @property {string} url      Page url, defaults to an empty string
   */
  constructor(world) {
    this.config = world.config;
    this.browser = world.browser;
    this.url = '';
  }

  /**
   * Open the page in the browser
   *
   * Note that when the url property is not set the base url will be opened.
   *
   * @returns {Promise}
   */
  open() {
    return this.browser.url(`${this.config.baseUrl}${this.url || ''}`);
  }

  /**
   * Reload the page in the browser
   *
   * @returns {Promise}
   */
  refresh() {
    return this.browser.refresh();
  }
}

module.exports = { Page };
