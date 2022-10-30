const router = require("express").Router();

const { getChat, getChatByEmail } = require("../controllers/chat");
const { checkAuthentication } = require("../middlewares/checkAuthentication");

router.route("/").get(checkAuthentication, getChat);

router.route("/:email").get(checkAuthentication, getChatByEmail);

module.exports = router;
