exports.up = function (knex) {
  return knex.schema.createTable("group_members", (table) => {
    table
      .integer("group_id")
      .unsigned()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamp("joined_at").defaultsTo(knex.fn.now());
    table.primary(["group_id", "user_id"]);
    table.index("user_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("group_members"); // Drops the table on rollback
};
