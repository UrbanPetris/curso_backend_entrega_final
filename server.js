require("dotenv").config();
require("./middlewares/auth");
const path = require("path");
const { sessionSettings, server, db, admin } = require("./lib/config");
const { getHistoricalChat, updateChat } = require("./lib/websockets");
const mongoose = require("mongoose");
const http = require("http");
const session = require("express-session");
global.appRoot = path.resolve(__dirname);
global.adminPhoneNumber = admin.phoneNumber;

const express = require("express");
const app = express();
const httpserver = http.createServer(app);
const io = require("socket.io")(httpserver);

const passport = require("passport");

app.use(session(sessionSettings));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());
require("./routes/index")(app); //routing

app.set("views", "./views");
app.set("view engine", "ejs");

io.on("connection", async (channel) => {
  const historicalChat = await getHistoricalChat();
  await sendMessages(historicalChat);

  channel.on("incomingMessage", async (message) => {
    try {
      const chatUpdated = await updateChat(message);
      await sendMessages(chatUpdated);
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  });
});

const sendMessages = (chat) => io.sockets.emit("chat", chat);

//app.listen
httpserver.listen(server.port, async () => {
  console.log(
    `Server running on port ${server.port} - ProcessId: ${process.pid}`
  );
  let URI_CONNECTION;
  process.env.NODE_ENV === "PROD"
    ? (URI_CONNECTION = db.mongo_uri)
    : (URI_CONNECTION = db.mongo_uri_dev);
  await mongoose.connect(URI_CONNECTION);
});
