exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.integer("status").defaultTo(0);
    table
      .integer("creator_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("assignee_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table
      .integer("group_id")
      .unsigned()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .nullable();
    table
      .integer("last_updated_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.index("creator_id");
    table.index("assignee_id");
    table.index("group_id");
    table.index("last_updated_by");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
