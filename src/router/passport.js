const Router = require('koa-router')
const {
    login
} = require('../controller/passport')
const {
    verifyLogin
} = require('../middleware/auth')

const passport = new Router()

passport.post('/login', verifyLogin, login)

module.exports = passport
