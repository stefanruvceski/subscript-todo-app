exports.up = function (knex) {
  return knex.schema.createTable("groups", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("creator_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.index("creator_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};
