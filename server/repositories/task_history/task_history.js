const TaskHistory = require("../../models/task_history/task_histiry");

class TaskHistoryRepository {
  async create(historyData) {
    return TaskHistory.query().insert(historyData).returning("*");
  }

  async findAll() {
    return TaskHistory.query();
  }

  async findById(id) {
    return TaskHistory.query().findById(id);
  }

  async findByTaskId(taskId) {
    return TaskHistory.query().where("task_id", taskId);
  }

  async update(id, historyData) {
    return TaskHistory.query().patchAndFetchById(id, historyData);
  }

  async delete(id) {
    return TaskHistory.query().deleteById(id);
  }
}

module.exports = new TaskHistoryRepository();
