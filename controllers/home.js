const { log, logerror, loguear } = require("../lib/logger");

const getHome = (req, res) => {
  try {
    res.status(200).render("pages/index.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
    // log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    loguear(`Error obteniendo página de inicio ${err}`, "error");
    loguear(`Error obteniendo página de inicio ${err}`, "error", "devError");
    // log.error(`Error obteniendo página de inicio ${err}`);
    // logerror.error(`Error obteniendo página de inicio ${err}`);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHome,
};
