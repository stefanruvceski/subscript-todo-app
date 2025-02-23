exports.up = function (knex) {
  return knex.schema.createTable("task_comments", (table) => {
    table.increments("id").primary();
    table
      .integer("task_id")
      .unsigned()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .notNullable();
    table
      .integer("parent_comment_id")
      .unsigned()
      .references("id")
      .inTable("task_comments")
      .onDelete("CASCADE")
      .nullable();
    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.index("task_id", "idx_task_comments_task_id");
    table.index("parent_comment_id", "idx_task_comments_parent_comment_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("task_comments");
};
