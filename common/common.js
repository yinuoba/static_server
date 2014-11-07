/**
 * 项目用用方法
 */
var fs = require('fs')
var config = require('../conf/config')

module.exports = {
  /**
   * 创建文件夹
   * @param  {[type]} path
   * @return {[type]}
   */
  mkdir: function(path) {
    // 不存在则创建目录
    if (!fs.existsSync(path)) {
      fs.mkdir(path, function() {
        console.log(path + "文件夹创建成功！");
      });
    }
  },
  /**
   * 根据path获取对应js文件的路径
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  getAppjsPath: function(path) {
    // 检测业务js文件是否存在
    var jsFile = APPJS + path + '.js';
    // 文件存在则返回完整文件路径
    if (fs.existsSync(jsFile)) {
      return '/public/js/appjs' + path + '.js';
    }
    return false;
  },
  compare: function(propertyName) {
    return function(object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return -1;
      } else if (value2 > value1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}