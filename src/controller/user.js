const UserService = require('../service/user')

class User {
    async detail(ctx, next) {
        const {userId} = ctx.params
        const result = await UserService.getUserById(userId)
        ctx.body = result[0]
    }

    async list(ctx, next) {
        const {page = '1', size = '8'} = ctx.query
        ctx.body = await UserService.getUserList(page, size)
    }

    async create(ctx, next) {
        const {username, email, password, bio, authority} = ctx.userCreateForm
        const result = await UserService.createUser(username, email, password, bio, authority)
        const id = result.insertId

        ctx.status = 201
        ctx.body = {
            id,
            username,
            email,
            bio,
            authority,
        }
    }

    async update(ctx, next) {
        const {id, username, bio} = ctx.userUpdateForm
        await UserService.updateUser(id, username, bio)

        ctx.status = 201
        ctx.body = {
            id,
            username,
            bio
        }
    }

    async remove(ctx, next) {
        const {userId} = ctx.params
        await UserService.deleteUser(userId)

        ctx.status = 204
        ctx.body = {}
    }
}

module.exports = new User()
