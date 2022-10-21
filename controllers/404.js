const { log, logwarn } = require("../lib/logger");

const get404 = (req, res) => {
  log.warn(`${req.method} en ${req.originalUrl}`);
  logwarn.warn(`${req.method} en ${req.originalUrl}`);
  res.status(404).send("Ruta no implementada");
};

module.exports = {
  get404,
};
