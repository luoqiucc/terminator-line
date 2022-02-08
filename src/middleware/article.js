const {throwError} = require("../util/common")
const errorType = require("../constant/error-type")

const checkArticleForm = async (ctx, next) => {
    const {id} = ctx.user

    const {
        title = '',
        summary = '',
        body = '',
        priority = 10,
        is_show = 1,
        is_delete = 0,
    } = ctx.request.body

    if (!title.trim()) {
        return throwError(ctx, errorType.formEmpty)
    }

    if (title.length > 100 || summary.length > 500) {
        return throwError(ctx, errorType.textLong)
    }

    if (!Number.isFinite(priority)) {
        return throwError(ctx, errorType.paramTypeError)
    }

    if (is_show !== 0 && is_show !== 1 || is_delete !== 0 && is_delete !== 1) {
        return throwError(ctx, errorType.paramTypeError)
    }

    ctx.article = {
        user_id: id,
        title,
        summary,
        body,
        priority,
        is_show,
        is_delete
    }

    await next()
}

const checkArticleFormQuickUpdate = async (ctx, next) => {
    const {
        priority = 10,
        is_show = 1,
        is_delete = 0,
    } = ctx.request.body

    if (!Number.isFinite(priority)) {
        return throwError(ctx, errorType.paramTypeError)
    }

    if (is_show !== 0 && is_show !== 1 || is_delete !== 0 && is_delete !== 1) {
        return throwError(ctx, errorType.paramTypeError)
    }

    ctx.article = {
        priority,
        is_show,
        is_delete
    }

    await next()
}

module.exports = {
    checkArticleForm,
    checkArticleFormQuickUpdate
}
