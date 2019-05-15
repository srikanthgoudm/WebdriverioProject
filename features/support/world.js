const merge = require('lodash.merge');

const { config } = require('../../wdio.conf');
const { argv } = require('../../cli');

/**
 * Specify the top level context.
 *
 * @constructor
 */
function World() {
  // Browser is defined by webdriverio.
  this.browser = global.browser;

  // Store configuration.
  this.config = merge({}, config, argv);
}

module.exports = function () {
  this.World = World;
};
