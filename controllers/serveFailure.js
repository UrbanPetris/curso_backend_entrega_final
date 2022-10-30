const { log, logerror, loguear } = require("../lib/logger");

const serveFailureLogin = (req, res) => {
  try {
    res.render("pages/failureLogin");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
    // log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    loguear(`Error obteniendo página fallo de autenticación ${err}`, "error");
    loguear(
      `Error obteniendo página fallo de autenticación ${err}`,
      "error",
      "devError"
    );
    // log.error(`Error obteniendo página fallo de autenticación ${err}`);
    // logerror.error(`Error obteniendo página fallo de autenticación${err}`);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  serveFailureLogin,
};
