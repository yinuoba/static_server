var common = require(COMMON + 'common')
var config = require(CONF + 'config')
var pageTitleObj = require(VIEWS + 'pagetitle')

/**
 * 通用路由
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.base = function(req, res) {
  var method = req.method
  var url = req.url
  var tplpath = url.slice(1) // view的路径
  var reqpath = VIEWS + url + '.html' // 获取文件路径

  var tplArr = tplpath.split('/')
  var appName = tplArr[0] // 取appname

  tplArr.shift()

  // 取得里层目录
  var innerPath = tplArr.join('/')

  // 从配置中获取页面title
  var pageTitle = pageTitleObj &&  pageTitleObj[appName] && pageTitleObj[appName][innerPath] || "鑫合汇"

  // 如果对应目录的文件存在，则渲染文件
  fs.exists(reqpath, function(exists) {
    if (!exists) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write("This request URL " + tplpath + " was not found on this server.")
      res.end()
    } else {
      var data = {
        title: pageTitle,
        path: url,
        environment: config['environment'],
        jsFile: false
      }
      // 根据当前url获取对应appjs的路径
      data['jsFile'] = common.getAppjsPath(url.toLowerCase())

      res.render(tplpath, data)
    }
  })
}

/**
 * dirList 目录列表
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.dirList = function(req, res) {
  var method = req.method
  var url = req.url
  var tplpath = url.slice(1) // view的路径
  var href, mtime, reqpath, fullpath
  var mtimeObj = {}, mtimeArr = [];

  // 遍历pagetitle.js中的各个目录，获取各个目录的最后修改时间
  for(var app in pageTitleObj) {
    for (var pageUrl in pageTitleObj[app]) {

      reqpath = "/" + app + "/" + pageUrl;
      // 获取文件目录
      fullpath = VIEWS + reqpath + '.html';

      // 文件存在则取出最后修改时间
      if (fs.existsSync(fullpath)) {
        mtime = fs.statSync(fullpath)['mtime'];
        mtimeArr.push({"reqpath": reqpath, "mtime": mtime, "title": pageTitleObj[app][pageUrl], "appname": app});
      }
    }
  }

  // 根据mtime排序
  mtimeArr.sort(common.compare('mtime'));

  // 排序后转化mtime
  for(var j = 0, reqpath, appname, mtime, title; j < mtimeArr.length; j++){
    reqpath = mtimeArr[j]['reqpath'];
    mtime = mtimeArr[j]['mtime'];
    title = mtimeArr[j]['title'];
    appname = mtimeArr[j]['appname'];

    mtimeObj[reqpath] = {};
    mtimeObj[reqpath]['appname'] = appname;
    mtimeObj[reqpath]['mtime'] = mtime;
    mtimeObj[reqpath]['title'] = title;
  }

  res.render(tplpath, {
    mtimeObj: mtimeObj
  })
}