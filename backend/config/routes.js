module.exports = app => {
    app.route('/produto')
        .post(app.api.produtos.salvar)
        .get(app.api.produtos.pegar)
    
    app.route('/produto/:id')
        .put(app.api.produtos.salvar)
        .get(app.api.produtos.pegarPorId)
        .delete(app.api.produtos.remover)

    app.route('/categoria')
        .post(app.api.categorias.salvar)
        .get(app.api.categorias.pegar)

    app.route('/categoria/:id')
        .put(app.api.categorias.salvar)
        .get(app.api.categorias.pegarPorId)
        .delete(app.api.categorias.remover)
}