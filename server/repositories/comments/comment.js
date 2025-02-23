const TaskComment = require("../../models/comments/comment");

class TaskCommentRepository {
  async create(commentData) {
    return TaskComment.query().insert(commentData).returning("*");
  }

  async findByTaskId(taskId) {
    return TaskComment.query()
      .where("task_id", taskId)
      .withGraphFetched("replies");
  }

  async findById(commentId) {
    return TaskComment.query().findById(commentId);
  }
}

module.exports = new TaskCommentRepository();
