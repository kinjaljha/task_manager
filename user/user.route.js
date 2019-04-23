const express = require("express");
const router = express.Router();
const auth = require("../_helpers/auth");

const user_controller = require("./user.controller");

// router.get("/", user_controller.getUsers);
// router.get("/me", user_controller.testToken);
router.post("/register", user_controller.createUser);
router.post("/login", user_controller.login);
router.put("/changepassword", auth, user_controller.changePassword);
// router.delete("/logout", user_controller.logout);

module.exports = router;
