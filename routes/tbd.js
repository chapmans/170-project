exports.category = function(req, res){
  res.render('tbd', {
  	name: 'category',
  	links: [
  		{   'url': '/',
  			'title': 'back/home'
  		},
  		{   'url': '/map',
  			'title': 'map (for each item)'
  		},
  	]
  });
};

exports.about = function(req, res){
  res.render('tbd', {
  	name: 'about',
  	links: [
  		{   'url': '/',
  			'title': 'back'
  		}
  	]
  });
};

exports.help = function(req, res){
  res.render('tbd', {
  	name: 'help',
  	links: [
  		{   'url': '/',
  			'title': 'back'
  		}
  	]
  });
};

exports.mapdesserts = function(req, res){
  res.render('tbd', {
  	name: 'map of a place',
  	links: [
  		{   'url': '/desserts',
  			'title': 'back to category page'
  		},
  		{	'url': '/',
  			'title': 'home'
  		},
  		{	'url': '/directions',
  			'title': 'directions'
  		}
  	]
  });
};

exports.mapcoffee = function(req, res){
  res.render('tbd', {
  	name: 'map of a place',
  	links: [
  		{   'url': '/coffee',
  			'title': 'back to category page'
  		},
  		{	'url': '/',
  			'title': 'home'
  		},
  		{	'url': '/directions',
  			'title': 'directions'
  		}
  	]
  });
};

exports.map = function(req, res){
  res.render('tbd', {
  	name: 'map of a place',
  	links: [
  		{   'url': 'javascript:history.go(-1)',
  			'title': 'back to category page'
  		},
  		{	'url': '/',
  			'title': 'home'
  		},
  		{	'url': '/directions',
  			'title': 'directions'
  		}
  	]
  });
};

exports.directions = function(req, res){
  res.render('tbd', {
  	name: 'directions to a place',
  	links: [
  		{   'url': 'javascript:history.go(-1)',
  			'title': 'back'
  		},
  		{	'url': '/',
  			'title': 'home'
  		},
  		{	'url': '/map',
  			'title': 'map'
  		},
  	]
  });
};

exports.social = function(req, res){
  res.render('tbd', {
  	name: 'social icon',
  	links: [
  		{   'url': '#',
  			'title': '(none - external link)'
  		}
  	]
  });
};