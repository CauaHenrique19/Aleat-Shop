
exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary().notNull()
        table.string('name').notNull()
        table.string('color').notNull()
        table.string('icon').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories')
};
