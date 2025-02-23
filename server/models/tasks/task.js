const { Model } = require("objection");

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "creator_id", "last_updated_by"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string" },
        status: { type: "integer", minimum: 0, maximum: 2 }, // 0 = To Do, 1 = In Progress, 2 = Done
        creator_id: { type: "integer" },
        assignee_id: { type: ["integer", "null"] },
        group_id: { type: ["integer", "null"] },
        last_updated_by: { type: "integer" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    const User = require("../users/user");
    const Group = require("../groups/group");
    const TaskHistory = require("./Task_history");
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tasks.creator_id",
          to: "users.id",
        },
      },
      assignee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tasks.assignee_id",
          to: "users.id",
        },
      },
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: "tasks.group_id",
          to: "groups.id",
        },
      },
      lastUpdater: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tasks.last_updated_by",
          to: "users.id",
        },
      },
      history: {
        relation: Model.HasManyRelation,
        modelClass: TaskHistory,
        join: {
          from: "tasks.id",
          to: "task_history.task_id",
        },
      },
    };
  }
}

module.exports = Task;
