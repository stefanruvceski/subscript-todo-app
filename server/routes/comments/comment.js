const express = require("express");
const validate = require("../../middlewares/validate");
const { commentSchema } = require("../../middlewares/validation_schema");
const TaskCommentController = require("../../controllers/comments/comment");
const router = express.Router();

router.post("/", validate(commentSchema), TaskCommentController.createComment);
router.get("/:taskId", TaskCommentController.getComments);

module.exports = router;
