const { Model } = require('objection');

class TaskHistory extends Model {
  static get tableName() {
    return 'task_history';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['task_id', 'changed_by', 'changed_at'],
      properties: {
        id: { type: 'integer' },
        task_id: { type: 'integer' }, // References a task
        changed_by: { type: 'integer' }, // References a user who made the change
        changed_at: { type: 'string', format: 'date-time' },
        old_values: { type: 'object' }, // Stores old task data as JSON
        new_values: { type: 'object' }  // Stores new task data as JSON
      }
    };
  }
}

module.exports = TaskHistory;