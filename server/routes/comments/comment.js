const express = require("express");
const TaskCommentController = require("../../controllers/comments/comment");
const authMiddleware = require("../../middlewares/auth");
const router = express.Router();

router.post("/", authMiddleware, TaskCommentController.createComment);
router.get("/:taskId", authMiddleware, TaskCommentController.getComments);

module.exports = router;
