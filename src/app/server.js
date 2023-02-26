const path = require('path')
const Koa = require('koa')
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const scanner = require('../router/scanner')
const error = require('./error')
const init = require('./init')

const server = new Koa()

server.use(cors())
server.use(koaStatic(path.join(__dirname, '..', '..', 'public')))
server.use(bodyParser())
scanner(server)
server.on('error', error);
init.createTable().then((data) => {
    console.log("建表结果：" + data)
})

module.exports = server
