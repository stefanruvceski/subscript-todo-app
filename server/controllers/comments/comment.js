const TaskCommentService = require("../../services/comments/comment");

class TaskCommentController {
  async createComment(req, res) {
    try {
      const comment = await TaskCommentService.createComment({
        ...req.body,
        user_id: req.user.id,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getComments(req, res) {
    try {
      const comments = await TaskCommentService.getCommentsByTaskId(
        req.params.taskId,
        req.user.id
      );
      res.json(comments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TaskCommentController();
