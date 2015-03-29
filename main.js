var http = require("http");
var weatherService = require("./weatherService");
var weatherDataAnalysiser = require("./weatherDataAnalysiser");
var messageManager = require("./messageManager");

http.createServer(function(req, res) {	
	weatherService.queryWeatherByCityName("杭州", function(err, result) {
		if (err) {
			console.error(err);
			res.end("error");
			return;
		}
		res.setHeader("content-type", "text/json;charset=utf8")
		res.write(JSON.stringify(result));
		handleResult(result);		
		res.end();
	});
}).listen(3001, '127.0.0.1');

function handleResult(result) {
	var waring = weatherDataAnalysiser.getWarning(result);
	if (!waring) {
		return;
	}
	console.log("prepare for sending warning message");
	var receivers = ["yuting.gyt@alibaba-inc.com", "lanxi.lq@alibaba-inc.com", "yang.liuy@alibaba-inc.com"];
	messageManager.send(receivers, waring.title, waring.content);
}