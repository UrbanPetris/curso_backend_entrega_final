const router = require("express").Router();

const { get404 } = require("../controllers/404");

router.route("/").get(get404);

module.exports = router;
