var data = {
		coffee: require('../data/coffee.json'),
		desserts: require('../data/desserts.json'),
		restaurants: require('../data/restaurants.json'),
		clothing: require('../data/clothing.json'),
		trinkets: require('../data/trinkets.json'),
		music: require('../data/music.json')
};

var models = require('../models');

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
	var date = new Date();
	var weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var today = weekday[date.getDay()];
	place.json = JSON.stringify(place);
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
	var form_data = req.body;
	console.log(form_data);

  var newProject = new models.Suggestion(form_data);
  newProject.save(function(err, projects) {
  	if (err) {
  		console.log(err);
  		res.send(400);
  	}
  	res.render('suggest-thanks');
  });
}