const { log, logerror } = require("../lib/logger");

const serveFailureLogin = (req, res) => {
  try {
    res.render("pages/failureLogin");
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error obteniendo página fallo de autenticación ${err}`);
    logerror.error(`Error obteniendo página fallo de autenticación${err}`);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  serveFailureLogin,
};
