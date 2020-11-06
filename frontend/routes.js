const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
    res.render('home')
})
Router.get('/produto', (req, res) => {
    res.render('produtoId')
})
Router.get('/admin/categorias', (req, res) => {
    res.render('admin/categorias')
})
Router.get('/admin/produtos', (req, res) => {
    res.render('admin/produtos')
})
Router.get('/carrinho', (req, res) => {
    res.render('carrinho')
})

module.exports = Router;