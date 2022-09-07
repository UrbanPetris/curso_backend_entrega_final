const nodemailer = require("nodemailer");

const sendEmailWithOrder = (asunto, mensaje) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", //todo de .env
    port: 587,
    auth: {
      user: "schuyler.yost17@ethereal.email",
      pass: "xawnFB6YWeKVBmvy5p",
    },
  });

  const mailOptions = {
    from: "schuyler.yost17@ethereal.email", //todo de .env
    to: "schuyler.yost17@ethereal.email", //todo de .env
    subject: asunto,
    html: mensaje,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmailWithOrder,
};
