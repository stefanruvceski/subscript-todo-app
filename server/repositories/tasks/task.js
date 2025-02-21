const Task = require("../models/tasks/task");

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

  async update(id, taskData) {
    return Task.query().patchAndFetchById(id, taskData);
  }

  async delete(id) {
    return Task.query().deleteById(id);
  }
}

module.exports = new TaskRepository();
