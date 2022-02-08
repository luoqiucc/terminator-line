const mysql = require('mysql2')
const config = require('./config')
const String = require('../constant/string')

const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
})

connections.getConnection((error, connection) => {
    if (error) throw new Error(String.MYSQL_CONNECT_FAIL)

    connection.connect((error) => {
        console.log(String.MYSQL_CONNECT_SUCCESS)
    })
})

module.exports = connections.promise()
