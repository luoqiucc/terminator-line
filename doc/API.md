## 接口文档
## 登录

接口地址: **/login**

请求方式: **POST**

请求头:无

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| password | 登录密码 | 是 | 不为空 | |
| email | 登录邮箱 | 是 | 不为空 | |

```
// 请求示例

URL: POST /login

// 参数
{
    "email": "TERMINATOR-LINE@tl.com"
    "password": "17171017",
}
```

返回值:

**HTTP状态码: 200**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 用户id | |
| username | 用户名  | |
| email | 用户邮箱  | |
| bio | 签名/个人介绍 | |
| authority | 权限标识 | |
| create_time | 创建时间  | |
| update_time | 上次修改时间 | |
| token | 登录凭证 | |

```
// 示例
{
    "id": 1,
    "username": "TERMINATOR-LINE",
    "email": "TERMINATOR-LINE@tl.com",
    "bio": "hello world",
    "authority": 0,
    "create_time": "2021-12-29T08:58:33.000Z",
    "update_time": "2022-01-26T07:27:34.000Z",
    "token": "eyJhbGciOiJSUzI1..."
}
```

## 用户管理

### 创建新用户
接口地址: **/user**

请求方式: **POST**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | 因为系统未开放用户注册所以这个比较特殊，如果你是第一次使用也就是说数据库中还没有用户，那么是不需要添加这个请求头的，否则只有超级用户才可以添加新的用户 |

```
// 示例
// token值需要添加 Bearer 前缀，前缀与token值之间有一个空格

Authorization: Bearer eyJhbGciOiJSUzI1...
```

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| username | 用户名 | 是 | 长度小于30个字符且不能重复 | |
| password | 登录密码 | 是 | 长度小于50个字符 | |
| email | 登录邮箱 | 是 | 长度小于30个字符且不能重复 | |
| bio | 签名/个人介绍 | 否 | 长度小于200个字符 | |

```
// 请求示例

URL: POST /user

// 参数
{
    "username": "TERMINATOR-LINE",
    "password": "17171017",
    "email": "TERMINATOR-LINE@tl.com",
    "bio": "TERMINATOR-LINE"
}
```

返回值:

**HTTP状态码: 201**
| 参数 | 说明 | 备注 |
|------|-----|------|
| username | 用户名  | |
| password | 登录密码  ||
| email | 登录邮箱 | |
| bio | 签名/个人介绍 | |
|authority | 权限标识 | 0代表超级用户，1为普通用户，这个值系统自动添加 |

```
// 示例

{
    "id": 1,
    "username": "TERMINATOR-LINE",
    "email": "TERMINATOR-LINE@tl.com",
    "bio": "TERMINATOR-LINE",
    "authority": 0
}
```

### 更新用户信息
用户信息只能对 **用户名，签名/个人介绍** 进行更改

接口地址: **/user/:userId**

请求方式: **PUT**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | |

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| username | 用户名 | 是 | 长度小于30个字符且不能重复 | |
| bio | 签名/个人介绍 | 否 | 长度小于200个字符 | 如果不传这个参数默认bio为空 |

```
// 请求示例
// 更新id为6的用户信息

URL: PUT /user/6

// 参数
{
    "username": "TERMINATOR-LINE",
    "bio": "TERMINATOR-LINE"
}
```

返回值:

**HTTP状态码: 201**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 用户id | |
| username | 用户名  | |
| bio | 签名/个人介绍 | |

```
// 示例

{
    "id": 6,
    "username": "TL",
    "bio": "hello world"
}
```

### 删除用户
只有超级用户拥有删除用户的权限

接口地址: **/user/:userId**

请求方式: **DELETE**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | |

参数详情: 
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| userId | 要删除的用户id | 是 | 无 | |

```
// 请求示例
// 删除id为6的用户

URL: DELETE /user/6
```

返回值:

**HTTP状态码: 204**

```
// 示例
// 返回空文档
```

