const server = require('./app/server')
const {APP_PORT} = require('./app/config')
const string = require('./constant/string')

server.listen(APP_PORT, () => {
    console.log(string.SERVER_START + APP_PORT)
})