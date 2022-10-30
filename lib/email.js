const { mailing } = require("./config");
const nodemailer = require("nodemailer");

const emailMessageSignUp = (usuario) => {
  let message = `
  <h1>Se registró el usuario ${usuario.firstname} - ${usuario.email}</h1>`;
  return message;
};

const emailMessageOrder = (usuario, productos) => {
  let message = `
  <h1>Nuevo pedido de ${usuario.firstname} - ${usuario.email}</h1>
  <table>
  <tr>
  <th>Nombre</th>
  <th>Precio</th>
  <th>Cantidad</th>
  <th>Subtotal</th>
  </tr>`;

  let total = 0;
  productos.forEach((prod) => {
    message += `<tr>
    <td>${prod.name}</td>
    <td>$${prod.price}</td>
    <td>${prod.quantity}</td>
    <td>$${prod.quantity * prod.price}</td>
    </tr>`;

    total += prod.quantity * prod.price;
  });
  message += `</table>
  Total: $${total}
  `;

  return message;
};

const sendEmail = (asunto, mensaje) => {
  const transporter = nodemailer.createTransport(mailing);

  const mailOptions = {
    from: mailing.auth.user,
    to: mailing.auth.user,
    subject: asunto,
    html: mensaje,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  emailMessageOrder,
  emailMessageSignUp,
  sendEmail,
};
