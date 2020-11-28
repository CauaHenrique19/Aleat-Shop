const express = require('express')
const router = express.Router()

const CategoriesController = require('./controllers/CategoriesController')
const ProductsController = require('./controllers/ProductsController')
const UsersController = require('./controllers/UsersController')

const categories = new CategoriesController()
const products = new ProductsController()
const users = new ProductsController()

router.get('/categorias', categories.index)
router.post('/categorias', categories.create)
router.put('/categorias/:id', categories.update)
router.get('/categorias/:id', categories.show)
router.delete('/categorias/:id', categories.delete)

router.get('/produtos', products.index)
router.post('/produtos', products.salvar)
router.put('/produtos/:id', products.salvar)
router.get('/produtos/:id', products.show)
router.delete('/produtos/:id', products.remover)
router.get('/produtos-categoria/:categoriaId', products.indexByCategories)

module.exports = router

/*
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
*/