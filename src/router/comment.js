const Router = require('koa-router')
const {
    list,
    create,
    remove
} = require('../controller/comment')
const {
    verifyToken,
    verifyIsLogin,
    verifyExist
} = require('../middleware/auth')
const {
    checkCommentForm,
    verifyPermissionAsDelete
} = require('../middleware/comment')

const article = new Router()

article.get('/comments', verifyIsLogin, list)
article.post('/comment', checkCommentForm, create)
article.delete('/comment/:commentId', verifyExist, verifyToken, verifyPermissionAsDelete, remove)

module.exports = article
