const taskHistoryRepository = require("../../repositories/task_history/task_history");
const taskRepository = require("../../repositories/tasks/task");

class TaskHistoryService {
  async getTaskHistory(taskId) {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    const history = await taskHistoryRepository.findByTaskId(taskId);
    if (!history.length) {
      throw new Error("No history found for this task");
    }
    return history;
  }

  async getHistoryByChangerId(changerId) {
    const history = await taskHistoryRepository.findByChangerId(changerId);
    if (!history.length) {
      throw new Error("No history found for this user");
    }
    return history;
  }
}

module.exports = new TaskHistoryService();
