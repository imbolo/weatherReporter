/*
{
	"error": 0,
	"status": "success",
	"date": "2015-03-29",
	"results": [{
		"currentCity": "杭州",
		"pm25": "117",
		"index": [{
			"title": "穿衣",
			"zs": "舒适",
			"tipt": "穿衣指数",
			"des": "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。"
		}, {
			"title": "洗车",
			"zs": "不宜",
			"tipt": "洗车指数",
			"des": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"
		}, {
			"title": "旅游",
			"zs": "适宜",
			"tipt": "旅游指数",
			"des": "天气较好，但丝毫不会影响您出行的心情。温度适宜又有微风相伴，适宜旅游。"
		}, {
			"title": "感冒",
			"zs": "易发",
			"tipt": "感冒指数",
			"des": "昼夜温差大，且空气湿度较大，易发生感冒，请注意适当增减衣服，加强自我防护避免感冒。"
		}, {
			"title": "运动",
			"zs": "较适宜",
			"tipt": "运动指数",
			"des": "天气较好，无雨水困扰，较适宜进行各种运动，但因气温较低，在户外运动请注意增减衣物。"
		}, {
			"title": "紫外线强度",
			"zs": "弱",
			"tipt": "紫外线强度指数",
			"des": "紫外线强度较弱，建议出门前涂擦SPF在12-15之间、PA+的防晒护肤品。"
		}],
		"weather_data": [{
			"date": "周日 03月29日 (实时：23℃)",
			"dayPictureUrl": "http://api.map.baidu.com/images/weather/day/duoyun.png",
			"nightPictureUrl": "http://api.map.baidu.com/images/weather/night/zhongyu.png",
			"weather": "多云",
			"wind": "南风微风",
			"temperature": "25 ~ 14℃"
		}, {
			"date": "周一",
			"dayPictureUrl": "http://api.map.baidu.com/images/weather/day/dayu.png",
			"nightPictureUrl": "http://api.map.baidu.com/images/weather/night/zhenyu.png",
			"weather": "中到大雨转阵雨",
			"wind": "南风微风",
			"temperature": "19 ~ 14℃"
		}, {
			"date": "周二",
			"dayPictureUrl": "http://api.map.baidu.com/images/weather/day/zhenyu.png",
			"nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
			"weather": "阵雨转多云",
			"wind": "南风微风",
			"temperature": "28 ~ 16℃"
		}, {
			"date": "周三",
			"dayPictureUrl": "http://api.map.baidu.com/images/weather/day/xiaoyu.png",
			"nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
			"weather": "小雨转多云",
			"wind": "南风微风",
			"temperature": "28 ~ 17℃"
		}]
	}]
}
*/
var warningCondition = {
	willRainTomorrow: function(weatherNames) {
		var result = true;
		//today
		var isRainToday = isRain(weatherNames[0]);
		//tomorrow
		var isRainTomorrow = isRain(weatherNames[1]);
		//今天不下雨，明天下雨时，提醒
		result = !isRainToday && isRainTomorrow;
		return result;
	}
};

var warningMap = {
	willRainTomorrow: { 
		title: "【提醒】明天下雨，记得把伞带回家",
		content: "明天下雨，记得把伞带回家"
	}
};

function getWarning(data) {
	var recentWeathers = data.results[0].weather_data || [];
	var weatherNames = [];
	var result = null;
	recentWeathers.forEach(function(item) {
		weatherNames.push(item.weather);
	});

	console.log(weatherNames);
	//['晴', '小雨', '雨夹雪', ...]
	for (condition in warningCondition) {		
		if (warningCondition[condition](weatherNames)) {
			var warning = warningMap[condition];			
			result = warning;			
		}
	}

	return result;
}

//regard snow day as rain day
function isRain(weatherName) {
	return weatherName.indexOf("雨") > -1 || weatherName.indexOf("雪") > -1;
}

module.exports = {
	getWarning: getWarning
}