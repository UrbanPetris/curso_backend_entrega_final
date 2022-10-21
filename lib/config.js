const { argv } = require("yargs");
let config = {};

config.admin = {
  phoneNumber: argv.admin_phone_number || process.env.ADMIN_PHONENUMBER,
};

config.server = {
  port: argv.port || process.env.PORT || 8081,
};

config.db = {
  url_mongo: argv.mongo_CS || process.env.MONGO_CS,
};

config.messagging = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  sandboxNumber: process.env.TWILIO_SANDBOX_NUMBER,
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID_CODERHOUSE,
};

config.mailing = {
  host: argv.mailing_host || process.env.MAILING_HOST,
  port: argv.mailing_port || process.env.MAILING_PORT,
  auth: {
    user: argv.mailing_user || process.env.MAILING_USER,
    pass: argv.mailing_pass || process.env.MAILING_PASS,
  },
};

config.sessionSettings = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: argv.session_maxage || process.env.SESSION_MAXAGE || 600000,
  },
};

module.exports = { ...config };
