const Group = require("../../models/groups/group");

class GroupRepository {
  async create(groupData) {
    return Group.query().insert(groupData).returning("*");
  }

  async findAll() {
    return Group.query();
  }

  async findById(id) {
    return Group.query().findById(id);
  }

  async findByCreatorId(creatorId) {
    return Group.query().where("creator_id", creatorId);
  }

  async update(id, groupData) {
    return Group.query().patchAndFetchById(id, groupData);
  }

  async delete(id) {
    return Group.query().deleteById(id).returning("*");
  }
}

module.exports = new GroupRepository();
