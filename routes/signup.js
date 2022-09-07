const router = require("express").Router();
const passport = require("passport");
const multer = require("multer");

const { getSignUpPage, makeSignUp } = require("../controllers/signup");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()} - ${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

//agregar sharp para automáticamente resizear la foto

router
  .route("/")
  .get(getSignUpPage)
  .post(
    upload.single("image"),
    passport.authenticate("register", { failureRedirect: "/serveFailure" }),
    makeSignUp
  );

module.exports = router;
