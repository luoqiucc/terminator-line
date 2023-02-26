const error = (errorType, ctx) => {
    let status

    switch (errorType.error_code) {
        case '1001':
            status = 403
            break
        case '1002':
            status = 401
            break
        case '1003':
            status = 404
            break
        case '1004':
            status = 409
            break
        case '1005':
            status = 412
            break
        case '1101':
            status = 500
            break
        default:
            status = 500
    }

    ctx.status = status
    ctx.body = errorType
}

module.exports = error