### 用户列表
接口地址: **/users**

请求方式: **GET**

请求头:无

参数详情: 
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| page | 页码 | 否 | 无 | 如果不传这个参数默认值为1 |
| size | 每页显示的数量 | 否 | 无 | 如果不传这个参数默认值为8 |
```
// 请求示例
// 请求第一页且每页显示10条数据

URL: GET /users?page=1&size=10
```

返回值:

**HTTP状态码: 200**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 用户id | |
| username | 用户名  | |
| bio | 签名/个人介绍 | |
| authority | 权限标识 | |

```
// 示例
[
    {
        "id": 1,
        "username": "111",
        "bio": "hello world",
        "authority": 0
    },
    {
        "id": 2,
        "username": "222",
        "bio": "",
        "authority": 1
    },
    {
        "id": 3,
        "username": "333",
        "bio": "",
        "authority": 1
    },
    {
        "id": 4,
        "username": "444",
        "bio": "",
        "authority": 1
    }
]
```

### 用户详情
接口地址: **/user/:userId**

请求方式: **GET**

请求头:无

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| userId | 要查询的用户id | 是 | 无 | |

```
// 请求示例
// 查询id为1的用户详情

URL: GET /user/1
```

返回值:

**HTTP状态码: 200**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 用户id | |
| username | 用户名  | |
| email | 用户邮箱  | |
| bio | 签名/个人介绍 | |
| authority | 权限标识 | |
| create_time | 创建时间  | |
| update_time | 上次修改时间 | |

```
// 示例
{
    "id": 1,
    "username": "TERMINATOR-LINE",
    "email": "TERMINATOR-LINE@tl.com",
    "bio": "hello world",
    "authority": 0,
    "create_time": "2021-12-29T08:58:33.000Z",
    "update_time": "2022-01-26T07:27:34.000Z"
}
```

## 文章管理

### 创建新文章
接口地址: **/article**

请求方式: **POST**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | |

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| title | 文章标题 | 是 | 长度小于100个字符 | |
| summary | 摘要 | 否 | 长度小于500个字符 | |
| body | 正文 | 否 | 没啥限制，数据库字段选的TEXT，硬存就完了 | |
| priority | 优先级，控制是否置顶 | 否 | 必须是数字 | 数字越小优先级越高，默认为10 |
| is_show | 可见性 | 否 | 必须是数字且为0或1 | 1代表可见，0代表不可见，默认1 |
| is_delete | 是否在回收站中 | 否 | 必须是数字且为0或1 | 1代表在回收站中，0代表不在，默认0 |

```
// 请求示例

URL: POST /article

// 参数
{
    "title": "TERMINATOR-LINE",
    "summary": "TERMINATOR-LINE",
    "body": "TERMINATOR-LINE",
    "priority": 0
    "is_show": 1
    "is_delete": 0
}
```

返回值:

**HTTP状态码: 201**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 文章id | |
| user_id | 作者id  | |
| title | 标题  | |
| summary | 摘要 | |
| body | 正文 | |
| priority | 优先级 | |
| is_show | 可见性  | |
| is_delete | 是否在回收站中 | |

```
// 示例
{
    "id": 1,
    "user_id": 1,
    "title": "TERMINATOR-LINE",
    "summary": "TERMINATOR-LINE",
    "body": "TERMINATOR-LINE"
    "priority": 0,
    "is_show": 1,
    "is_delete": 0
}
```

### 更新文章
接口地址: **/article/:articleId**

请求方式: **PUT**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | |

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| title | 文章标题 | 是 | 长度小于100个字符 | |
| summary | 摘要 | 否 | 长度小于500个字符 | |
| body | 正文 | 否 | 没啥限制，数据库字段选的TEXT，硬存就完了 | |
| priority | 优先级，控制是否置顶 | 否 | 必须是数字 | 数字越小优先级越高，默认为10 |
| is_show | 可见性 | 否 | 必须是数字且为0或1 | 1代表可见，0代表不可见，默认1 |
| is_delete | 是否在回收站中 | 否 | 必须是数字且为0或1 | 1代表在回收站中，0代表不在，默认0 |

