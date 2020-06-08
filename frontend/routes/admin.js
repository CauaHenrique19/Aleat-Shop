var express = require('express');
var assert = require('assert')
var restify = require('restify-clients')
var router = express.Router();

var client = restify.createJsonClient({
    url: 'http://localhost:3001'
})

router.get('/', function(req, res, next) {
    res.render('admin/index')
})

router.get('/produto', function(req, res, next){
    res.render('admin/produtos')
})

module.exports = router