const taskRepository = require("../../repositories/tasks/task");
const groupMemberRepository = require("../../repositories/group_members/group_member");
const userRepository = require("../../repositories/users/user");

class TaskService {
  async createTask({
    title,
    description,
    creator_id,
    assignee_id,
    group_id,
    status = 0,
  }) {
    const creator = await userRepository.findById(creator_id);
    if (!creator) {
      throw new Error("Creator not found");
    }

    if (assignee_id) {
      const assignee = await userRepository.findById(assignee_id);
      if (!assignee) {
        throw new Error("Assignee not found");
      }
    }

    if (group_id) {
      const isMember = await groupMemberRepository.findByGroupAndUser(
        group_id,
        creator_id
      );
      if (!isMember) {
        throw new Error(
          "Creator must be a member of the group to assign tasks"
        );
      }
    }

    const taskData = {
      title,
      description,
      creator_id,
      assignee_id,
      group_id,
      status,
      last_updated_by: creator_id,
    };
    return taskRepository.create(taskData);
  }

  async getAllTasks() {
    return taskRepository.findAll();
  }

  async getTaskById(id) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  async getTasksByGroupId(groupId) {
    return taskRepository.findByGroupId(groupId);
  }

  async getTasksByCreatorId(creatorId) {
    return taskRepository.findByCreatorId(creatorId);
  }

  async getTasksByAssigneeId(assigneeId) {
    return taskRepository.findByAssigneeId(assigneeId);
  }

  async updateTask(id, updateData, currentUserId, trx) {
    const task = await taskRepository.findById(id, trx);
    if (!task) {
      throw new Error("Task not found");
    }

    if (!task.group_id && task.creator_id !== currentUserId) {
      throw new Error("Only the creator can update a private task");
    }
    if (task.group_id) {
      const isMember = await groupMemberRepository.findByGroupAndUser(
        task.group_id,
        currentUserId,
        trx
      );
      if (!isMember) {
        throw new Error("Only group members can update this task");
      }
    }

    updateData.last_updated_by = currentUserId;
    const updatedTask = await taskRepository.update(id, updateData, trx);
    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return updatedTask;
  }

  async deleteTask(id, currentUserId) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    if (!task.group_id && task.creator_id !== currentUserId) {
      throw new Error("Only the creator can delete a private task");
    }
    if (task.group_id) {
      const isMember = await groupMemberRepository.findByGroupAndUser(
        task.group_id,
        currentUserId
      );
      if (!isMember) {
        throw new Error("Only group members can delete this task");
      }
    }

    const deletedTask = await taskRepository.delete(id);
    return deletedTask;
  }
}

module.exports = new TaskService();
