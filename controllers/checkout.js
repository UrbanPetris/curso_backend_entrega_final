const { findCarritoByid, emptyCarritoByid } = require("./carrito");
const { sendEmailWithOrder } = require("../lib/email");
const { sendMessage } = require("../lib/messagging");
const { Users } = require("../models/usuarios");

const checkout = async (req, res) => {
  const usuario = await Users.findById(req.body.id);

  if (usuario) {
    const asunto = `Nuevo pedido de ${usuario.firstname} - ${usuario.email}`;
    try {
      const carrito = await findCarritoByid(req.body.id);
      if (carrito) {
        const destinatario = `${usuario.firstname} - ${usuario.email}`;

        let htmlMessage = `
        <h1>Nuevo pedido de ${destinatario}</h1>
        <table>
        <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Imagen</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
        </tr>`;

        let wappMessage = `Nuevo pedido de ${destinatario}
        `;

        let total = 0;
        carrito.productos.forEach((prod) => {
          htmlMessage += `<tr>
          <td>${prod.name}</td>
          <td>$${prod.price}</td>
          <td><img style="max-width: 48px" src=${prod.photourl} alt=${
            prod.name
          }></td>
          <td>${prod.quantity}</td>
          <td>$${prod.quantity * prod.price}</td>
          </tr>`;
          wappMessage += `
          Producto: ${prod.name}
          Precio: $${prod.price}
          Cantidad: ${prod.quantity}
          Subtotal: $${prod.quantity * prod.price}
          `;
          total += prod.quantity * prod.price;
        });
        htmlMessage += `</table>
        Total: $${total}
        `;
        wappMessage += `
        Total: $${total}`;

        try {
          await sendMessage(
            "Su pedido ha sido recibido y se encuentra en proceso",
            usuario.phonenumber,
            "sms"
          );
          await sendMessage(wappMessage, adminPhoneNumber, "wapp");
          await sendEmailWithOrder(asunto, htmlMessage);
          emptyCarritoByid(req.body.id);
          res.redirect("/productos");
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      } else {
        res.status(404).json({ error: "Carrito no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
};

module.exports = {
  checkout,
};
