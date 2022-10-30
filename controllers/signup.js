const { log, logerror, loguear } = require("../lib/logger");

const getSignUpPage = (req, res) => {
  try {
    res.render("pages/indexSignup.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
    // log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    loguear(`Error obteniendo página de registro ${err}`, "error");
    loguear(`Error obteniendo página de registro ${err}`, "error", "devError");
    // log.error(`Error obteniendo página de registro ${err}`);
    // logerror.error(`Error obteniendo página de registro ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const makeSignUp = (req, res) => {
  res.redirect("/productos");
};

module.exports = {
  getSignUpPage,
  makeSignUp,
};
