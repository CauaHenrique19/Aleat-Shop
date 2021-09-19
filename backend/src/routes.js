const express = require('express')
const router = express.Router()

const auth = require('./middlewares/auth')
const admin = require('./middlewares/admin')

const CategoriesController = require('./controllers/CategoriesController')
const ProductsController = require('./controllers/ProductsController')
const UsersController = require('./controllers/UsersController')

const users = new UsersController()

router.post('/users', users.create)
router.post('/login', users.login)

router.get('/categories', CategoriesController.index)
router.get('/categories/:id', CategoriesController.show)
router.post('/categories', auth(admin(CategoriesController.create)))
router.put('/categories/:id', auth(admin(CategoriesController.update)))
router.delete('/categories/:id', auth(admin(CategoriesController.delete)))

router.get('/products', ProductsController.index)
router.get('/products/:id', ProductsController.show)
router.get('/products-category/:categoryId', ProductsController.byCategories)
router.post('/products',  admin(auth(ProductsController.create)))
router.put('/products/:id', admin(auth(ProductsController.update)))
router.delete('/products/:id', admin(auth(ProductsController.delete)))

module.exports = router