module.exports = {
    // 400
    formEmpty: {
        error_code: '1001',
        error_msg: '表单有必填项为空'
    },
    emailFormatError: {
        error_code: '1001',
        error_msg: '邮箱错误，请检查邮箱是否存在或格式是否正确'
    },
    paramTypeError: {
        error_code: '1001',
        error_msg: '参数类型错误'
    },
    textLong: {
        error_code: '1001',
        error_msg: '文本过长'
    },
    passwordError: {
        error_code: '1001',
        error_msg: '密码无效'
    },
    deleteError: {
        error_code: '1001',
        error_msg: '删除无法完成，因为不允许直接删除非回收站内的项目'
    },

    // 401
    tokenInvalid: {
        error_code: '1002',
        error_msg: 'token无效'
    },

    // 404
    userNotFound: {
        error_code: '1003',
        error_msg: '用户不存在'
    },
    objectNotFound: {
        error_code: '1003',
        error_msg: '请求的资源不存在'
    },

    // 409
    emailOrNameExist: {
        error_code: '1004',
        error_msg: '用户名或邮箱已存在'
    },

    // 412
    permissionDenied: {
        error_code: '1005',
        error_msg: '权限错误'
    },

    // 500
    unknownError: {
        error_code: '1101',
        error_msg: '未知错误'
    }
}