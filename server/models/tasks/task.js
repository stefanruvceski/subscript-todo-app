const { Model } = require("objection");

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "status", "creator_id"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", maxLength: 1000 },
        status: { type: "string", enum: ["pending", "in_progress", "done"] }, // Adjust statuses as needed
        creator_id: { type: "integer" }, // User who created the task
        assignee_id: { type: "integer" }, // User assigned to the task
        group_id: { type: "integer" }, // Group the task belongs to
        last_updated_by: { type: "integer" }, // User who last updated it
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}

module.exports = Task;
