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
	res.render('category', data[cat]);
}