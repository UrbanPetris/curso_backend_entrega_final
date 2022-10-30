const { Mensaje } = require("../models/mensajes");
const { log, logerror } = require("../lib/logger");

const getHistoricalChat = async () => {
  try {
    return await Mensaje.find(
      {},
      { email: 1, message: 1, date: 1, _id: 0 }
    ).sort({
      date: 1,
    });
  } catch (err) {
    log.error(`Error obteniendo historial de Chat ${err}`);
    logerror.error(`Error obteniendo historial de Chat ${err}`);
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
    log.error(`Error agregando mensaje en historial de Chat ${err}`);
    logerror.error(`Error agregando mensaje en historial de Chat ${err}`);
  }
};

module.exports = {
  getHistoricalChat,
  updateChat,
};
