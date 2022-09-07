const log4js = require("log4js");

log4js.configure({
  appenders: {
    loggerDev: { type: "console" },
    loggerDevWarn: { type: "file", filename: "./logs/warn.log" },
    loggerDevError: { type: "file", filename: "./logs/error.log" },
    loggerProd: { type: "file", filename: "./logs/errors.log" },
  },
  categories: {
    default: { appenders: ["loggerDev"], level: "all" },
    devWarn: { appenders: ["loggerDevWarn"], level: "warn" },
    devError: { appenders: ["loggerDevError"], level: "error" },
    prod: { appenders: ["loggerProd"], level: "error" },
    qa: { appenders: ["loggerDev"], level: "trace" },
  },
});

let log;
let logwarn;
let logerror;

if (process.env.NODE_ENV === "PROD") {
  log = require("log4js").getLogger("prod");
} else {
  log = require("log4js").getLogger();
  logwarn = require("log4js").getLogger("devWarn");
  logerror = require("log4js").getLogger("devError");
}

module.exports = {
  log,
  logwarn,
  logerror,
};
