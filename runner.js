const { execFile, execFileSync } = require('child_process');
const winston = require('winston');
const WebDriverIoLauncher = require('webdriverio/build/lib/launcher');

const wdioConfigFile = require.resolve('./wdio.conf.js');
const processErrorHandler = require('./process-error-handler');
const runnerConfig = require('./runner.conf');

const { parser, argv } = require('./cli');

/**
 * Stop child processes.
 *
 * @param {ChildProcess[]} processes
 * @param {String} signal
 */
function stopServers(processes = [], signal = 'SIGTERM') {
  if (!parser.l) {
    return;
  }
  processes.forEach((p) => {
    if (p && typeof p.kill === 'function') {
      p.kill(signal);
    }
  });
}

/**
 * Launch the server and then the test runner (wdio).
 */
function run() {
  // Instantiate wdio launcher.
  const launcher = new WebDriverIoLauncher(wdioConfigFile, argv);
  const stderrCallback = (data) => winston.error(data.toString().replace(/\n$/, ''));
  const processes = [];
  const servers = [];

  if (parser.l) {
    winston.info(`Starting ${runnerConfig.serverCommands.length} servers`);

    runnerConfig.serverCommands.forEach(serverCommand => {
      const server = execFile(
        serverCommand.command,
        serverCommand.args,
        {
          env: process.env,
          cwd: serverCommand.cwd
        }
      );
      server.stderr.on('data', stderrCallback);
      server.on('uncaughtException', processErrorHandler);
      servers.push(server);
    });
  }

  // Start the wdio runner.
  launcher.run().then(
    (code) => {
      winston.info('Tests finished, exiting');
      winston.info(`Stopping ${servers.length} servers`);
      stopServers(processes);
      process.exit(code);
    },
    (err) => process.nextTick(() => {
      winston.error("Tests finished, something went wrong!")
      winston.info(`Stopping ${servers.length} servers`);
      stopServers(processes);
      throw err;
    })
  );
}

run();
