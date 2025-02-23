const groupMemberRepository = require("../../repositories/group_members/group_member");
const groupRepository = require("../../repositories/groups/group");
const userRepository = require("../../repositories/users/user");

class GroupMemberService {
  async addMember({ group_id, user_id }) {
    const group = await groupRepository.findById(group_id);
    if (!group) {
      throw new Error("Group not found");
    }
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new Error("User not found");
    }

    const existingMember = await groupMemberRepository.findByGroupAndUser(
      group_id,
      user_id
    );
    if (existingMember) {
      throw new Error("User is already a member of this group");
    }

    return groupMemberRepository.create({ group_id, user_id });
  }

  async getMembersByGroupId(groupId) {
    const members = await groupMemberRepository.findByGroupId(groupId);
    if (!members.length) {
      throw new Error("No members found for this group");
    }
    return members;
  }

  async getGroupsByUserId(userId) {
    return groupMemberRepository.findByUserId(userId);
  }

  async removeMember(groupId, userId) {
    const deletedMember = await groupMemberRepository.delete(groupId, userId);
    if (!deletedMember.length) {
      throw new Error("User is not a member of this group");
    }
    return deletedMember[0];
  }
}

module.exports = new GroupMemberService();
