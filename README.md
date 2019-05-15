# Functional test suite for AutomationPractice application

Table of Contents
-----------------
1. [Structure](#structure)
1. [Packages](#packages)
1. [Local testing](#local-testing)
 - [Requirements](#requirements)
 - [Application startup](#application-startup)
1. [Usage](#usage)
 - [Options](#options)
 - [Profiles](#profiles)
  - [Default profile](#default-profile)
  - [Profile for CI runs with pull requests](#profile-for-ci-runs-with-pull-requests)
  - [Profile for testing via Sauce labs](#profile-for-testing-via-sauce-labs)
1. [Configuration](#configuration)
 - [Tagging scenarios in feature files](#tagging-scenarios-in-feature-files)


Current functional tests are carried out using [Cucumber.js][cucumber-js] via [Webdriver.io][webdriverio] controlling a [Selenium server][selenium-standalone-server] or via [Sauce Labs][saucelabs].

Webdriver.io is the test runner and it utilises Cucumber.js as the test framework. The test runner is capable of controlling a standalone Selenium server and therefore all Selenium-supported browsers or a testing service such as [Sauce Labs][saucelabs] or Browserstack.


## Project Structure

```
bdd
├── features/                # Application features
│   ├── step_definitions/    # Cucumber.js step definitions
|   |   ├── core/            # Core webdriverio step definitions
                             # High-level step definitions for:
|   |   └── homepage.js      #   homepage
|   |   └── loginpage.js     #   loginpage
|   |   └── registration.js  #   registration page
│   ├── support              # Cucumber.js support files
|   |   ├── context/         # Extra Cucumber.js context classes
|   |   └── world.js         # Global context constructor for steps
                             # Scenarios for:
│   └── homepage.feature     #   homepage
│   └── loginpage.feature    #   loginpage
│   └── registration.feature #   registration page
├── reports/                 # Folder for generated reports (Git ignored)
├── screenshots/             # Folder for screenshots (Git ignored)
├── cli.js                   # CLI options parser
├── runner.js                # Test runner script
└── wdio.conf.js             # Webdriverio configuration file
```

## Packages

Package                           | Description
----------------------------------|--------------------------------------------------------
chai                              | Assertion library
cucumber                          | Tool for running tests written in Gherkin
lodash.merge                      | Utility to "deep merge" objects
phantomjs-prebuilt                | Npm wrapper around the headless browser
webdriverio                       | A nodejs bindings implementation for selenium 2.0
wdio-cucumber-framework           | WebdriverIO adapter for the Cucumber testing framework
wdio-selenium-standalone-service  | WebdriverIO service to start/stop Selenium standalone
wdio-sauce-service                | WebdriverIO service for better Sauce Labs integration
wdio-dot-reporter                 | WebdriverIO plugin to report results
wdio-junit-reporter               | WebdriverIO plugin to report results in junit xml format
yargs                             | Command line option parser


## Local testing

### Requirements

Using the default profile a standalone selenium server is launched automatically on the local host and runs testing on PhantomJS. No installation is necessary.

Selenium server requires a Java runtime environment.

* Browsers to target, one or more of:
  * Chrome (with chromedriver)

Selenium standalone is installed with the default options so for local testing with real browsers any selenium driver that may be required needs to be installed separately. For more details on how to install required dependencies, please refer to the [webdriver.io install page][wdio-install].


### Application startup

The application being tested can be manually started or passing an `-l` flag will attempt to start and stop whatever processes are defined in `runner.js`.

To use the `-l` flag `runner.js` must be updated with start commands specific to the project.



## Usage

To run the BDD tests:

```bash
npm start
```


### Options

The following command line options are available to the runner, i.e the following is the output of `npm start -- -h`

```
  -t, --tags     Comma separated list of Cucumber tags to run
                                                [string] [default: Run all tags]
  -l, --launch   Try to launch the servers (api, app, stubs) locally
                                                      [boolean] [default: false]
  -v, --verbose  Verbosity level; example: -vv; up to -vvvvv
                                             [count] [default: Show errors only]
  -s, --silent   Suppress webdriverio output          [boolean] [default: false]
  -u, --url      Base url of the application
                   [string] [default: Based on configuration found in config.js]
  -h, --help     Show help                                             [boolean]

Examples:
  runner -t @a,@b  Run tests tagged with "@a" or "@b"
```

Example usage with option and via the npm script:

```bash
npm start -- -t @some_tag,@another_tag
```


### Profiles

Configuration profiles are set in `wdio.conf.js`.


#### Default profile

The default profile runs on a locally launched standalone selenium server and phantomjs.


#### Profile for CI runs with pull requests

```bash
WDIO_PROFILE=pr npm start
```


As describe above, `-u` defines the base URL of the tested application. The test runner configures a secure tunnel via Sauce Connect so it is possible to test non-public facing instances. See "Sauce Labs integration" below.

A note on Gherkin tags: even though profile information can specify tags to run, command line arguments only add to the list of _sets of tags_ and do not replace them. Therefore when a profile has `cucumberOpts.tags` defined, anything other than `[]`, any extra sets of tags defined as command line argument in `-t` will be _added_ to the list of tags instead of replacing the ones in profiles.


## Configuration

The file `wdio.conf.js` defines all configurable aspects of the test run. The most important configuration options are:

Key           | Value
--------------|--------------------
specs         | Array of glob patterns defining location of test spec files
maxInstances  | Maximum number of instances to launch
capabilities  | Array of objects defining desired selenium capabilities
baseUrl       | Base URL of the app being tested

For full details please refer to the [configuration reference][wdio.conf.js].


### Tagging scenarios in feature files

Scenarios should ideally be tagged with the following:

 * Ticket/feature branch name, e.g `@AP-34`
 * Name of the feature/section of the site, e.g `@routes`, `@train-search` (optional)
 * A `@smoke` tag to indicate that these scenarios belongs to the smoke pack (optional)




### High level step definitions

High level step definitions have initialised instances of support code classes. Code for these can be found in `features/support/context`. This codebase should be extended as more step definitions and steps need to go in.


### Low level step definitions for Webdriver API

The most important low level step definitions are implemented for webdriverio and can be found in `features/step_definitions/core`. Please note that due to a limitation in cucumber.js steps cannot be called from within other steps so this should serve as a reference implementation.






 [cucumber-js]: https://github.com/cucumber/cucumber-js
 [webdriverio]: http://webdriver.io
 [saucelabs]: https://saucelabs.com
 [selenium-standalone-server]: http://docs.seleniumhq.org/download/
 [selenium-standalone]: https://github.com/vvo/selenium-standalone
 [homebrew]: https://brew.sh
 [wdio-install]: http://webdriver.io/guide/getstarted/install.html
 [wdio.conf.js]: http://webdriver.io/guide/getstarted/configuration.html
 [allure]: https://github.com/allure-framework/allure-core
 [cukedoctor]: https://github.com/rmpestano/cukedoctor

