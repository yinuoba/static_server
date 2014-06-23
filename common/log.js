/**
 * [log4js 记录日志]
 * @type {[type]}
 */

var log4js = require('log4js');
log4js.configure({
  appenders: [{
    type: "console"
  }, 
  {
    type: "dateFile",
    filename: 'logs/message.log',
    pattern: "_yyyy-MM-dd",
    alwaysIncludePattern: true,
    category: "logger"
  }],
  replaceConsole: true,
  levels: {
    logger: 'INFO'
  }
});

var logger = log4js.getLogger('logger');

exports.logger = logger;

exports.use = function(app) {
  //页面请求日志,用auto的话,默认级别是WARN
  app.use(log4js.connectLogger(logger, {
    level: log4js.levels.logger,
    format: ':method :url'
  }));
}