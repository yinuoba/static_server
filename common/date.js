/**
 * 重写toString方法，将时间转换为Y-m-d H:i:s格式
 * @return {[type]} [description]
 */
Date.prototype.toString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
}
/**
 * 格式化时间字符串
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
Date.prototype.toFormatString = function(format) {
    if (format == "") {
        return this.toString();
    }
    var str = '';
    str = format.replace(/Y|y/, this.getFullYear())
        .replace(/M|m/, this.getMonth() + 1)
        .replace(/D|d/, this.getDate())
        .replace(/H|h/, this.getHours())
        .replace(/I|i/, this.getMinutes())
        .replace(/S|s/, this.getSeconds());
    return str;
}