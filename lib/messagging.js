const { messagging } = require("./config");
const { log, logerror } = require("../lib/logger");

const client = require("twilio")(messagging.accountSid, messagging.authToken);

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
        log.info(`Mensaje SMS creado y enviado con id ${message.sid}`);
      })
      .catch((err) => {
        log.error("Error: ", err);
        logerror.error("Error: ", err);
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
        log.info(`Mensaje de Whatsapp creado y enviado con id ${message.sid}`);
      })
      .catch((err) => {
        log.error("Error: ", err);
        logerror.error("Error: ", err);
      })
      .done();
  } else {
    log.error(`Opción no válida de sendMessage`);
    logerror.error(`Opción no válida de sendMessage`);
  }
};

module.exports = {
  wappMessage,
  sendMessage,
};
