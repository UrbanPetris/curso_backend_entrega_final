const { log, logerror } = require("../lib/logger");

const destroySession = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).render("pages/logout.ejs");
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (error) {
    log.error(`Error destruyendo la sesión ${err}`);
    logerror.error(`Error destruyendo la sesión ${err}`);
    res.status(500).send("Err: ", err);
  }
};

module.exports = {
  destroySession,
};
