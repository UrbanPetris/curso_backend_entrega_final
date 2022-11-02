const { loguear } = require("../lib/logger");

const getHome = (req, res) => {
  try {
    res.status(200).render("pages/index.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo página de inicio ${err}`, "error");
    loguear(`Error obteniendo página de inicio ${err}`, "error", "devError");
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHome,
};
