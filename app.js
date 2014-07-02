/**
 * app.js for static_server
 * @type {[type]}
 */

var express = require('express')
var http = require('http')
var path = require('path')
var livereload = require('livereload')

var app = express()
var server = require('http').createServer(app)

var config = require('./conf/config')

// 创建logs文件夹
var common = require('./common/common')
common.mkdir('logs')

var log = require('./common/log')

var logger = log.logger
logger.setLevel(config["log_level"])

// 配置日志
log.use(app)
app.use(express.compress())
app.use(express.favicon())
app.set('port', config["port"])
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/weixin')))

app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())

app.use(app.router)

// livereload
reloadserver = livereload.createServer()
reloadserver.watch(__dirname + "/views/")
reloadserver.watch(__dirname + "/public/")

// 路由
var routes = require('./routers/router')
routes(app)

server.listen(app.get('port'), function(){
	logger.info('Express server listening on port ' + app.get('port'))
})