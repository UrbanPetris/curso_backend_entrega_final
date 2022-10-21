const { sendEmailWithOrder, emailMessage } = require("../lib/email");
const { sendMessage, wappMessage } = require("../lib/messagging");
const { Carrito } = require("../models/carrito");
const { Orden } = require("../models/ordenes");

const checkout = async (req, res) => {
  try {
    const carrito = await Carrito.findByIdAndUpdate(
      { _id: req.user._id },
      {
        modifiedOn: new Date(),
        productos: [],
      }
      //si quiero obtener el carrito nuevo actualizado (o sea, vacío de productos) tengo que poner {new: true}
    );

    if (!carrito) {
      res.status(404).json({ error: "Carrito no encontrado" });
    } else {
      try {
        const orden = await new Orden({
          email: req.user.email,
          productos: carrito.productos,
        }).save();

        if (!orden) {
          res
            .status(500)
            .json({ message: `Error generando la orden: ${err.message}` });
        } else {
          // await sendMessage(
          //   "Su pedido ha sido recibido y se encuentra en proceso",
          //   req.user.phonenumber,
          //   "sms"
          // );
          // await sendMessage(
          //   wappMessage(req.user, carrito.productos),
          //   adminPhoneNumber,
          //   "wapp"
          // );
          // await sendEmailWithOrder(
          //   `Nuevo pedido de ${req.user.firstname} - ${req.user.email}`,
          //   emailMessage(req.user, carrito.productos)
          // );
          res.redirect("/productos");
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  checkout,
};
