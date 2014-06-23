/**
 * app.js for static_server
 * @type {[type]}
 */

var express = require('express')
var http = require('http')
var path = require('path')

var fs = require('fs')

var app = express()

var server = require('http').createServer(app)

var config = require('./config')

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

app.use(express.static(path.join(__dirname, 'assets')))

app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())

// app.use(app.router)

// var routes = require('./router/router')
// routes(app)

app.use(function(req, res){
	var method = req.method
	var url = req.url
	var tplpath = url.slice(1)
	console.info(path.join(__dirname))
	if(method === 'GET') {
		res.render(tplpath, {
			title: '世界杯'
		})
	}
})

server.listen(app.get('port'), function(){
	logger.info('Express server listening on port ' + app.get('port'))
})