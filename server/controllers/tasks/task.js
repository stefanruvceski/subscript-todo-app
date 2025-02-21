const taskService = require("../../services/tasks/task");

class TaskController {
  async createTask(req, res) {
    try {
      const { body } = req;
      const task = await taskService.createTask(body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTask(req, res) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const task = await taskService.updateTask(id, body);
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id);
      res.status(204).json();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new TaskController();
