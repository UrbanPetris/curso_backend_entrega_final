const router = require("express").Router();

const { checkout } = require("../controllers/checkout");

router.route("/").post(checkout);

module.exports = router;
