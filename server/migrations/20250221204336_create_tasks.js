exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.string("title").notNullable(); // Required title
    table.text("description"); // Optional description
    table.integer("status").notNullable().defaultTo(0);
    table.integer("creator_id").notNullable().references("users.id"); // Foreign key to users
    table.integer("assignee_id").references("users.id"); // Optional foreign key to users
    table.integer("group_id").references("groups.id"); // Optional foreign key to groups
    table.integer("last_updated_by").references("users.id"); // Optional foreign key to users
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()); // Auto-set on creation
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now()); // Auto-set on creation/update
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks"); // Drops the table on rollback
};
