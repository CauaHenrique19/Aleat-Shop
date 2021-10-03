
exports.up = function(knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('id').primary().notNull()
    table.float('total').notNull()
    table.integer('user_id').references('id').inTable('users').notNull()
    table.timestamp('created_at').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders')
};
