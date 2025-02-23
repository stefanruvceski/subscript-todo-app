const groupService = require("../../services/groups/group");

class GroupController {
  async createGroup(req, res) {
    try {
      console.log(req.user.id)
      const group = await groupService.createGroup(req.body, req.user.id);
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllGroups(req, res) {
    try {
      const groups = await groupService.getAllGroups();
      res.json(groups);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getGroup(req, res) {
    try {
      const group = await groupService.getGroupById(req.params.id);
      res.json(group);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateGroup(req, res) {
    try {
      const group = await groupService.updateGroup(req.params.id, req.body);
      res.json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteGroup(req, res) {
    try {
      const group = await groupService.deleteGroup(req.params.id);
      res.status(200).json(group);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new GroupController();
