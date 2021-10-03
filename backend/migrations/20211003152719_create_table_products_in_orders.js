
exports.up = function(knex) {
  return knex.schema.createTable('products_in_orders', table => {
    table.increments('id').primary().notNull()
    table.integer('order_id').references('id').inTable('orders').notNull()
    table.integer('product_id').references('id').inTable('products').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('products_in_orders')
};
