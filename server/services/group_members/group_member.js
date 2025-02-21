const groupMemberRepository = require("../../repositories/group_members/group_member");

class GroupMemberService {
  async createGroupMember({ user_id, group_id }) {
    const memberData = { user_id, group_id };
    const existingMember = await groupMemberRepository
      .findByUserId(user_id)
      .where("group_id", group_id)
      .first();
    if (existingMember) {
      throw new Error("User is already a member of this group");
    }
    return groupMemberRepository.create(memberData);
  }

  async getGroupMemberById(id) {
    const member = await groupMemberRepository.findById(id);
    if (!member) {
      throw new Error("Group member not found");
    }
    return member;
  }

  async getMembersByGroupId(groupId) {
    return groupMemberRepository.findByGroupId(groupId);
  }

  async getGroupsByUserId(userId) {
    return groupMemberRepository.findByUserId(userId);
  }

  async getAllGroupMembers() {
    return groupMemberRepository.findAll();
  }

  async updateGroupMember(id, memberData) {
    const updatedMember = await groupMemberRepository.update(id, memberData);
    if (!updatedMember) {
      throw new Error("Group member not found");
    }
    return updatedMember;
  }

  async deleteGroupMember(id) {
    const deletedCount = await groupMemberRepository.delete(id);
    if (!deletedCount) {
      throw new Error("Group member not found");
    }
    return deletedCount;
  }
}

module.exports = new GroupMemberService();
