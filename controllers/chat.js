const { loguear } = require("../lib/logger");

const getChat = (req, res) => {
  try {
    res.status(200).render("pages/chat.ejs", {
      data: {
        id: req.user._id,
        firstname: req.user.firstname,
        email: req.user.email,
        avatar: req.user.avatar,
      },
    });
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo página de chat ${err}`, "error");
    loguear(`Error obteniendo página de chat ${err}`, "error", "devError");
    res.status(500).json({ message: err.message });
  }
};

const getChatByEmail = (req, res) => {
  try {
    if (req.user.email === req.params.email) {
      res.status(200).render("pages/chatPrivado.ejs", {
        data: {
          id: req.user._id,
          firstname: req.user.firstname,
          email: req.user.email,
          avatar: req.user.avatar,
        },
      });
      loguear(`${req.method} en ${req.originalUrl}`, "info");
    } else {
      res
        .status(402)
        .json({ message: "La dirección no coincide con el email de usuario" });
      loguear(
        `Usuario ${req.user.email} intentó entrar a un chat ajeno`,
        "error"
      );
      loguear(
        `Usuario ${req.user.email} intentó entrar a un chat ajeno`,
        "error",
        "devError"
      );
    }
  } catch (err) {
    loguear(`Error obteniendo página de chat privado ${err}`, "error");
    loguear(
      `Error obteniendo página de chat privado ${err}`,
      "error",
      "devError"
    );
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getChat,
  getChatByEmail,
};
