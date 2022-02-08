const mysql = require('../app/database')

class Article {
    async getArticleById(id) {
        const statement = `
            SELECT 
                a.id, a.title, a.summary, a.body, a.priority, a.is_show, a.is_delete, a.create_time, a.update_time,
                json_object('id', u.id, 'username', u.username) author
            FROM article a
            LEFT JOIN user u ON u.id = a.user_id
            WHERE a.is_delete = 0 AND a.is_show = 1 AND a.id = ?
        `
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async getArticleList(page, size) {
        const statement = `
            SELECT
                a.id, a.title, a.summary, a.priority, a.is_show, a.is_delete, a.create_time, a.update_time,
                json_object('id', u.id, 'username', u.username) author
            FROM article a
            LEFT JOIN user u ON u.id = a.user_id
            WHERE a.is_delete = 0 AND a.is_show = 1
            ORDER BY a.priority
            LIMIT ?, ?
        `
        const [result] = await mysql.execute(statement, [(page - 1) * size, size])
        return result
    }

    async getArticleListByUser(id, page, size) {
        const statement = `
            SELECT
                a.id, a.title, a.summary, a.priority, a.is_show, a.is_delete, a.create_time, a.update_time,
                json_object('id', u.id, 'username', u.username) author
            FROM article a
            LEFT JOIN user u ON u.id = a.user_id
            WHERE a.is_delete = 0 AND a.is_show = 1 AND a.user_id = ?
            ORDER BY a.priority
            LIMIT ?, ?
        `
        const [result] = await mysql.execute(statement, [id, (page - 1) * size, size])
        return result
    }

    async getPrivateArticleById(id) {
        const statement = `
            SELECT 
                a.id, a.title, a.summary, a.body, a.priority, a.is_show, a.is_delete, a.create_time, a.update_time,
                json_object('id', u.id, 'username', u.username) author
            FROM article a
            LEFT JOIN user u ON u.id = a.user_id
            WHERE a.id = ?
        `
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async getPrivateArticleListByUser(id, page, size) {
        const statement = `
            SELECT 
                a.id, a.title, a.summary, a.priority, a.is_show, a.is_delete, a.create_time, a.update_time,
                json_object('id', u.id, 'username', u.username) author
            FROM article a
            LEFT JOIN user u ON u.id = a.user_id
            WHERE a.is_delete = 0 AND a.user_id = ?
            ORDER BY a.priority
            LIMIT ?, ?
        `
        const [result] = await mysql.execute(statement, [id, (page - 1) * size, size])
        return result
    }

    async getRecycleArticleList(id, page, size) {
        const statement = `
            SELECT 
                a.id, a.title, a.summary, a.priority, a.is_show, a.is_delete, a.create_time, a.update_time,
                json_object('id', u.id, 'username', u.username) author
            FROM article a
            LEFT JOIN user u ON u.id = a.user_id
            WHERE a.is_delete = 1 and a.user_id = ?
            ORDER BY a.priority
            LIMIT ?, ?
        `
        const [result] = await mysql.execute(statement, [id, (page - 1) * size, size])
        return result
    }

    async createArticle(user_id, title, summary, body, priority, is_show, is_delete) {
        const statement = `INSERT INTO article (user_id, title, summary, body, priority, is_show, is_delete) VALUES (?,?,?,?,?,?,?)`
        const [result] = await mysql.execute(statement, [user_id, title, summary, body, priority, is_show, is_delete])
        return result
    }

    async updateArticle(id, title, summary, body, priority, is_show, is_delete) {
        const statement = `UPDATE article SET title=?, summary=?, body=?, priority=?, is_show=?, is_delete=? WHERE id=?`
        const [result] = await mysql.execute(statement, [title, summary, body, priority, is_show, is_delete, id])
        return result
    }

    async quickUpdate(id, priority, is_show, is_delete) {
        const statement = `UPDATE article SET priority=?, is_show=?, is_delete=? WHERE id=?`
        const [result] = await mysql.execute(statement, [priority, is_show, is_delete, id])
        return result
    }

    async deleteArticle(id) {
        const statement = `DELETE FROM article WHERE id = ? AND is_delete = 1`
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async isExistById(id) {
        const statement = `SELECT id FROM article WHERE id = ?`
        const [result] = await mysql.execute(statement, [id])
        return !!result.length;
    }
}

module.exports = new Article()
