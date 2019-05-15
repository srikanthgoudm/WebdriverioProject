const path = require('path');
const merge = require('lodash.merge');

const junitReporterOptions = {
  outputDir: path.resolve(__dirname, './reports/'),
  outputFileFormat: (opts) => `bdd-${opts.cid}.${opts.capabilities}.xml`,
};

const profiles = {
  // Profile is meant for local development test runs.
  default: {
    services: ['selenium-standalone'],
    seleniumLogs: 'logs',
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'firefox',
        
      },
    ],
  },
};

// Global configuration for wdio
const skeleton = {
  specs: [path.resolve(__dirname, 'features/**/*.feature')],
  exclude: [],
  maxInstances: 1,
  capabilities: [],
  sync: true,
  logLevel: 'verbose', // Default value is set in cli.js
  coloredLogs: true,
  screenshotPath: path.resolve(__dirname, './screenshots/'),
  baseUrl: 'http://automationpractice.com/index.php', // Default value is set in cli.js
  waitforTimeout: 120000,

  framework: 'cucumber',
  // @see http://webdriver.io/guide/reporters/dot.html
  reporters: ['spec', 'dot'],
  // @see https://github.com/webdriverio/wdio-cucumber-framework#configuration
  cucumberOpts: {
    tags: [], // Default value is set in cli.js
    ignoreUndefinedDefinitions: false,
    timeout: 120000,
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  // Gets executed once before all workers get launched.
  // onPrepare: (config, capabilities) => {
  // },
  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  // before: (capabilities, specs) => {
  // },
  //
  // Hook that gets executed before the suite starts
  // beforeSuite: (suite) => {
  // },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  // beforeHook: function () {
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function () {
  // },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // beforeTest: function (test) {
  // },
  //
  // Runs before a WebdriverIO command gets executed.
  // beforeCommand: function (commandName, args) {
  // },
  //
  // Runs after a WebdriverIO command gets executed
  // afterCommand: function (commandName, args, result, error) {
  // },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // afterTest: function (test) {
  // },
  //
  // Hook that gets executed after the suite has ended
  // afterSuite: function (suite) {
  // },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  // after: function (capabilities, specs) {
  // },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  // onComplete: function(exitCode) {
  // },
};

/**
 * Determine which profile to use
 *
 * This checks if the value of the WDIO_PROFILE environment variable resolves to
 * an existing profile, falls back to 'default' otherwise.
 *
 * @returns {String}
 */
function getProfile() {
  const DEFAULT_PROFILE = 'default';
  const profile = process.env.WDIO_PROFILE || DEFAULT_PROFILE;
  return Object.keys(profiles).includes(profile) ? profile : DEFAULT_PROFILE;
}

module.exports = {
  config: merge({}, skeleton, profiles[getProfile()]),
};
