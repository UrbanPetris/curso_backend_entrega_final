require("dotenv").config();
require("./middlewares/auth"); //lo necesita passport para inicializar
const { sessionSettings, server, db, admin } = require("./lib/config");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
global.appRoot = path.resolve(__dirname);
global.adminPhoneNumber = admin.phoneNumber;

const express = require("express");
const app = express();

const passport = require("passport");

app.use(session(sessionSettings));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/index")(app); //routing

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(server.port, async () => {
  console.log(
    `Server running on port ${server.port} - ProcessId: ${process.pid}`
  );
  await mongoose.connect(db.url_mongo);
});
