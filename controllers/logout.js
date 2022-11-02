const { loguear } = require("../lib/logger");

const destroySession = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).render("pages/logout.ejs");
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (error) {
    loguear(`Error destruyendo la sesión ${err}`, "error");
    loguear(`Error destruyendo la sesión ${err}`, "error", "devError");
    res.status(500).send("Err: ", err);
  }
};

module.exports = {
  destroySession,
};
