const router = require("express").Router();

const { serveFailureLogin } = require("../controllers/serveFailure");

router.route("/").get(serveFailureLogin);

module.exports = router;
