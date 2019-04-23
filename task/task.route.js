const express = require("express");
const router = express.Router();
const auth = require("../_helpers/auth");
const task_controller = require("./task.controller");

router.get("/", auth, task_controller.getTasks);
router.post("/", auth, task_controller.createTask);
router.get("/:id", auth, task_controller.getTask);
router.put("/:id", auth, task_controller.updateTask);
router.delete("/:id", auth, task_controller.deleteTask);

module.exports = router;
