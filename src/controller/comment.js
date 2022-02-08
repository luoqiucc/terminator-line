const CommentService = require('../service/comment')
const ArticleService = require('../service/article')
const {throwError} = require("../util/common")
const errorType = require('../constant/error-type')

class Comment {
    async list(ctx, next) {
        const loginUser = ctx.user
        const {articleId, page = 1, size = 20} = ctx.request.query

        if (!articleId) {
            if (loginUser) {
                return ctx.body = await CommentService.getCommentListByUserId(loginUser['id'], page, size)
            }
            return throwError(ctx, errorType.permissionDenied)
        }

        const article = await ArticleService.getPrivateArticleById(articleId)
        if (!article.length) {
            return throwError(ctx, errorType.objectNotFound)
        }

        const {is_show, is_delete, author} = article[0]
        if (is_show === 0 || is_delete === 1) {
            if (!loginUser) {
                return throwError(ctx, errorType.permissionDenied)
            }
            if (author['id'] !== loginUser['id']) {
                return throwError(ctx, errorType.permissionDenied)
            }
        }

        ctx.body = await CommentService.getCommentListByArticleId(articleId)
    }

    async create(ctx, next) {
        const {
            articleId,
            email,
            body
        } = ctx.comment

        const result = await CommentService.createComment(articleId, email, body)

        ctx.status = 201
        ctx.body = {
            id: result.insertId,
            articleId,
            email
        }
    }

    async remove(ctx, next) {
        const {commentId = 0} = ctx.params
        await CommentService.deleteComment(commentId)

        ctx.status = 204
        ctx.body = {}
    }
}

module.exports = new Comment()
