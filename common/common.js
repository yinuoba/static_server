/**
 * 项目用用方法
 */
var fs = require('fs')

module.exports = {
  /**
   * 创建文件夹
   * @param  {[type]} path
   * @return {[type]}
   */
  mkdir: function(path){
    if(!fs.existsSync(path)){
      fs.mkdir(path, function(){
        console.log(path + "文件夹创建成功！");
      });
    }
  }
}