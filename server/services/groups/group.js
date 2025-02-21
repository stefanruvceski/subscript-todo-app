const groupRepository = require("../../repositories/groups/group");
const groupMemberRepository = require("../../repositories/group_members/group_member");

class GroupService {
  async createGroup({ name, creator_id }) {
    const groupData = { name, creator_id };
    const newGroup = await groupRepository.create(groupData);

    // Automatski dodaj kreatora kao člana grupe
    await groupMemberRepository.create({
      group_id: newGroup.id,
      user_id: creator_id,
    });
    return newGroup;
  }

  async getAllGroups() {
    return groupRepository.findAll();
  }

  async getGroupById(id) {
    const group = await groupRepository.findById(id);
    if (!group) {
      throw new Error("Group not found");
    }
    return group;
  }

  async getGroupsByCreatorId(creatorId) {
    return groupRepository.findByCreatorId(creatorId);
  }

  async updateGroup(id, updateData) {
    const updatedGroup = await groupRepository.update(id, updateData);
    if (!updatedGroup) {
      throw new Error("Group not found");
    }
    return updatedGroup;
  }

  async deleteGroup(id) {
    const deletedGroup = await groupRepository.delete(id);
    if (!deletedGroup) {
      throw new Error("Group not found");
    }
    return deletedGroup;
  }
}

module.exports = new GroupService();
