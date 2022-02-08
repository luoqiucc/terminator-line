const mysql = require('../app/database')

class CommentService {
    async getArticleByCommentId(id){
        const statement = `
            SELECT 
                a.id article_id, a.user_id author_id
            FROM comment c
            LEFT JOIN article a ON a.id = c.article_id
            WHERE c.id = ?
        `
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async getCommentListByUserId(userId, page, size){
        const statement = `
            SELECT 
                c.id, c.email, c.body, c.create_time, a.id article_id, a.title article_title
            FROM comment c
            LEFT JOIN article a ON a.id = c.article_id
            WHERE a.user_id = ?
            ORDER BY c.create_time DESC
            LIMIT ?, ?
        `
        const [result] = await mysql.execute(statement, [userId, (page - 1) * size, size])
        return result
    }

    async getCommentListByArticleId(articleId) {
        const statement = `SELECT * FROM comment WHERE article_id = ? ORDER BY create_time DESC`
        const [result] = await mysql.execute(statement, [articleId])
        return result
    }

    async createComment(articleId, email, body) {
        const statement = `INSERT INTO comment (article_id, email, body) VALUES (?,?,?)`
        const [result] = await mysql.execute(statement, [articleId, email, body])
        return result
    }

    async deleteComment(id){
        const statement = `DELETE FROM comment WHERE id = ?`
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async deleteCommentByArticle(id){
        const statement = `DELETE FROM comment WHERE article_id = ?`
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async isExistById(id) {
        const statement = `SELECT id FROM comment WHERE id = ?`
        const [result] = await mysql.execute(statement, [id])
        return !!result.length;
    }
}

module.exports = new CommentService()