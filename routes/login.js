const router = require("express").Router();
const passport = require("passport");

const { getLoginPage, makeLogin } = require("../controllers/login");

router
  .route("/")
  .get(getLoginPage)
  .post(
    passport.authenticate("login", {
      failureRedirect: "/serveFailure",
    }),
    makeLogin
  );

module.exports = router;
