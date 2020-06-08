
exports.up = function(knex) {
    return knex.schema.createTable('produtos', tabela => {
        tabela.increments('id').primary().notNull()
        tabela.string('nome').notNull()
        tabela.decimal('preco').notNull()
        tabela.text('descricao').notNull()
        tabela.string('imagemUrl').notNull()
        tabela.integer('categoriaId').notNull().references('id').inTable('categorias').notNull()
        tabela.string('deletadoEm')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos')
};
