/**
 * mysql数据库连接
 * @type {[type]}
 */
var mysql = require('mysql')
var config = require(CONF + 'config')

var connection = mysql.createConnection(config['mysql'])

connection.connect()

var selectSql = 'select * from flights'

connection.query(selectSql, function(err, rows, fields) {
  if (err) throw err

  // console.log(rows);
})

connection.end()