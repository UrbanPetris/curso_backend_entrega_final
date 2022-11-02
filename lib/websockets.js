const { Mensaje } = require("../models/mensajes");
const { loguear } = require("../lib/logger");

const getHistoricalChat = async () => {
  try {
    return await Mensaje.find(
      {},
      { email: 1, message: 1, date: 1, _id: 0 }
    ).sort({
      date: 1,
    });
  } catch (err) {
    loguear(`Error obteniendo historial de Chat ${err}`, "error");
    loguear(`Error obteniendo historial de Chat ${err}`, "error", "devError");
  }
};

const updateChat = async (message) => {
  const mensaje = new Mensaje({
    ...message,
  });
  try {
    await mensaje.save();
    return await Mensaje.find(
      {},
      { email: 1, message: 1, date: 1, _id: 0 }
    ).sort({
      date: 1,
    });
  } catch (err) {
    loguear(`Error agregando mensaje en historial de Chat ${err}`, "error");
    loguear(
      `Error agregando mensaje en historial de Chat ${err}`,
      "error",
      "devError"
    );
  }
};

module.exports = {
  getHistoricalChat,
  updateChat,
};
