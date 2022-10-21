const { log, logerror } = require("../lib/logger");

const getHome = (req, res) => {
  try {
    res.status(200).render("pages/index.ejs");
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error obteniendo página de inicio ${err}`);
    logerror.error(`Error obteniendo página de inicio ${err}`);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHome,
};
