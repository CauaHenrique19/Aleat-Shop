require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const formidable = require('express-formidable')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(formidable({ multiples: true }))
app.use((req, res, next) => {
    req.body = req.fields
    next()
})
app.use(require('./routes'))

app.io = io

io.on('connection', (socket) => console.log('Novo Cliente Conectado!'))
http.listen(3001, () => console.log('[Backend] Rodando...'))