```
// 请求示例
// 更新id为1的文章内容

URL: PUT /article/1

// 参数
{
    "title": "TERMINATOR-LINE",
    "summary": "TERMINATOR-LINE",
    "body": "Hello World",
    "priority": 0
    "is_show": 1
    "is_delete": 0
}
```

返回值:

**HTTP状态码: 201**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 文章id | |
| user_id | 作者id  | |
| title | 标题  | |
| summary | 摘要 | |
| body | 正文 | |
| priority | 优先级 | |
| is_show | 可见性  | |
| is_delete | 是否在回收站中 | |

```
// 示例
{
    "id": 1,
    "user_id": 1,
    "title": "TERMINATOR-LINE",
    "summary": "TERMINATOR-LINE",
    "body": "Hello World"
    "priority": 0,
    "is_show": 1,
    "is_delete": 0
}
```

### 快速更新
可快速更改是否置顶，可见性和是否在回收站中，无需额外参数

接口地址: **/article/:articleId/quick**

请求方式: **PUT**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | |

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| priority | 优先级，控制是否置顶 | 否 | 必须是数字 | 数字越小优先级越高，默认为10 |
| is_show | 可见性 | 否 | 必须是数字且为0或1 | 1代表可见，0代表不可见，默认1 |
| is_delete | 是否在回收站中 | 否 | 必须是数字且为0或1 | 1代表在回收站中，0代表不在，默认0 |

```
// 请求示例
// 快速更新id为1文章的常用状态

URL: PUT /article/1/quick

// 参数
{
    "priority": 10
    "is_show": 1
    "is_delete": 0
}
```

返回值:

**HTTP状态码: 201**
| 参数 | 说明 | 备注 |
|------|-----|------|
| id | 文章id | |
| priority | 优先级 | |
| is_show | 可见性  | |
| is_delete | 是否在回收站中 | |

```
// 示例
{
    "id": 1,
    "priority": 10,
    "is_show": 1,
    "is_delete": 0
}
```

### 删除文章
删除文章比较特殊，只有文章的is_delete字段的值为1，也就是只有被移入到回收站中的内容才可以被彻底删除，这也是出于一种安全性的考量

接口地址: **/article/:articleId**

请求方式: **DELETE**

请求头:
| 参数 | 说明 | 备注 |
|------|-----|-------|
| Authorization | 登录凭证 | |

参数详情:
| 参数 | 说明 | 是否必选 | 校验 | 备注 |
|------|-----|----------|------|-----|
| articleId | 要删除的文章id | 是 | 无 | |

```
// 请求示例
// 删除id为6的文章

URL: DELETE /article/6
```

返回值:

**HTTP状态码: 204**

```
// 示例
// 返回空文档
```

### 文章列表

接口地址: **/articles**

请求方式: **GET**

请求头:无

参数详情: 

| 参数 | 说明           | 是否必选 | 校验 | 备注                      |
| ---- | -------------- | -------- | ---- | ------------------------- |
| page | 页码           | 否       | 无   | 如果不传这个参数默认值为1 |
| size | 每页显示的数量 | 否       | 无   | 如果不传这个参数默认值为8 |

```
// 请求示例
// 请求第一页且每页显示10条数据

URL: GET /articles?page=1&size=10
```

返回值:

**HTTP状态码: 200**

| 参数            | 说明           | 备注 |
| --------------- | -------------- | ---- |
| id              | 文章id         |      |
| title           | 标题           |      |
| summary         | 摘要           |      |
| priority        | 优先级         |      |
| is_show         | 可见性         |      |
| is_delete       | 是否在回收站中 |      |
| create_time     | 创建时间       |      |
| update_time     | 上次更新时间   |      |
| author.id       | 作者id         |      |
| author.username | 作者昵称       |      |

