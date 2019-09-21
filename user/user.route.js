const express = require("express");
const router = express.Router();
const auth = require("../_helpers/auth");

const user_controller = require("./user.controller");

router.post("/register", user_controller.createUser);
router.post("/login", user_controller.login);
router.put("/changepassword", auth, user_controller.changePassword);

module.exports = router;
