const express = require("express");
const taskHistoryController = require("../../controllers/task_history/task_history");

const router = express.Router();

router.post("/", taskHistoryController.createTaskHistory);
router.get("/:id", taskHistoryController.getTaskHistory);
router.get("/task/:taskId", taskHistoryController.getTaskHistoryByTaskId);
router.get("/", taskHistoryController.getAllTaskHistories);
router.put("/:id", taskHistoryController.updateTaskHistory);
router.delete("/:id", taskHistoryController.deleteTaskHistory);

module.exports = router;
