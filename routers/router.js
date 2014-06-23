/**
 * 请求路由
 */
module.exports = function(app) {
	app.get('/Index/Act/worldCup', function(req, res){
		if(req.method === 'GET') {
			res.render('Index/Act/worldCup', {
				title: '世界杯'
			});
		}
	});
};