exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary().notNull()
        table.string('name').notNull()
        table.decimal('price').notNull()
        table.text('description').notNull()
        table.string('key_image').notNull()
        table.string('image_url').notNull()
        table.integer('category_id').notNull().references('id').inTable('categories').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};