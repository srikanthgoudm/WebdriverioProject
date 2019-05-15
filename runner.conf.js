const path = require('path');

module.exports = {
  serverCommands: [
    // Example MYB server commands
    {
      cwd: path.resolve(path.join(__dirname, '../app')),
      command: 'npm',
      args: ['start'],
    },
    // Example BPA server commands
    // {
    //   cwd: path.resolve(path.join(__dirname, '../bpa/api')),
    //   command: 'node',
    //   args: ['stubs.js'],
    // },
    // {
    //   cwd: path.resolve(path.join(__dirname, '../bpa/api')),
    //   command: 'node',
    //   args: ['index.js'],
    // },
    // {
    //   cwd: path.resolve(path.join(__dirname, '../bpa/app')),
    //   command: 'node',
    //   args: ['server/index.js'],
    // }
  ]
};
