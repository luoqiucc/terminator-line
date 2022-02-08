const mysql = require('../app/database')

class AuthService {
    async isOwner(resource, userId, id) {
        const statement = `SELECT id FROM ${resource} WHERE id = ? AND user_id = ?`
        const [result] = await mysql.execute(statement, [id, userId])
        return result.length !== 0
    }
}

module.exports = new AuthService()