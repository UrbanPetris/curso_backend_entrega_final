const { log, logerror } = require("../lib/logger");

const getSignUpPage = (req, res) => {
  try {
    res.render("pages/indexSignup.ejs");
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error obteniendo página de registro ${err}`);
    logerror.error(`Error obteniendo página de registro ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const makeSignUp = (req, res) => {
  res.redirect("/");
};

module.exports = {
  getSignUpPage,
  makeSignUp,
};
