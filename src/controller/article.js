const ArticleService = require('../service/article')
const CommentService = require('../service/comment')
const {throwError} = require("../util/common")
const errorType = require('../constant/error-type')

class Article {
    async list(ctx, next) {
        const {page = '1', size = '8'} = ctx.query
        ctx.body = await ArticleService.getArticleList(page, size)
    }

    async userArticleList(ctx, next) {
        const loginUser = ctx.user
        const {page = '1', size = '8'} = ctx.query
        const {userId} = ctx.params

        let result
        if (loginUser && String(loginUser['id']) === userId) {
            result = await ArticleService.getPrivateArticleListByUser(userId, page, size)
        } else {
            result = await ArticleService.getArticleListByUser(userId, page, size)
        }

        ctx.body = result
    }

    async recycleList(ctx, next) {
        const {id} = ctx.user
        const {page = '1', size = '8'} = ctx.query
        ctx.body = await ArticleService.getRecycleArticleList(id, page, size)
    }

    async detail(ctx, next) {
        const loginUser = ctx.user
        const {articleId} = ctx.params

        const result = await ArticleService.getPrivateArticleById(articleId)
        const {is_show, is_delete, author} = result[0]
        if (is_show === 0 || is_delete === 1) {
            if (!loginUser) {
                return throwError(ctx, errorType.permissionDenied)
            }
            if (author['id'] !== loginUser['id']) {
                return throwError(ctx, errorType.permissionDenied)
            }
        }

        ctx.body = result[0]
    }

    async create(ctx, next) {
        const {
            user_id,
            title,
            summary,
            body,
            priority,
            is_show,
            is_delete
        } = ctx.article

        const result = await ArticleService.createArticle(user_id, title, summary, body, priority, is_show, is_delete)

        ctx.status = 201
        ctx.body = {
            id: result.insertId,
            user_id,
            title,
            summary,
            body,
            priority,
            is_show,
            is_delete
        }
    }

    async update(ctx, next) {
        const {articleId} = ctx.params
        const {
            title,
            summary,
            body,
            priority,
            is_show,
            is_delete
        } = ctx.article

        await ArticleService.updateArticle(articleId, title, summary, body, priority, is_show, is_delete)

        ctx.status = 201
        ctx.body = {
            id: articleId,
            title,
            summary,
            body,
            priority,
            is_show,
            is_delete
        }
    }

    async quickUpdate(ctx, next) {
        const {articleId} = ctx.params
        const {
            priority,
            is_show,
            is_delete,
        } = ctx.article

        await ArticleService.quickUpdate(articleId, priority, is_show, is_delete)

        ctx.status = 201
        ctx.body = {
            id: articleId,
            priority,
            is_show,
            is_delete,
        }
    }

    async remove(ctx, next) {
        const {articleId} = ctx.params
        const result = await ArticleService.deleteArticle(articleId)

        if (result.affectedRows === 0) {
            return throwError(ctx, errorType.deleteError)
        }

        await CommentService.deleteCommentByArticle(articleId)

        ctx.status = 204
        ctx.body = {}
    }
}

module.exports = new Article()
