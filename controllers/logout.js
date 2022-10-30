const { log, logerror, loguear } = require("../lib/logger");

const destroySession = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).render("pages/logout.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
    // log.info(`${req.method} en ${req.originalUrl}`);
  } catch (error) {
    loguear(`Error destruyendo la sesión ${err}`, "error");
    loguear(`Error destruyendo la sesión ${err}`, "error", "devError");
    // log.error(`Error destruyendo la sesión ${err}`);
    // logerror.error(`Error destruyendo la sesión ${err}`);
    res.status(500).send("Err: ", err);
  }
};

module.exports = {
  destroySession,
};
