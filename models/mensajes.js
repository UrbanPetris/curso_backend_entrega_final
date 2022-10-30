const mongoose = require("mongoose");
const mensajesCollection = "mensajes";

const mensajesSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const Mensaje = new mongoose.model(mensajesCollection, mensajesSchema);

module.exports = {
  Mensaje,
};
