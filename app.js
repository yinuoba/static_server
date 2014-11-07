/**
 * app.js for nodeframe
 * @type {[type]}
 */

//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖镇楼                  永无BUG
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？

// 定义全局变量
global.BASEDIR = __dirname + '/'
global.COMMON = global.BASEDIR + 'common/'

require(COMMON + 'globalVal')

// 常用模块
require(COMMON + 'globalModules')

var config = require(CONF + 'config') // 配置文件
var common = require(COMMON + 'common')

// 创建应用及服务器
var app = express()
var server = http.createServer(app)

// 日志相关
common.mkdir(config['log']['logDir'])
var log = require(COMMON + 'log')
logger.setLevel(config['log']['logLevel'])
log.use(app) // 配置日志

app.use(express.compress())
app.use(express.favicon())

app.set('port', config['port'])

app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'assets')))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())

// livereload
if (config['environment'] == 'development') {
  require(COMMON + 'livereload')
}

// 路由
var routes = require(ROUTERS + 'router')
routes(app)

server.listen(app.get('port'), function() {
  logger.info('Express server listening on port ' + app.get('port'))
})