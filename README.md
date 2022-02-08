### 概览

> 这个项目起初只是我为了写写博客自用的一个小系统，后面随着项目不断扩大，功能越来越多，就想着干脆给他开源吧，于是就有了现在的晨昏线。

node.js + koa2的内容管理系统，这是一个纯后端接口的项目，接口遵循RESTful风格。你只需要使用任何你喜欢的技术来构建自己的前端页面，就可以快速开发属于自己的博客，个人网站甚至是小型社区。风暴角PROJECT的官方网站就是使用晨昏线作为后端进行搭建的。

想了解更多关于晨昏线的动态，可以访问我们开发者的官方网站 [风暴角PROJECT](http://www.helwor.top)

### 使用晨昏线

配置 **.env** 文件

| 参数           | 说明             |
| -------------- | ---------------- |
| APP_PORT       | 服务器使用的端口 |
| MYSQL_HOST     | MySQL数据库地址  |
| MYSQL_PORT     | MySQL数据库端口  |
| MYSQL_DATABASE | 使用的数据库名   |
| MYSQL_USER     | 数据库登录名     |
| MYSQL_PASSWORD | 数据库登录密码   |

```
APP_PORT = 8080

MYSQL_HOST = 127.0.0.1
MYSQL_PORT = 3306
MYSQL_DATABASE = terminator
MYSQL_USER = root
MYSQL_PASSWORD = root
```

启动服务，在项目根目录使用以下命名
```shell
npm start
```
