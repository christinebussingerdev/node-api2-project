const express = require('express')
const cors = require('CORS')

const postsRouter = require('./data/router/postsRouter')

const server = express();

server.use(express.json())
server.use(cors())

server.use('/posts', postsRouter)


module.exports = server


