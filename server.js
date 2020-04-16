const express = require('express')

const postsRouter = require('./data/router/postsRouter')

const server = express();

server.use(express.json())

server.use('/posts', postsRouter)


module.exports = server


