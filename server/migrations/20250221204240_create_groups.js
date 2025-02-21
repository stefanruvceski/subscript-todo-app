exports.up = function(knex) {
    return knex.schema.createTable('groups', table => {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('name').notNullable(); // Required username
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()); // Auto-set on creation
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('groups'); // Drops the table on rollback
  };