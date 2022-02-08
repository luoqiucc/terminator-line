const Router = require('koa-router')
const {
    list,
    userArticleList,
    recycleList,
    detail,
    create,
    update,
    quickUpdate,
    remove
} = require('../controller/article')
const {
    verifyToken,
    verifyIsLogin,
    verifyOwner,
    verifyExist
} = require('../middleware/auth')
const {
    checkArticleForm,
    checkArticleFormQuickUpdate
} = require('../middleware/article')

const article = new Router()

article.get('/articles', list)
article.get('/article/recycles', verifyToken, recycleList)
article.get('/article/:articleId', verifyExist, verifyIsLogin, detail)
article.get('/user/:userId/articles', verifyExist, verifyIsLogin, userArticleList)
article.post('/article', verifyToken, checkArticleForm, create)
article.put('/article/:articleId', verifyToken, verifyExist, verifyOwner, checkArticleForm, update)
article.put('/article/:articleId/quick', verifyToken, verifyExist, verifyOwner, checkArticleFormQuickUpdate, quickUpdate)
article.delete('/article/:articleId', verifyToken, verifyExist, verifyOwner, remove)

module.exports = article
