const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({path: path.join(__dirname, '..', '..', '.env.development')})

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'key', 'private.key'), 'utf-8')
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'key', 'public.key'), 'utf-8')

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
