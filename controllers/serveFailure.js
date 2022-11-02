const { loguear } = require("../lib/logger");

const serveFailureLogin = (req, res) => {
  try {
    res.render("pages/failureLogin");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo página fallo de autenticación ${err}`, "error");
    loguear(
      `Error obteniendo página fallo de autenticación ${err}`,
      "error",
      "devError"
    );
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  serveFailureLogin,
};
