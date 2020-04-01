// *** winston
// to implement the logging
// npm i winston

// tranports
/**
 * console
 * file
 * http -- calling end point for logs
 * mongoDB
 * couchDB
 * Redis --
 * Loggly -- popular logging and monitoring enterprice application
 */

// Logging level
/**
 * error
 * warn
 * info
 * verbose
 * debug
 * silly
 */

const { createLogger, transports, format } = (winston = require("winston"));
const winstonMongo = require("winston-mongodb");

// we can simply do like this
// this will log all type of errors in the file
winston.add(
  new transports.File({
    level: "info",
    filename: "logfile.log"
  })
);

// if we put level as 'info' then the error, warn, info logs
// will go inside file nothing else
// if i put error - only error
// if i put warn - error, warn
// if i put info - error, warn, info

// this is how log the log message
winston.log("error", "error message here");
winston.log("warn", "error message here");
winston.log("info", "error message here");