```
[
    {
        "id": 1,
        "title": "dsadsa",
        "summary": "",
        "priority": 0,
        "is_show": 1,
        "is_delete": 0,
        "create_time": "2022-01-03T10:47:01.000Z",
        "update_time": "2022-01-07T14:22:38.000Z",
        "author": {
            "id": 1,
            "username": "8888"
        }
    },
    {
        "id": 3,
        "title": "dsadsa",
        "summary": "",
        "priority": 0,
        "is_show": 1,
        "is_delete": 0,
        "create_time": "2022-01-03T10:56:13.000Z",
        "update_time": "2022-01-03T10:56:13.000Z",
        "author": {
            "id": 1,
            "username": "8888"
        }
    }
]
```

### 特定用户的文章

请求头的登录凭证为可选项，带登陆凭证的话可以返回该用户所有的文章，包括被用户设置为不可见的文章；否者仅返回用户公开，可被查看的文章

接口地址: **/user/:userId/articles**

请求方式: **GET**

请求头:

| 参数          | 说明     | 备注 |
| ------------- | -------- | ---- |
| Authorization | 登录凭证 |      |

参数详情: 

| 参数 | 说明           | 是否必选 | 校验 | 备注                      |
| ---- | -------------- | -------- | ---- | ------------------------- |
| page | 页码           | 否       | 无   | 如果不传这个参数默认值为1 |
| size | 每页显示的数量 | 否       | 无   | 如果不传这个参数默认值为8 |

```
// 请求示例
// 请求id为1用户的所有文章

URL: GET /user/1/articles?page=1&size=10
```

返回值:

```
// 与输出文章列表的返回类型相同
```

### 用户回收站中的内容

接口地址: **/article/recycles**

请求方式: **GET**

请求头:

| 参数          | 说明     | 备注 |
| ------------- | -------- | ---- |
| Authorization | 登录凭证 |      |

参数详情: 

| 参数 | 说明           | 是否必选 | 校验 | 备注                      |
| ---- | -------------- | -------- | ---- | ------------------------- |
| page | 页码           | 否       | 无   | 如果不传这个参数默认值为1 |
| size | 每页显示的数量 | 否       | 无   | 如果不传这个参数默认值为8 |

```
// 请求示例
// 请求id为1用户的所有文章

URL: GET /article/recycles?page=1&size=10
```

返回值:

```
// 与输出文章列表的返回类型相同
```

### 文章详情

返回文章前晨昏线会自动对权限进行判断，请求头的登陆凭证只有在查看受限制的文章例如不可见或已在回收站中时才需要添加

接口地址: **/article/:articleId**

请求方式: **GET**

请求头:

| 参数          | 说明     | 备注                               |
| ------------- | -------- | ---------------------------------- |
| Authorization | 登录凭证 | 非必选，查看受限制的文章时携带即可 |

参数详情: 

| 参数      | 说明   | 是否必选 | 校验 | 备注 |
| --------- | ------ | -------- | ---- | ---- |
| articleId | 文章id | 是       | 无   |      |

```
// 请求示例
// 请求id为1的文章详情

URL: GET /article/1
```

返回值:

**HTTP状态码: 200**

| 参数            | 说明           | 备注 |
| --------------- | -------------- | ---- |
| id              | 文章id         |      |
| title           | 标题           |      |
| summary         | 摘要           |      |
| body            | 正文           |      |
| priority        | 优先级         |      |
| is_show         | 可见性         |      |
| is_delete       | 是否在回收站中 |      |
| create_time     | 创建时间       |      |
| update_time     | 上次更新时间   |      |
| author.id       | 作者id         |      |
| author.username | 作者昵称       |      |

