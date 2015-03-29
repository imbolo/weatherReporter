var http = require("http");
var _ = require("lodash");
var querystring = require("querystring");

var baseUrl = "http://api.map.baidu.com/telematics/v3/weather";

var baseOptions = {
	output: "json",
	ak: "5f5bf7a2c2e1cd6342af5c4a84cf82b2"
};

function queryWeatherByCityName(cityName, callback) {

	var options = _.cloneDeep(baseOptions);
	options.location = cityName;

	var queryUrl = baseUrl + "?" + querystring.stringify(options);
	http.get(queryUrl, function(response) {
		var data = "";
		response.setEncoding('utf8');
		response.on('data', function(chunk) {
			data += chunk;
		});
		response.on('end', function() {
			var result;
			try {
				result = JSON.parse(data);
				console.log(result);
				callback(null, result);
			}
			catch (e) {
				console.log(e);
				callback(e, null);			
			}
		});
		response.on('error', function(err) {
			callback(err);
		});
	});
}

function preHandleResponse(response) {
	if (response.status != "success") {
		
	}
}

module.exports = {
	queryWeatherByCityName: queryWeatherByCityName
};