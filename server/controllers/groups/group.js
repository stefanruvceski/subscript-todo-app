const groupService = require("../../services/groups/group");

class GroupController {
  async createGroup(req, res) {
    try {
      const { body } = req;
      const group = await groupService.createGroup(body);
      res.status(201).json(group);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getGroup(req, res) {
    try {
      const { id } = req.params;
      const group = await groupService.getGroupById(id);
      res.status(200).json(group);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllGroups(req, res) {
    try {
      const groups = await groupService.getAllGroups();
      res.status(200).json(groups);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateGroup(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const group = await groupService.updateGroup(id, body);
      res.status(200).json(group);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteGroup(req, res) {
    try {
      const { id } = req.params;
      await groupService.deleteGroup(id);
      res.status(204).json();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new GroupController();
