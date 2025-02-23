const GroupMember = require("../../models/group_members/group_member");

class GroupMemberRepository {
  async create(groupMemberData) {
    return GroupMember.query().insert(groupMemberData).returning("*");
  }

  async findByGroupId(groupId) {
    return GroupMember.query().where("group_id", groupId);
  }

  async findByUserId(userId) {
    return GroupMember.query().where("user_id", userId);
  }

  async findByGroupAndUser(groupId, userId) {
    return GroupMember.query()
      .where("group_id", groupId)
      .andWhere("user_id", userId)
      .first();
  }

  async delete(groupId, userId) {
    return GroupMember.query()
      .delete()
      .where("group_id", groupId)
      .andWhere("user_id", userId)
      .returning("*");
  }
}

module.exports = new GroupMemberRepository();
