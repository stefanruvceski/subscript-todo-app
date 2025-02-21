const taskHistoryService = require("../../services/task_history/task_history");

class TaskHistoryController {
  async createTaskHistory(req, res) {
    try {
      const { body } = req;
      const history = await taskHistoryService.createTaskHistory(body);
      res.status(201).json(history);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTaskHistory(req, res) {
    try {
      const { id } = req.params;
      const history = await taskHistoryService.getTaskHistoryById(id);
      res.status(200).json(history);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTaskHistoryByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const histories = await taskHistoryService.getTaskHistoryByTaskId(taskId);
      res.status(200).json(histories);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllTaskHistories(req, res) {
    try {
      const histories = await taskHistoryService.getAllTaskHistories();
      res.status(200).json(histories);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateTaskHistory(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const history = await taskHistoryService.updateTaskHistory(id, body);
      res.status(200).json(history);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteTaskHistory(req, res) {
    try {
      const { id } = req.params;
      await taskHistoryService.deleteTaskHistory(id);
      res.status(204).json();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new TaskHistoryController();
