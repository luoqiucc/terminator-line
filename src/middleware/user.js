const UserService = require("../service/user")
const {throwError} = require("../util/common")
const errorType = require("../constant/error-type")
const jwt = require("jsonwebtoken")
const {PUBLIC_KEY} = require("../app/config")
const md5 = require("md5")

const verifyAsCreateUser = async (ctx, next) => {
    const result = await UserService.getUserByAuthority(0)
    if (result.length) {
        const authorization = ctx.headers.authorization
        if (!authorization) {
            return throwError(ctx, errorType.tokenInvalid)
        }
        const token = authorization.replace('Bearer ', '')
        try {
            ctx.user = jwt.verify(token, PUBLIC_KEY, {
                algorithm: ['RS256']
            })

            if (ctx.user.authority !== 0) {
                return throwError(ctx, errorType.permissionDenied)
            }

            ctx.authority = 1

            await next()
        } catch (e) {
            return throwError(ctx, errorType.tokenInvalid)
        }
    } else {
        ctx.authority = 0

        await next()
    }
}

const verifyAsDeleteUser = async (ctx, next) => {
    const {userId} = ctx.params
    const result = await UserService.getUserById(userId)

    if (result[0].authority === 0 || ctx.user.authority !== 0) {
        return throwError(ctx, errorType.permissionDenied)
    }

    await next()
}

const checkFormAsCreateUser = async (ctx, next) => {
    const regular = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/
    const {username = '', email = '', password = '', bio = ''} = ctx.request.body

    if (!username.trim() || !email.trim() || !password.trim()) {
        return throwError(ctx, errorType.formEmpty)
    }
    if (username.length > 30 || password.length > 50 || email.length > 30 || bio.length > 200) {
        return throwError(ctx, errorType.textLong)
    }
    if (!email.match(regular)) {
        return throwError(ctx, errorType.emailFormatError)
    }

    const result = await UserService.getUserByUsernameOrEmail(username, email)
    if (result.length) {
        return throwError(ctx,errorType.emailOrNameExist)
    }

    ctx.userCreateForm = {
        username,
        email,
        password: md5(password),
        bio,
        authority: ctx.authority
    }

    await next()
}

const checkFormAsUpdateUser = async (ctx, next) => {
    const {username = '', bio = ''} = ctx.request.body
    const {id} = ctx.user
    const {userId} = ctx.params

    if (String(id) !== String(userId)) {
        return throwError(ctx, errorType.permissionDenied)
    }

    if (!username.trim()) {
        return throwError(ctx, errorType.formEmpty)
    }
    if (username.length > 30 || bio.length > 200) {
        return throwError(ctx, errorType.textLong)
    }

    const result = await UserService.getUserByUsername(username)
    if (result.length){
        return throwError(ctx, errorType.emailOrNameExist)
    }

    ctx.userUpdateForm = {
        id,
        username,
        bio,
    }

    await next()
}

module.exports = {
    verifyAsCreateUser,
    verifyAsDeleteUser,
    checkFormAsCreateUser,
    checkFormAsUpdateUser
}
