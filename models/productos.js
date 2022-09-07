const mongoose = require("mongoose");
const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  photourl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  //agregar propiedades...
});

const Productos = new mongoose.model(productosCollection, productosSchema);

module.exports = {
  Productos,
};
