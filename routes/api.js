exports.getMorePlaces = function(req, res) {
	var cat = req.params.name;
	var start = req.query.start;
	res.render('category', data[cat][start]);
}