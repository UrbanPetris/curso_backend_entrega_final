let config = {};

config.admin = {
  phoneNumber: "+5491168389999",
};

config.server = {
  port: process.env.PORT || parseInt(process.argv[2]) || 8081,
};

config.db = {
  url_mongo: process.env.MONGO_CS,
};

config.messagging = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
};

config.sessionSettings = {
  secret: "estoesunaresecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
  },
};

module.exports = { ...config };
