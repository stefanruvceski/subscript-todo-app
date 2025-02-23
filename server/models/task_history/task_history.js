const { Model } = require("objection");

class TaskHistory extends Model {
  static get tableName() {
    return "task_history";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["task_id", "changed_by"],
      properties: {
        id: { type: "integer" },
        task_id: { type: "integer" },
        changed_by: { type: "integer" },
        changed_at: { type: "string", format: "date-time" },
        old_values: { type: ["object", "null"] },
        new_values: { type: ["object", "null"] },
      },
    };
  }

  static get relationMappings() {
    const Task = require("../tasks/task");
    const User = require("../users/user");
    return {
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: "task_history.task_id",
          to: "tasks.id",
        },
      },
      changer: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "task_history.changed_by",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = TaskHistory;
