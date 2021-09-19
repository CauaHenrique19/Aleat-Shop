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

router.get('/categories', categories.index)
router.get('/categories/:id', categories.show)
router.post('/categories', auth(admin(categories.create)))
router.put('/categories/:id', auth(admin(categories.update)))
router.delete('/categories/:id', auth(admin(categories.delete)))

router.get('/products', products.index)
router.post('/products', auth(products.salvar))

router.put('/products/:id', auth(products.update))
router.get('/products/:id', products.show)
router.delete('/products/:id', auth(products.remover))

router.get('/products-category/:categoryId', products.indexByCategories)

module.exports = router