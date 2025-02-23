const taskService = require("../../services/tasks/task");

class TaskController {
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body, req.user?.id);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTask(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.body,
        req.user?.id
      );
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const task = await taskService.deleteTask(req.params.id, req.user?.id);
      res.status(200).json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
