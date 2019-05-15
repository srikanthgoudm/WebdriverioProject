const yargs = require('yargs');

// Command line options.
const parser = yargs.usage('Usage: $0 [options]')
  .option('t', {
    alias: 'tags',
    type: 'string',
    description: 'Comma separated list of Cucumber tags to run',
    defaultDescription: 'Run all tags',
    default: '',
  })
  .option('v', {
    alias: 'verbose',
    count: true,
    default: -1,
    defaultDescription: 'Show errors only',
    description: 'Verbosity level; example: -vv; up to -vvvvv',
  })
  .option('s', {
    alias: 'silent',
    type: 'boolean',
    default: false,
    description: 'Suppress webdriverio output',
  })
  .option('u', {
    alias: 'url',
    type: 'string',
    default: 'http://automationpractice.com/index.php',
    defaultDescription: 'Based on configuration found in config.js',
    description: 'Base url of the application',
  })
  .example('$0 -t @a,@b', 'Run tests tagged with "@a" or "@b"')
  .help('h')
  .alias('h', 'help')
  .argv;

/**
 * Get verbosity level in wdio
 *
 * @param {number} v
 * @param {boolean} s
 * @returns {string}
 */
function getVerbosity(v, s) {
  if (s) {
    return 'silent';
  }
  switch (v) {
    case 5:
      return 'verbose';
    case 4:
      return 'command';
    case 3:
      return 'data';
    case 2:
      return 'result';
    case 1:
    default:
      return 'error';
  }
}

const argv = {
  logLevel: getVerbosity(parser.v, parser.s),
  baseUrl: parser.u,
  cucumberOpts: {
    tags: (parser.t.length) ? [parser.t] : [],
  },
};

module.exports = {
  argv,
  parser,
  getVerbosity,
};
