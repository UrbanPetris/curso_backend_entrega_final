const { loguear } = require("../lib/logger");

const get404 = (req, res) => {
  loguear(`${req.method} en ${req.originalUrl}`, "warn", "devWarn");
  loguear(`${req.method} en ${req.originalUrl}`, "warn");
  res.status(404).send("Ruta no implementada");
};

module.exports = {
  get404,
};
