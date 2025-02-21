const Group = require('../models/groups/group');

class GroupRepository {
  async create(groupData) {
    return Group.query().insert(groupData).returning('*');
  }

  async findAll() {
    return Group.query();
  }

  async findById(id) {
    return Group.query().findById(id);
  }

  async update(id, groupData) {
    return Group.query().patchAndFetchById(id, groupData);
  }

  async delete(id) {
    return Group.query().deleteById(id);
  }
}

module.exports = new GroupRepository();