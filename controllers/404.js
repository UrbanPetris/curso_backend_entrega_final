const { log, logwarn, loguear } = require("../lib/logger");

const get404 = (req, res) => {
  loguear(`${req.method} en ${req.originalUrl}`, "warn", "devWarn");
  loguear(`${req.method} en ${req.originalUrl}`, "warn");
  // log.warn(`${req.method} en ${req.originalUrl}`);
  // logwarn.warn(`${req.method} en ${req.originalUrl}`);
  res.status(404).send("Ruta no implementada");
};

module.exports = {
  get404,
};
