const { messaging } = require("./config");
const { loguear } = require("./logger");

const client = require("twilio")(messaging.accountSid, messaging.authToken);

const wappMessage = (usuario, productos) => {
  let message = `Nuevo pedido de ${usuario.firstname} - ${usuario.email}
          `;

  let total = 0;
  productos.forEach((prod) => {
    message += `
            Producto: ${prod.name}
            Precio: $${prod.price}
            Cantidad: ${prod.quantity}
            Subtotal: $${prod.quantity * prod.price}
            `;
    total += prod.quantity * prod.price;
  });
  message += `
          Total: $${total}`;

  return message;
};

const sendMessage = (text, numero, option) => {
  if (option === "sms") {
    client.messages
      .create({
        body: text,
        messagingServiceSid: messaging.messagingServiceSid,
        to: `${numero}`,
      })
      .then((message) => {
        loguear(`Mensaje SMS creado y enviado con id ${message.sid}`);
      })
      .catch((err) => {
        loguear(`Error: ${err}`, "error");
        loguear(`Error: ${err}`, "error", "devError");
      })
      .done();
  } else if (option === "wapp") {
    client.messages
      .create({
        body: text,
        from: `whatsapp:${messaging.sandboxNumber}`,
        to: `whatsapp:${adminPhoneNumber}`,
      })
      .then((message) => {
        loguear(`Mensaje de Whatsapp creado y enviado con id ${message.sid}`);
      })
      .catch((err) => {
        loguear(`Error: ${err}`, "error");
        loguear(`Error: ${err}`, "error", "devError");
      })
      .done();
  } else {
    loguear(`Opción no válida de sendMessage`);
    loguear(`Opción no válida de sendMessage`);
  }
};

module.exports = {
  wappMessage,
  sendMessage,
};
