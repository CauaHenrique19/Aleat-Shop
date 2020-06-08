var express = require('express');
var assert = require('assert')
var restify = require('restify-clients')
var router = express.Router();

var client = restify.createJsonClient({
  url: 'http://localhost:3001'
})

router.get('/', function(req, res, next) {

  client.get('/produto', function(err, request, response, obj) {
    assert.ifError(err)
    obj.sort((a, b) => {
      if(a.id > b.id){
        return 1
      }
      if(a.id < b.id){
        return - 1
      }
      return 0
    })
    res.json(obj)
  })

});

router.get('/:id', function(req, res, next){
  client.get('/produto', function(err, request, response, obj) {
    assert.ifError(err)
    obj.sort((a, b) => {
      if(a.id > b.id){
        return 1
      }
      if(a.id < b.id){
        return - 1
      }
      return 0
    })
    obj.forEach((obj, indice) => {
        if(req.params.id == obj['id']){
          res.json(obj)
        }
    })
  })
})

router.post('/', function(req, res, next) {
  client.post('/produto', req.body ,function(err, request, response, obj){
    assert.ifError(err)
    res.send(req.body)
  })
})

router.put('/:id', function(req, res, next){
  client.put(`/produto/${req.params.id}`, req.body, function(err, request, response, obj){
    assert.ifError(err)

    res.send(req.body)
  })
})

router.delete('/:id', function(req, res, next){
  client.del(`/produto/${req.body.id}`, function(err, request, response, obj){
    assert.ifError(err)
    
    res.json(obj)
  })
})


module.exports = router;
