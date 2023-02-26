const mysql = require('../app/database')

class User {
    async getUserByUsername(username) {
        const statement = `SELECT id, username, email, bio, authority, create_time, update_time FROM user WHERE username = ?`
        const [result] = await mysql.execute(statement, [username])
        return result
    }

    async getUserById(id) {
        const statement = `SELECT id, username, email, bio, authority, create_time, update_time FROM user WHERE id = ?`
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async getUserByAuthority(authority) {
        const statement = `SELECT id, username, email, bio, authority, create_time, update_time FROM user WHERE authority = ?`
        const [result] = await mysql.execute(statement, [authority])
        return result
    }

    async getUserByUsernameOrEmail(username, email) {
        const statement = `SELECT id, username, email, bio, authority, create_time, update_time FROM user WHERE username = ? OR email = ?`
        const [result] = await mysql.execute(statement, [username, email])
        return result
    }

    async getUserList(page, size) {
        const statement = `SELECT id, username, bio, authority FROM user LIMIT ?, ?`
        const [result] = await mysql.execute(statement, [(page - 1) * size + '', size + ''])
        return result
    }

    async createUser(username, email, password, bio, authority) {
        const statement = `INSERT INTO user (username, email, password, bio, authority) VALUES (?, ?, ?, ?, ?)`
        const [result] = await mysql.execute(statement, [username, email, password, bio, authority])
        return result
    }

    async updateUser(id, username, bio) {
        const statement = `UPDATE user SET username = ?, bio = ? WHERE id = ?`
        const [result] = await mysql.execute(statement, [username, bio, id])
        return result
    }

    async deleteUser(id) {
        const statement = `DELETE FROM user WHERE id = ?`
        const [result] = await mysql.execute(statement, [id])
        return result
    }

    async verifyIdentityByEmail(email) {
        const statement = `SELECT * FROM user WHERE email = ?`
        const [result] = await mysql.execute(statement, [email])
        return result
    }

    async isExistById(id) {
        const statement = `SELECT id FROM user WHERE id = ?`
        const [result] = await mysql.execute(statement, [id])
        return !!result.length;
    }
}

module.exports = new User()
