const throwError = (ctx, errorType) => {
    ctx.app.emit('error', errorType, ctx)
}

module.exports = {
    throwError
}