const { Model } = require("objection");

class TaskComment extends Model {
  static get tableName() {
    return "task_comments";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["task_id", "user_id", "content"],
      properties: {
        id: { type: "integer" },
        task_id: { type: "integer" },
        user_id: { type: "integer" },
        parent_comment_id: { type: ["integer", "null"] },
        content: { type: "string", minLength: 1 },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
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
          from: "task_comments.task_id",
          to: "tasks.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "task_comments.user_id",
          to: "users.id",
        },
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaskComment,
        join: {
          from: "task_comments.parent_comment_id",
          to: "task_comments.id",
        },
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: TaskComment,
        join: {
          from: "task_comments.id",
          to: "task_comments.parent_comment_id",
        },
      },
    };
  }
}

module.exports = TaskComment;
