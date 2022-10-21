module.exports = (app) => {
  app.use("/", require("./home"));
  app.use("/checkout", require("./checkout"));
  app.use("/productos", require("./productos"));
  app.use("/carrito", require("./carrito"));
  app.use("/logout", require("./logout"));
  app.use("/login", require("./login"));
  app.use("/signup", require("./signup"));
  app.use("/info", require("./info"));
  app.use("/serveFailure", require("./serveFailure"));
  app.use("*", require("./404"));
};
