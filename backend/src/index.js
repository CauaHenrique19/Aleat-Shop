const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)

io.on('connection', (socket) => console.log('Novo Cliente Conectado!'))
http.listen(3001, () => console.log('Rodando backend...'))