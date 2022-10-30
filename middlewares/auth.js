const { Users } = require("../models/usuarios");
const { Carrito } = require("../models/carrito");
const bCrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const { loguear } = require("../lib/logger");
const { sendEmail, emailMessageSignUp } = require("../lib/email");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: false,
    },
    async (email, password, next) => {
      try {
        const user = await Users.findOne({ email: email });
        if (!user) {
          loguear(`User not found with email ${email}`, "info");
          return next(null, false);
        }
        const validated = isValidPassword(user, password);
        if (!validated) {
          loguear(`Invalid password for ${user.email}`, "info");
          next(null, false);
        }

        next(null, user);
      } catch (err) {
        loguear(`Error en el proceso de autenticación ${err}`, "error");
        loguear(
          `Error en el proceso de autenticación ${err}`,
          "error",
          "devError"
        );
        next(err, false);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true, //no es necesario si no vamos a requerir otras datos de body
    },
    async (req, email, password, next) => {
      try {
        const user = await Users.findOne({ email: email });

        if (user) {
          loguear(`User with email ${email} already exists`, "info");
          return next(null, false);
        }

        const newUser = {
          email: email,
          password: createHash(password),
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
          address: req.body.address,
          phonenumber: req.body.countryCode + req.body.phonenumber,
          avatar: req.file.filename,
        };

        try {
          const userCreated = await Users.create(newUser);
          const idUserCreated = await Users.findOne({ email: email }, "_id");
          const nuevoCarrito = new Carrito({
            _id: idUserCreated,
            modifiedOn: new Date(),
          });
          await nuevoCarrito.save();
          loguear(
            `User with email ${email} registered succesfully with cart`,
            "info"
          );
          await sendEmail(
            `Usuario registrado`,
            emailMessageSignUp(userCreated)
          );
          return next(null, userCreated);
        } catch (err) {
          loguear(`Error in Saving user with cart: ${err}`, "error");
          loguear(
            `Error in Saving user with cart: ${err}`,
            "error",
            "devError"
          );
          return next(err);
        }
      } catch (err) {
        loguear(`Error en el proceso de registro ${err}`, "error");
        loguear(`Error en el proceso de registro ${err}`, "error", "devError");
        return next(err, false);
      }
    }
  )
);

passport.serializeUser((user, next) => {
  next(null, user.email);
});

passport.deserializeUser(async (email, next) => {
  try {
    let user = await Users.findOne({ email: email });
    next(null, user);
  } catch (err) {
    loguear(`Error in getting user: ${err}`, "error");
    loguear(`Error in getting user: ${err}`, "error", "devError");
    return next(err);
  }
});

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const authenticate = (authentication) => {
  return passport.authenticate(authentication, {
    failureRedirect: "/serveFailure",
  });
};

module.exports = {
  authenticate,
};
