const mongoose = require("mongoose");
const carritoCollection = "carrito";

const carritoSchema = new mongoose.Schema({
  modifiedOn: { type: Date },
  productos: [
    {
      // id: { type: mongoose.Schema.Types.ObjectId, ref: "productos" },
      //estudiar si se puede sólo typar el id y después hacer unpack de lo que sea que venga de schema productos
      //el ref sirve para usar el método populate() de mongoose como reemplazo del nativo $lookup, pero en clase hablamos de llenar el carrito con los datos del producto en el momento
    },
  ],
});

const Carrito = new mongoose.model(carritoCollection, carritoSchema);

module.exports = {
  Carrito,
};
