const jwt = require("jsonwebtoken")
const {PRIVATE_KEY} = require("../app/config")

class Passport {
    async login(ctx, next) {
        const {id, username, authority} = ctx.user
        delete ctx.user['password']
        ctx.user.token = jwt.sign({id, username, authority}, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24 * 5,
            algorithm: 'RS256'
        })
        ctx.body = ctx.user
    }
}

module.exports = new Passport()
