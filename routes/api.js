var data = {
		coffee: require('../data/coffee.json'),
		desserts: require('../data/desserts.json'),
		restaurants: require('../data/restaurants.json'),
		clothing: require('../data/clothing.json'),
		trinkets: require('../data/trinkets.json'),
		music: require('../data/music.json')
};

exports.getMorePlaces = function(req, res) {
	var cat = req.query.name;
	var start = req.query.start;
	var retData = data[cat].places[parseInt(start)];
	if (retData) {
		retData[0].hasNext = (data[cat].places[parseInt(start)+1] === undefined) ? false : true;
	}
	res.json(retData);
}