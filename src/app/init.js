const mysql = require('./database')

class Init {
    async createUserTable() {
        const statement = `
            CREATE TABLE IF NOT EXISTS user (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) NOT NULL UNIQUE,
                email VARCHAR(30) NOT NULL UNIQUE,
                password VARCHAR(50) NOT NULL,
                bio VARCHAR(200),
                authority TINYINT DEFAULT 1,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `
        await mysql.execute(statement)
    }

    async createArticleTable() {
        const statement = `
            CREATE TABLE IF NOT EXISTS article (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                title VARCHAR(100) NOT NULL,
                summary VARCHAR(500),
                body TEXT,
                priority INT DEFAULT 10,
                is_show TINYINT DEFAULT 1,
                is_delete TINYINT DEFAULT 0,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `
        await mysql.execute(statement)
    }

    async createCommentTable() {
        const statement = `
            CREATE TABLE IF NOT EXISTS comment (
                id INT PRIMARY KEY AUTO_INCREMENT,
                article_id INT NOT NULL,
                email VARCHAR(30) NOT NULL,
                body VARCHAR(500) NOT NULL,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        await mysql.execute(statement)
    }
}

const createTable = async () => {
    const init = new Init()
    await init.createUserTable()
    await init.createArticleTable()
    await init.createCommentTable()
    return "success"
}

module.exports = {
    createTable
}
