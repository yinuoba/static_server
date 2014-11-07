/**
 * 实时预览
 * @type {[type]}
 */
var livereload = require('livereload')
var reloadserver = livereload.createServer()

// 不能直接监控整个ASSETS，里面有node_modules，会让cpu一下到100%，坑
reloadserver.watch(VIEWS)
reloadserver.watch(ASSETS + '/public/css/')
reloadserver.watch(ASSETS + '/public/js/')
reloadserver.watch(ASSETS + '/public/dist/')