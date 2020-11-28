const express = require('express')
const router = express.Router()

const auth = require('./middlewares/auth')
const admin = require('./middlewares/admin')

const CategoriesController = require('./controllers/CategoriesController')
const ProductsController = require('./controllers/ProductsController')
const UsersController = require('./controllers/UsersController')

const categories = new CategoriesController()
const products = new ProductsController()
const users = new UsersController()

router.post('/users', users.create)
router.post('/login', users.login)

router.get('/categorias', admin(categories.index))
router.post('/categorias', auth(categories.create))
router.put('/categorias/:id', auth(categories.update))
router.get('/categorias/:id', categories.show)
router.delete('/categorias/:id', auth(categories.delete))

router.get('/produtos', products.index)
router.post('/produtos', auth(products.salvar))
router.put('/produtos/:id', auth(products.salvar))
router.get('/produtos/:id', products.show)
router.delete('/produtos/:id', auth(products.remover))
router.get('/produtos-categoria/:categoriaId', products.indexByCategories)

module.exports = router