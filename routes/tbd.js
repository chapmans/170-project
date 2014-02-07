exports.category = function(req, res){
  res.render('tbd', {
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
  	links: [
  		{   'url': '/',
  			'title': 'back'
  		}
  	]
  });
};

exports.help = function(req, res){
  res.render('tbd', {
  	links: [
  		{   'url': '/',
  			'title': 'back'
  		}
  	]
  });
};

exports.mapdesserts = function(req, res){
  res.render('tbd', {
  	links: [
  		{   'url': '/desserts',
  			'title': 'back'
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
  	links: [
  		{   'url': '/coffee',
  			'title': 'back'
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
  	links: [
  		{   'url': 'javascript:history.go(-1)',
  			'title': 'back'
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
  	links: [
  		{   'url': 'javascript:history.go(-1)',
  			'title': 'back'
  		},
  		{	'url': '/',
  			'title': 'home'
  		},
  		{	'url': '/map',
  			'title': 'map'
  		}
  	]
  });
};

exports.social = function(req, res){
  res.render('tbd', {
  	links: [
  		{   'url': '#',
  			'title': '(none - external link)'
  		}
  	]
  });
};