const { loguear } = require("../lib/logger");

const getLoginPage = (req, res) => {
  try {
    res.status(200).render("pages/login.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo página de logueo ${err}`, "error");
    loguear(`Error obteniendo página de logueo ${err}`, "error", "devError");
    res.status(500).json({ message: err.message });
  }
};

const makeLogin = (req, res) => {
  try {
    res.redirect("/productos");
  } catch (err) {
    loguear(`Error redirigiendo ${err}`, "error");
    loguear(`Error redirigiendo ${err}`, "error", "devError");
  }
};

module.exports = { getLoginPage, makeLogin };
