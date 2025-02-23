const express = require("express");
const validate = require("../../middlewares/validate");
const { taskSchema } = require("../../middlewares/validation_schema");
const taskController = require("../../controllers/tasks/task");

const router = express.Router();

router.post("/", validate(taskSchema), taskController.createTask);
router.get("/:id", taskController.getTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
