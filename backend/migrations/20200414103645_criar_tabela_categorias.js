
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categorias', tabela => {
        tabela.increments('id').primary().notNull()
        tabela.string('nome').notNull()
        tabela.string('deletadoEm')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categorias')
};
