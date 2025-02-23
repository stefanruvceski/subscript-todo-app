const { Model } = require("objection");

class Group extends Model {
  static get tableName() {
    return "groups";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "creator_id"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        creator_id: { type: "integer" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    const User = require("../users/user");
    const Task = require("../tasks/task");
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "groups.creator_id",
          to: "users.id",
        },
      },
      members: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "groups.id",
          through: {
            from: "group_members.group_id",
            to: "group_members.user_id",
          },
          to: "users.id",
        },
      },
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "groups.id",
          to: "tasks.group_id",
        },
      },
    };
  }
}

module.exports = Group;
