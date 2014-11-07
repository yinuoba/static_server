/**
 * 项目配置
 * @type {Object}
 */
module.exports = {
  "host": 'localhost',
  "port": 8080,
  "log": {
    "logLevel": "log",
    "logDir": "logs"
  },
  "baseData": {},
  "environment": 'development', // production 生产环境  development 开发环境
  "mysql": { // mysql数据库配置
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodeframe',
    port: 3306
  }
};