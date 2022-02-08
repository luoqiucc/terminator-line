const Router = require('koa-router')
const {
    detail,
    list,
    create,
    update,
    remove
} = require('../controller/user')
const {
    verifyToken,
    verifyExist,
} = require('../middleware/auth')
const {
    verifyAsCreateUser,
    verifyAsDeleteUser,
    checkFormAsCreateUser,
    checkFormAsUpdateUser
} = require('../middleware/user')

const user = new Router()

user.get('/users', list)
user.get('/user/:userId', verifyExist, detail)
user.post('/user', verifyAsCreateUser, checkFormAsCreateUser, create)
user.put('/user/:userId', verifyToken, verifyExist, checkFormAsUpdateUser, update)
user.delete('/user/:userId', verifyToken, verifyExist, verifyAsDeleteUser, remove)

module.exports = user
