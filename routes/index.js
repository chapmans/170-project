
/*
 * GET home page.
 */

exports.view = function(req, res){
	res.render('index', {
		'items': [
			{ 'name': 'Coffee',
				'url': 'coffee',
				'icon': 'icon-coffee'
			},
			{ 'name': 'Desserts',
				'url': 'desserts',
				'icon': 'icon-cupcake'
			},
			{ 'name': 'Restaurants',
				'url': 'restaurants',
				'icon': 'icon-food'
			},
			{ 'name': 'Clothing',
				'url': 'clothing',
				'icon': 'icon-uniF53C'
			},
			{ 'name': 'Trinkets',
				'url': 'trinkets',
				'icon': 'icon-watch'
			},
			{ 'name': 'Music',
				'url': 'music',
				'icon': 'icon-uniF608'
			}
		]
	});
};
