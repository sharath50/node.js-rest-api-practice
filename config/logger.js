/**
 * installing dependancies
 */
const { createLogger, transports, format } = (winston = require("winston"));
const winstonMongo = require("winston-mongodb");
const path = require("path");

// logging the error messages
ErrorLogger = createLogger({
  transports: [
    new transports.File({
      level: "error",
      filename: path.join(__dirname, "../logs/error.log"),
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.MongoDB({
      level: "error",
      db: process.env.LOG_DB_HOST,
      options: { useUnifiedTopology: true },
      collection: "errorLogs",
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

InfoLogger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: path.join(__dirname, "../logs/info.log"),
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.MongoDB({
      level: "info",
      db: process.env.LOG_DB_HOST,
      options: { useUnifiedTopology: true },
      collection: "infoLogs",
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

WarningLogger = createLogger({
  transports: [
    new transports.File({
      level: "warn",
      filename: path.join(__dirname, "../logs/warning.log"),
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.MongoDB({
      level: "warn",
      db: process.env.LOG_DB_HOST,
      options: { useUnifiedTopology: true },
      collection: "warningLogs",
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

// this will add another type of transport to the logger instance if the app is production
// then the logs also comes to console
if (process.env.NODE_ENV !== "production") {
  WarningLogger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

module.exports = { ErrorLogger, InfoLogger, WarningLogger };
