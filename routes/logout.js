const router = require("express").Router();

const { destroySession } = require("../controllers/logout");

router.route("/").get(destroySession);

module.exports = router;
