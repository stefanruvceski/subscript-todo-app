const TaskCommentRepository = require("../../repositories/comments/comment");
const TaskRepository = require("../../repositories/tasks/task");
const GroupMemberRepository = require("../../repositories/group_members/group_member");

class TaskCommentService {
  async createComment({ task_id, user_id, content, parent_comment_id }) {
    const task = await TaskRepository.findById(task_id);
    if (!task) {
      throw new Error("Task not found");
    }

    if (parent_comment_id) {
      const parentComment = await TaskCommentRepository.findById(
        parent_comment_id
      );
      if (!parentComment || parentComment.task_id !== task_id) {
        throw new Error(
          "Parent comment not found or does not belong to this task"
        );
      }
    }

    if (!task.group_id) {
      if (task.creator_id !== user_id) {
        throw new Error("Only the task creator can comment on a private task");
      }
    } else {
      const isMember = await GroupMemberRepository.findByGroupAndUser(
        task.group_id,
        user_id
      );
      if (!isMember) {
        throw new Error("Only group members can comment on this task");
      }
    }

    const commentData = { task_id, user_id, content, parent_comment_id };
    return TaskCommentRepository.create(commentData);
  }

  async getCommentsByTaskId(taskId, userId) {
    const task = await TaskRepository.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    if (!task.group_id) {
      if (task.creator_id !== userId) {
        throw new Error(
          "Only the task creator can view comments on a private task"
        );
      }
    } else {
      const isMember = await GroupMemberRepository.findByGroupAndUser(
        task.group_id,
        userId
      );
      if (!isMember) {
        throw new Error("Only group members can view comments on this task");
      }
    }

    return TaskCommentRepository.findByTaskId(taskId);
  }
}

module.exports = new TaskCommentService();
