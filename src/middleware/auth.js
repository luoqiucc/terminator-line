const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {PUBLIC_KEY} = require('../app/config')
const errorType = require("../constant/error-type")
const UserService = require('../service/user')
const ArticleService = require('../service/article')
const CommentService = require('../service/comment')
const AuthService = require('../service/auth')
const {
    throwError
} = require('../util/common')

const verifyLogin = async (ctx, next) => {
    const {email = '', password = ''} = ctx.request.body

    if (!email.trim() || !password.trim()) {
        return throwError(ctx, errorType.formEmpty)
    }

    const result = await UserService.verifyIdentityByEmail(email)
    const user = result[0]
    if (!user) {
        return throwError(ctx, errorType.userNotFound)
    }
    if (user.password !== md5(password)) {
        return throwError(ctx, errorType.passwordError)
    }
    ctx.user = user

    await next()
}

const verifyToken = async (ctx, next) => {
    const authorization = ctx.headers.authorization
    if (!authorization) {
        return throwError(ctx, errorType.tokenInvalid)
    }

    const token = authorization.replace('Bearer ', '')
    try {
        ctx.user = jwt.verify(token, PUBLIC_KEY, {
            algorithm: ['RS256']
        })

        await next()
    } catch (e) {
        return throwError(ctx, errorType.tokenInvalid)
    }
}

const verifyIsLogin = async (ctx, next) => {
    const authorization = ctx.headers.authorization
    if (!authorization) {
        ctx.user = null
    } else {
        const token = authorization.replace('Bearer ', '')
        try {
            ctx.user = jwt.verify(token, PUBLIC_KEY, {
                algorithm: ['RS256']
            })
        } catch (e) {
            ctx.user = null
        }
    }
    await next()
}

const verifyOwner = async (ctx, next) => {
    const {id} = ctx.user
    const [resourceKey] = Object.keys(ctx.params)
    const resourceType = resourceKey.replace('Id', '')
    const resourceId = ctx.params[resourceKey]

    const result = await AuthService.isOwner(resourceType, id, resourceId)
    if (!result) {
        return throwError(ctx, errorType.permissionDenied)
    }

    await next()
}

const verifyExist = async (ctx, next) => {
    const [resourceKey] = Object.keys(ctx.params)
    const resourceType = resourceKey.replace('Id', '')
    const resourceId = ctx.params[resourceKey]

    switch (resourceType) {
        case 'user':
            if (!await UserService.isExistById(resourceId)) {
                return throwError(ctx, errorType.objectNotFound)
            }
            break
        case 'article':
            if (!await ArticleService.isExistById(resourceId)) {
                return throwError(ctx, errorType.objectNotFound)
            }
            break
        case 'comment':
            if (!await CommentService.isExistById(resourceId)) {
                return throwError(ctx, errorType.objectNotFound)
            }
            break
        default:

    }

    await next()
}

module.exports = {
    verifyLogin,
    verifyToken,
    verifyIsLogin,
    verifyOwner,
    verifyExist
}
