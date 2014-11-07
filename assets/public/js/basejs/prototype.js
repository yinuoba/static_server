// 扩展包装对象
(function(){
	// 扩展String对象
	String.prototype.replaceAll  = function(s1,s2){
		return this.replace(new RegExp(s1,"gm"),s2);
	}

  /**
   * @description 清除字符串开头和结尾的空格,只有ECMA5才支持trim方法,因此扩展String这一包装对象的去除空格方法
   */
  String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  /**
   * 去除字符串中所有的空格
   * @return {[type]} [description]
   */
  String.prototype.trimAll = function() {
    return this.trim().replace(/\s+/g, '');
  }

	/**
   * @description 通过bind方法，给函数绑定参数，并返回一个函数
   * @param  {Object} obj 用来替换的this对象
   * @return {[type]}     [description]
   */
  Function.prototype.bind = function(obj) {
      var fn = this,
      		core_slice = Array.prototype.slice;
      // 如果没有传入参数，则返回该函数本身
      if (arguments.length < 2 && (typeof arguments[0] == 'undefined')) return fn;
      
      var args = core_slice.call(arguments, 1);
      // 返回一function，以obj为this，bind中传入的参数加上当前function中参数为参数
      return function(){
          // 后面继续连上arguments，给返回的function传入参数
          return fn.apply(obj, args.concat(core_slice.call(arguments)))
      }
  }

  /**
   * 查找某一obj在array中的位置
   * @param  {[type]} obj 需要查找的元素
   * @return {[type]}     [description]
   */
  Array.prototype.indexOf = function(obj) {
    var result = -1,
      length = this.length,
      i = length - 1;
    for (; i >= 0; i--) {
      if (this[i] === obj) {
        result = i;
        // 如果已找到，则跳出循环
        break
      }
    }
    return result
  }

  /**
   * 移出数组中的某一元素
   * @param  {[type]} obj 待移除元素
   * @return {[type]}     [description]
   */
  Array.prototype.remove = function(obj) {
    var index = this.indexOf(obj);
    return index >= 0 ? this.splice(index, 1) : false;
  }

}());