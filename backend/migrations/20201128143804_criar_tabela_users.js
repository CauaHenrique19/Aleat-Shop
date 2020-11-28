exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary().notNull()
    table.string('email').notNull()
    table.string('password').notNull()
    table.string('name').notNull()
    table.boolean('admin').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
