const { log, logerror } = require("../lib/logger");

const getLoginPage = (req, res) => {
  try {
    log.info(`${req.method} en ${req.originalUrl}`);
    res.status(200).render("pages/login.ejs", { puerto: process.argv[2] });
  } catch (err) {
    log.error(`Error obteniendo página de logueo ${err}`);
    logerror.error(`Error obteniendo página de logueo ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const makeLogin = (req, res) => {
  try {
    res.redirect("/");
  } catch (err) {
    log.error(`Error redirigiendo: ${err}`);
    logerror.error(`Error redirigiendo: ${err}`);
  }
};

module.exports = { getLoginPage, makeLogin };
