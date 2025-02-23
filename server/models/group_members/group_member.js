const { Model } = require("objection");

class GroupMember extends Model {
  static get tableName() {
    return "group_members";
  }

  static get idColumn() {
    return ["group_id", "user_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["group_id", "user_id"],
      properties: {
        group_id: { type: "integer" },
        user_id: { type: "integer" },
        joined_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    const Group = require("../groups/group");
    const User = require("../users/user");
    return {
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: "group_members.group_id",
          to: "groups.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "group_members.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = GroupMember;
