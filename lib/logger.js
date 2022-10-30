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

// if (process.env.NODE_ENV === "PROD") {
//   log = require("log4js").getLogger("prod");
// } else {
//   log = require("log4js").getLogger();
//   logwarn = require("log4js").getLogger("devWarn");
//   logerror = require("log4js").getLogger("devError");
// }

const loguear = (text, nivel, logger) => {
  if (process.env.NODE_ENV === "PROD" && nivel == "info") {
    return require("log4js").getLogger("prod").info(text);
  } else if (process.env.NODE_ENV === "PROD" && nivel == "warn") {
    return require("log4js").getLogger("prod").warn(text);
  } else if (process.env.NODE_ENV === "PROD" && nivel == "error") {
    return require("log4js").getLogger("prod").error(text);
  } else if (process.env.NODE_ENV === "DEV" && nivel == "info") {
    return require("log4js").getLogger().info(text);
  } else if (
    process.env.NODE_ENV === "DEV" &&
    nivel == "warn" &&
    logger == "devWarn"
  ) {
    return require("log4js").getLogger("devWarn").warn(text);
  } else if (process.env.NODE_ENV === "DEV" && nivel == "warn") {
    return require("log4js").getLogger().warn(text);
  } else if (
    process.env.NODE_ENV === "DEV" &&
    nivel == "error" &&
    logger == "devError"
  ) {
    return require("log4js").getLogger("devError").error(text);
  } else if (process.env.NODE_ENV === "DEV" && nivel == "error") {
    return require("log4js").getLogger().error(text);
  } else return false;
};

module.exports = {
  log,
  logwarn,
  logerror,
  loguear,
};
