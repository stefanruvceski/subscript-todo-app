const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "password"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", format: "email", maxLength: 255 },
        password: { type: "string", minLength: 6 },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      ownedGroups: {
        relation: Model.HasManyRelation,
        modelClass: require("../groups/group"),
        join: {
          from: "users.id",
          to: "groups.creator_id",
        },
      },
      memberships: {
        relation: Model.ManyToManyRelation,
        modelClass: require("../groups/group"),
        join: {
          from: "users.id",
          through: {
            from: "group_members.user_id",
            to: "group_members.group_id",
          },
          to: "groups.id",
        },
      },
      createdTasks: {
        relation: Model.HasManyRelation,
        modelClass: require("./task"),
        join: {
          from: "users.id",
          to: "tasks.creator_id",
        },
      },
      assignedTasks: {
        relation: Model.HasManyRelation,
        modelClass: require("./task"),
        join: {
          from: "users.id",
          to: "tasks.assignee_id",
        },
      },
      updatedTasks: {
        relation: Model.HasManyRelation,
        modelClass: require("./task"),
        join: {
          from: "users.id",
          to: "tasks.last_updated_by",
        },
      },
    };
  }
}

module.exports = User;
