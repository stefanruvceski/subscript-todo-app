exports.up = function (knex) {
  return knex.schema.createTable("task_history", (table) => {
    table.increments("id").primary();
    table
      .integer("task_id")
      .unsigned()
      .references("id")
      .inTable("tasks")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("changed_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .notNullable();
    table.timestamp("changed_at").defaultTo(knex.fn.now());
    table.jsonb("old_values");
    table.jsonb("new_values");
    table.index("task_id");
    table.index("changed_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("task_history");
};
