const fs = require('fs')
const path = require('path')

const scanner = (server) => {
    fs.readdirSync(path.join(__dirname)).forEach(file => {
        if (file === 'scanner.js') {
            return
        }
        const router = require(path.join(__dirname, file))
        server.use(router.routes())
        server.use(router.allowedMethods())
    })
}

module.exports = scanner
