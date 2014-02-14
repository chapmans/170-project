var data = {
		coffee: require('../data/coffee.json'),
		desserts: require('../data/desserts.json'),
		restaurants: require('../data/restaurants.json'),
		clothing: require('../data/clothing.json'),
		trinkets: require('../data/trinkets.json'),
		music: require('../data/music.json')
};

exports.category = function(req, res) {
	var cat = req.params.name;
	var page = req.query.page;
	var print = data[cat];
	res.render('category', print);
}

exports.map = function(req, res) {
	var cat = req.params.category;
	var id = req.params.id;
	var place = data[cat].places[id];
	place.id = id;
	place.category = cat;
	res.render('map', place);
}

exports.directions = function(req, res) {
	var cat = req.params.category;
	var id = req.params.id;
	var place = data[cat].places[id];
	place.id = id;
	place.category = cat;
	res.render('directions', place);
}

exports.about = function(req, res) {
	res.render('about');
}

exports.help = function(req, res) {
	res.render('help');
}