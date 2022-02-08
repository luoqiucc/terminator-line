const ArticleService = require('../service/article')
const CommentService = require('../service/comment')
const {throwError} = require("../util/common")
const errorType = require("../constant/error-type")

const checkCommentForm = async (ctx, next) => {
    const {
        articleId = '',
        email = '',
        body = ''
    } = ctx.request.body

    if (!articleId.trim() || !email.trim() || !body.trim()) {
        return throwError(ctx, errorType.formEmpty)
    }

    if (email.length > 30 || body.length > 500) {
        return throwError(ctx, errorType.textLong)
    }

    const result = await ArticleService.getPrivateArticleById(articleId)
    if (!result.length) {
        return throwError(ctx, errorType.objectNotFound)
    }

    if (result[0].is_show === 0 || result[0].is_delete === 1) {
        return throwError(ctx, errorType.permissionDenied)
    }

    ctx.comment = {
        articleId,
        email,
        body
    }

    await next()
}

const verifyPermissionAsDelete = async (ctx, next) => {
    const {id} = ctx.user
    const {commentId = 0} = ctx.params

    const result = await CommentService.getArticleByCommentId(commentId)
    const {author_id} = result[0]
    if (id !== author_id) {
        return throwError(ctx, errorType.permissionDenied)
    }

    await next()
}

module.exports = {
    checkCommentForm,
    verifyPermissionAsDelete
}
