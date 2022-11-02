const { messaging, mailing } = require("../lib/config");
const { sendEmail, emailMessageOrder } = require("../lib/email");
const { sendMessage, wappMessage } = require("../lib/messaging");
const { loguear } = require("../lib/logger");
const { Carrito } = require("../models/carrito");
const { Orden } = require("../models/ordenes");

var enableMessaging = messaging.enable;
var enableMailing = mailing.enable;

const checkout = async (req, res) => {
  try {
    loguear(`${req.method} en ${req.originalUrl}`, "info");
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
          if (enableMessaging === "true") {
            await sendMessage(
              "Su pedido ha sido recibido y se encuentra en proceso",
              req.user.phonenumber,
              "sms"
            );
            await sendMessage(
              wappMessage(req.user, carrito.productos),
              adminPhoneNumber,
              "wapp"
            );
          }
          if (enableMailing === "true") {
            await sendEmail(
              `Nuevo pedido de ${req.user.firstname} - ${req.user.email}`,
              emailMessageOrder(req.user, carrito.productos)
            );
          }

          res.redirect("/productos");
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
        loguear(`Error buscando carrito ${err}`, "error");
        loguear(`Error buscando carrito ${err}`, "error", "devError");
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  checkout,
};
