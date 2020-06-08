var express = require('express');
var assert = require('assert')
var restify = require('restify-clients')
var router = express.Router();

var client = restify.createJsonClient({
    url: 'http://localhost:3001'
})

router.get('/', function(req, res, next) {
    res.render('produtoId')
})

module.exports = router