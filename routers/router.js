/**
 * 请求路由
 */
var fs = require('fs')
var path = require('path')
var url = require('url')
var titleArr = require('../conf/title')


module.exports = function(app) {
	// 通用路由
	app.get('*', function(req, res) {
		var method = req.method
		var url = req.url
		var tplpath = url.slice(1)	// view的路径
		var reqpath = app.get('views') + url + '.html'	// 获取文件路径
		var pageTitle = titleArr[tplpath] || "鑫合汇"

		if (url == '/') { // 首页列表
			reqpath = app.get('views') + "index.html"
			res.render(tplpath, {
				titleArr: titleArr
			})
		} else {
			// 如果对应目录的文件存在，则渲染文件
			fs.exists(reqpath, function(exists) {
				if (!exists) {
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.write("This request URL " + tplpath + " was not found on this server.")
					res.end()
				} else {
					res.render(tplpath, {
						title: pageTitle
					})
				}
			})
		}
	})
}