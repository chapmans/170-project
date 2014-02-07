exports.category = function(req, res){
  res.render('tbd');
};

exports.coffee = function(req, res) {
  res.render('category', {
      'category': 'coffee',
      'places': [
        { 'place': 'Bird Rock Coffee Roasters',
          'rating': 4.5,
          'open': false,
          'hours': {
            'monday': ['6:00a', '6:00p'],
            'tuesday': ['6:00a', '6:00p'],
            'wednesday': ['6:00a', '6:00p'],
            'thursday': ['6:00a', '6:00p'],
            'friday': ['6:00a', '6:00p'],
            'saturday': ['6:30a', '6:00p'],
            'sunday': ['6:30a', '6:00p']
          },
          'distance': 0.2,
          'direction': 'south',
          'payment': true,
          'site': 'http://www.birdrockcoffeeroasters.com/'
        },
        { 'place': 'Clairemont Coffee',
          'rating': 4.5,
          'open': true,
          'hours': {
            'monday': ['6:00a', '7:00p'],
            'tuesday': ['6:00a', '7:00p'],
            'wednesday': ['6:00a', '7:00p'],
            'thursday': ['6:00a', '7:00p'],
            'friday': ['6:00a', '7:00p'],
            'saturday': ['7:00a', '7:00p'],
            'sunday': ['7:00a', '2:00p'],
            'site': 'http://clairemontcoffee.com/'
          },
          'distance': 0.3,
          'direction': 'southeast',
          'payment': 'true'
        },
        { 'place': 'Dark Horse Coffee Roasters',
          'rating': 4.5,
          'open': true,
          'hours': {
            'monday': ['6:30a', '6:30p'],
            'tuesday': ['6:30a', '6:30p'],
            'wednesday': ['6:30a', '6:30p'],
            'thursday': ['6:30a', '6:30p'],
            'friday': ['6:30a', '6:30p'],
            'saturday': ['7:00a', '7:00p'],
            'sunday': ['7:00a', '7:00p'],
            'site': 'http://www.darkhorseroasting.com/'
          },
          'distance': 0.5,
          'direction': 'southeast',
          'payment': true
        }, 
        { 'place': 'Industrial Grind Coffee',
          'rating': 4.5,
          'open': true,
          'hours': {
            'monday': ['7:00a', '6:00p'],
            'tuesday': ['7:00a', '6:00p'],
            'wednesday': ['7:00a', '6:00p'],
            'thursday': ['7:00a', '6:00p'],
            'friday': ['7:00a', '6:00p'],
            'saturday': ['8:00a', '1:00p'],
            'sunday': ['8:00a', '1:00p']
          },
          'distance': 0.7,
          'direction': 'southeast',
          'payment': true,
          'site': 'http://www.industrialgrindcoffee.com/'
        }
      ]
  })
}

exports.desserts = function(req, res) {
  res.render('category', {
      'category': 'desserts',
      'places': [
      ]
  })
}