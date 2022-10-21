const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ordenesCollection = "ordenes";

const ordenesSchema = new mongoose.Schema({
  _id: { type: Number },
  estado: { type: String, default: "generada", required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  productos: { type: Array, required: true },
});

ordenesSchema.plugin(AutoIncrement, { id: "seq_ordenes", inc_field: "_id" });
//Id se llena con una secuencia del plugin AutoIncrement. No está bien calcular dinámicamente la cantidad de documentos en la colección para aplicar +1
//porque el id no debería depender de la persistencia de la colección

const Orden = new mongoose.model(ordenesCollection, ordenesSchema);

module.exports = {
  Orden,
};
