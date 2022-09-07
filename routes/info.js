const router = require("express").Router();
const { getInfo } = require("../controllers/info");

router.route("/").get(getInfo);

module.exports = router;
