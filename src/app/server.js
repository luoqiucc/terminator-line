const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const scanner = require('../router/scanner')
const error = require('./error')

const server = new Koa()

server.use(koaStatic(path.join(__dirname, '..', '..', 'public')))
server.use(bodyParser())
scanner(server)
server.on('error', error)

module.exports = server
