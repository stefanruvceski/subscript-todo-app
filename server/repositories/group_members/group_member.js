const GroupMember = require("../models/group_members/group_member");

class GroupMemberRepository {
  async create(memberData) {
    return GroupMember.query().insert(memberData).returning("*");
  }

  async findAll() {
    return GroupMember.query();
  }

  async findById(id) {
    return GroupMember.query().findById(id);
  }

  async findByGroupId(groupId) {
    return GroupMember.query().where("group_id", groupId);
  }

  async findByUserId(userId) {
    return GroupMember.query().where("user_id", userId);
  }

  async update(id, memberData) {
    return GroupMember.query().patchAndFetchById(id, memberData);
  }

  async delete(id) {
    return GroupMember.query().deleteById(id);
  }
}

module.exports = new GroupMemberRepository();
