var data = {
		coffee: require('../data/coffee.json'),
		desserts: require('../data/desserts.json'),
		restaurants: require('../data/restaurants.json'),
		clothing: require('../data/clothing.json'),
		trinkets: require('../data/trinkets.json'),
		music: require('../data/music.json')
};

exports.getPlaces = function(req, res) {
	var cl = {
		longitude: req.query.lon,
		latitude: req.query.lat
	};
	var cat = req.query.cat;
	var rData = data[cat].places;
	var start = Number(req.query.start);
	rData.sort(function(a, b) {
		var aMagnitude = Math.sqrt((a.latitude - cl.latitude)*(a.latitude - cl.latitude) + (a.longitude - cl.longitude)*(a.longitude - cl.longitude));
		var bMagnitude = Math.sqrt((b.latitude - cl.latitude)*(b.latitude - cl.latitude) + (b.longitude - cl.longitude)*(b.longitude - cl.longitude));
		return bMagnitude - aMagnitude;
	});
	var returnData = rData.slice(start, start + 4);
	returnData[0].hasNext = rData.slice(start + 5, start + 9).length;
	res.json(returnData);
};

exports.flag = function(req, res) {
	res.json({flagged: true});
}