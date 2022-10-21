const { Users } = require("../models/usuarios");
const { Carrito } = require("../models/carrito");
const bCrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const path = require("path");
const { log, logerror } = require("../lib/logger");

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
          log.info(`User not found with email ${email}`);
          return next(null, false);
        }
        const validated = isValidPassword(user, password);
        if (!validated) {
          log.info(`Invalid password for ${user.email}`);
          next(null, false);
        }

        next(null, user);
      } catch (err) {
        log.error(`Error en el proceso de autenticación ${err}`);
        logerror.error(`Error en el proceso de autenticación ${err}`);
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
          log.info(`User with email ${email} already exists`);
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
          avatar: {
            data: fs.readFileSync(
              path.join(appRoot + "/public/avatars/" + req.file.filename)
            ),
            contentType: "image/png",
          },
        };

        try {
          const userCreated = await Users.create(newUser);
          const idUserCreated = await Users.findOne({ email: email }, "_id");
          const nuevoCarrito = new Carrito({
            _id: idUserCreated,
            modifiedOn: new Date(),
          });
          await nuevoCarrito.save();
          log.info(`User with email ${email} registered succesfully with cart`);
          return next(null, userCreated);
        } catch (err) {
          console.log("Error in Saving user with cart: " + err); //sacar console.log
          return next(err);
        }
      } catch (err) {
        log.error(`Error en el proceso de registro ${err}`);
        logerror.error(`Error en el proceso de registro ${err}`);
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
    console.log("Error in getting user: " + err); //sacar console.log
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
