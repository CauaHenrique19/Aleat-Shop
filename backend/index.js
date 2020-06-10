const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const consign = require('consign')
const db = require('./config/db')

app.db = db

io.on('connection', async (socket) => {
    console.log('Novo Cliente Conectado!')

    // try{
    //     await app.db('categorias')
    //         .count('id', { as: 'quantidade' })
    //         .whereNull('deletadoEm')                
    //         .then((categorias) => io.emit('load-categories', {categorias}))

    //     await app.db('produtos')
    //     .count('id', { as: 'quantidade' })
    //         .whereNull('deletadoEm')
    //         .then((produtos) => io.emit('load-products', {produtos}))

    // }
    // catch(msg){
    //     console.log(msg)
    // }
})
consign()
    .then('./config/middlewares.js')
    .then('./api/validacao.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app, io)

http.listen(3001, () => {
    console.log('Rodando backend...')
})
