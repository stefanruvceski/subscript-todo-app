const Task = require("../../models/tasks/task");

class TaskRepository {
  async create(taskData) {
    return Task.query().insert(taskData).returning("*");
  }

  async findAll() {
    return Task.query();
  }

  async findById(id) {
    return Task.query().findById(id);
  }

  async findByCreatorId(creatorId) {
    return Task.query().where("creator_id", creatorId);
  }

  async findByAssigneeId(assigneeId) {
    return Task.query().where("assignee_id", assigneeId);
  }

  async findByGroupId(groupId) {
    return Task.query().where("group_id", groupId);
  }

  async findPrivateByCreatorId(creatorId) {
    return Task.query()
      .where("creator_id", creatorId)
      .andWhere("group_id", null);
  }

  async update(id, taskData) {
    return Task.query().patchAndFetchById(id, taskData);
  }

  async delete(id) {
    return Task.query().deleteById(id).returning("*");
  }
}

module.exports = new TaskRepository();
