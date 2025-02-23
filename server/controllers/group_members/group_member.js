const groupMemberService = require("../../services/group_members/group_member");

class GroupMemberController {
  async addMember(req, res) {
    try {
      const member = await groupMemberService.addMember(req.body);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMembers(req, res) {
    try {
      const members = await groupMemberService.getMembersByGroupId(
        req.params.groupId
      );
      res.json(members);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async removeMember(req, res) {
    try {
      const { groupId, userId } = req.params;
      const member = await groupMemberService.removeMember(groupId, userId);
      res.status(200).json(member);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new GroupMemberController();
