const mongoose = require("mongoose");
const carritoCollection = "carrito";

const carritoSchema = new mongoose.Schema({
  modifiedOn: { type: Date },
  productos: [{}],
});

const Carrito = new mongoose.model(carritoCollection, carritoSchema);

module.exports = {
  Carrito,
};
