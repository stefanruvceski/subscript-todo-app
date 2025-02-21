const groupMemberService = require("../../services/group_members/group_member");

class GroupMemberController {
  async createGroupMember(req, res) {
    try {
      const { body } = req;
      const member = await groupMemberService.createGroupMember(body);
      res.status(201).json(member);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getGroupMember(req, res) {
    try {
      const { id } = req.params;
      const member = await groupMemberService.getGroupMemberById(id);
      res.status(200).json(member);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getMembersByGroupId(req, res) {
    try {
      const { groupId } = req.params;
      const members = await groupMemberService.getMembersByGroupId(groupId);
      res.status(200).json(members);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getGroupsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const groups = await groupMemberService.getGroupsByUserId(userId);
      res.status(200).json(groups);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllGroupMembers(req, res) {
    try {
      const members = await groupMemberService.getAllGroupMembers();
      res.status(200).json(members);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateGroupMember(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const member = await groupMemberService.updateGroupMember(id, body);
      res.status(200).json(member);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteGroupMember(req, res) {
    try {
      const { id } = req.params;
      await groupMemberService.deleteGroupMember(id);
      res.status(204).json();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new GroupMemberController();
