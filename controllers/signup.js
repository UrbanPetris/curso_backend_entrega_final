const { loguear } = require("../lib/logger");

const getSignUpPage = (req, res) => {
  try {
    res.render("pages/indexSignup.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo página de registro ${err}`, "error");
    loguear(`Error obteniendo página de registro ${err}`, "error", "devError");
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
