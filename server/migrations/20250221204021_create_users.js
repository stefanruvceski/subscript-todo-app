exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('username').notNullable(); // Required username
      table.string('email').notNullable().unique(); // Required, unique email
      table.string('password').notNullable(); // Required password (store hashed in practice)
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()); // Auto-set on creation
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()); // Auto-set on creation/update
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users'); // Drops the table on rollback
  };