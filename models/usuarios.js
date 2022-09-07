const mongoose = require("mongoose");
const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  avatar: {
    data: Buffer,
    contentType: String,
  },
});

const Users = new mongoose.model(usuariosCollection, usuariosSchema);

module.exports = {
  Users,
};
