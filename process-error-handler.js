const winston = require('winston');

/**
 * Error handler callback for processes.
 * @param err
 */
module.exports = (err) => {
  switch (err.errno) {
    case 'EADDRINUSE':
      winston.warn(`Cannot bind to port ${err.port}`);
      break;
    default:
      winston.error(err);
      process.exit(1);
      break;
  }
};
