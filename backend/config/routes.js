module.exports = (app, io) => {
    app.route('/produtos')
        .post(app.api.produtos.salvar)
        .get(app.api.produtos.pegar)
    
    app.route('/produtos/:id')
        .put(app.api.produtos.salvar)
        .get(app.api.produtos.pegarPorId)
        .delete(app.api.produtos.remover)
    
    app.route('/produtos-por-categoria/:categoriaId')
        .get(app.api.produtos.pegarPorCategorias)
    
    app.route('/quantprodutos')
        .get(app.api.produtos.pegarQuantidades)

    app.route('/categorias')
        .post(app.api.categorias.salvar)
        .get(app.api.categorias.pegar)

    app.route('/categorias/:id')
        .put(app.api.categorias.salvar)
        .get(app.api.categorias.pegarPorId)
        .delete(app.api.categorias.remover)

    app.route('/quantcategorias')
        .get(app.api.categorias.pegarQuantidades)
}