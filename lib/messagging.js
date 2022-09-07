const { messagging } = require("./config");
const { log, logerror } = require("../lib/logger");

const client = require("twilio")(messagging.accountSid, messagging.authToken);

const sendMessage = (text, numero, option) => {
  if (option === "sms") {
    client.messages
      .create({
        body: text,
        messagingServiceSid: "MG52472418b63799f5b5cfb178176d4392",
        // from: "+14155238886",
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
        from: "whatsapp:+14155238886",
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
  sendMessage,
};
