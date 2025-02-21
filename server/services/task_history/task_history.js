const taskHistoryRepository = require("../../repositories/task_history/task_history");

class TaskHistoryService {
  async createTaskHistory({ task_id, changed_by, old_values, new_values }) {
    const historyData = { task_id, changed_by, old_values, new_values };
    return taskHistoryRepository.create(historyData);
  }

  async getTaskHistoryById(id) {
    const history = await taskHistoryRepository.findById(id);
    if (!history) {
      throw new Error("Task history not found");
    }
    return history;
  }

  async getTaskHistoryByTaskId(taskId) {
    return taskHistoryRepository.findByTaskId(taskId);
  }

  async getAllTaskHistories() {
    return taskHistoryRepository.findAll();
  }

  async updateTaskHistory(id, historyData) {
    const updatedHistory = await taskHistoryRepository.update(id, historyData);
    if (!updatedHistory) {
      throw new Error("Task history not found");
    }
    return updatedHistory;
  }

  async deleteTaskHistory(id) {
    const deletedCount = await taskRepository.delete(id);
    if (!deletedCount) {
      throw new Error("Task history not found");
    }
    return deletedCount;
  }
}

module.exports = new TaskHistoryService();
