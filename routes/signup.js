const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const { getSignUpPage, makeSignUp } = require("../controllers/signup");

router
  .route("/")
  .get(getSignUpPage)
  .post(upload("image"), authenticate("register"), makeSignUp);
module.exports = router;