```
{
    "id": 1,
    "title": "TERMINATOR-LINE",
    "summary": "TERMINATOR-LINE",
    "body": "TERMINATOR-LINE",
    "priority": 10,
    "is_show": 1,
    "is_delete": 0,
    "create_time": "2022-01-07T09:09:53.000Z",
    "update_time": "2022-01-10T08:51:58.000Z",
    "author": {
        "id": 1,
        "username": "helwor"
    }
}
```

## 评论管理

### 添加评论

接口地址: **/comment**

请求方式: **POST**

请求头: 无

参数详情:

| 参数      | 说明         | 是否必选 | 校验           | 备注 |
| --------- | ------------ | -------- | -------------- | ---- |
| articleId | 文章id       | 是       | 文章必须存在   |      |
| email     | 评论人的邮箱 | 是       | 必须是邮件格式 |      |
| body      | 评论内容     | 是       | 不能为空       |      |

```
// 请求示例
// 为id为1的文章添加一条评论

URL: POST /comment

// 参数
{
    "articleId":"1",
    "email":"TERMINATOR-LINE@helwor.com",
    "body":"太弱小了，没有力量"
}
```

返回值:

**HTTP状态码: 201**

| 参数      | 说明       | 备注 |
| --------- | ---------- | ---- |
| id        | 评论id     |      |
| articleId | 文章id     |      |
| email     | 评论人邮箱 |      |

```
{
    "id": 1,
    "articleId": "1",
    "email": "TERMINATOR-LINE@helwor.com"
}
```

### 删除评论

只能删除自己文章下的评论

接口地址: **/comment/:commentId**

请求方式: **DELETE**

请求头:

| 参数          | 说明     | 备注 |
| ------------- | -------- | ---- |
| Authorization | 登录凭证 |      |

参数详情: 

| 参数      | 说明   | 是否必选 | 校验     | 备注 |
| --------- | ------ | -------- | -------- | ---- |
| commentId | 评论id | 是       | 评论存在 |      |

```
// 请求示例
// 删除id为1的评论

URL: DELETE /comment/1
```

返回值:

**HTTP状态码: 204**

```
// 示例
// 返回空文档
```

### 评论列表

这里晨昏线也会自动判断权限，并根据参数来判断是返回所有评论还是仅返回某一篇文章的评论

接口地址: **/comments**

请求方式: **GET**

请求头:

| 参数          | 说明     | 备注                                   |
| ------------- | -------- | -------------------------------------- |
| Authorization | 登录凭证 | 非必选，查看受限制的文章评论时需要添加 |

参数详情: 

| 参数      | 说明           | 是否必选 | 校验     | 备注                                     |
| --------- | -------------- | -------- | -------- | ---------------------------------------- |
| articleId | 文章id         | 否       | 文章存在 | 如果不传则返回当前登录用户所有文章的评论 |
| page      | 页码           | 否       | 无       | 如果不传这个参数默认值为1                |
| size      | 每页显示的数量 | 否       | 无       | 如果不传这个参数默认值为20               |

```
// 请求示例

// 请求当前登录用户所有文章的评论
URL: GET /comments

// 请求id为1文章的所有评论
URL: GET /comments?articleId=1
```

返回值:

**HTTP状态码: 201**

| 参数          | 说明       | 备注 |
| ------------- | ---------- | ---- |
| id            | 评论id     |      |
| email         | 评论人邮箱 |      |
| body          | 评论内容   |      |
| create_time   | 创建时间   |      |
| article_id    | 文章id     |      |
| article_title | 文章标题   |      |

```
[
    {
        "id": 1,
        "email": "TERMINATOR-LINE@helwor.com",
        "body": "太弱小了，没有力量",
        "create_time": "2022-02-08T06:55:47.000Z",
        "article_id": 1,
        "article_title": "TERMINATOR-LINE"
    },
    {
        "id": 2,
        "email": "TERMINATOR-LINE@helwor.com",
        "body": "我们联合",
        "create_time": "2022-01-09T06:13:53.000Z",
        "article_id": 1,
        "article_title": "TERMINATOR-LINE"
    }
]
```