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
	print.multipage = (data[cat].places[1] == null) ? false : true;
	print.catcoffee = (cat == 'coffee');
	print.catdesserts = (cat == 'desserts');
	print.mapcat = false;
	res.render('category', print);
}

exports.category2 = function(req, res) {
	var cat = req.params.name;
	var page = req.query.page;
	var print = data[cat];
	print.multipage = (data[cat].places[1] == null) ? false : true;
	print.mapcat = true;
	res.render('category2', print);
}

exports.map = function(req, res) {
	var cat = req.params.category;
	var uid = req.params.id;
	var places = data[cat].places;
	var place = places.filter(function(val, i, arr) {
		return uid == val.uid;
	})[0];
	place.category = cat;
	res.render('map', place);
}

exports.directions = function(req, res) {
	var cat = req.params.category;
	var uid = req.params.id;
	var places = data[cat].places;
	var place = places.filter(function(val, i, arr) {
		return uid == val.uid;
	})[0];
	place.category = cat;
	res.render('directions', place);
}

exports.about = function(req, res) {
	res.render('about');
}

exports.help = function(req, res) {
	res.render('help');
}

exports.suggest = function(req, res) {
	var cat = req.query.cat;
	var catCheck = {
		category: cat,
		coffee: cat == 'coffee',
		dessert: cat == 'desserts',
		music: cat == 'music',
		clothing: cat == 'clothing',
		restaurants: cat == 'restaurants',
		trinkets: cat == 'trinkets'
	}
	res.render('suggest', catCheck);
}

exports.suggestThanks = function(req, res) {
	res.render('suggest-thanks');
}