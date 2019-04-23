const express = require("express");
const router = express.Router();

const task_controller = require("../controllers/task.controller");

router.get("/", task_controller.getTasks);
router.post("/", task_controller.createTask);
router.get("/:id", task_controller.getTask);
router.put("/:id", task_controller.updateTask);
router.delete("/:id", task_controller.deleteTask);

module.exports = router;
