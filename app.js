
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var project = require('./routes/project');
var api = require('./routes/api');
// Example route
// var user = require('./routes/user');

var app = express();

// Handlebars
/* var hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        category: function(block) { return category; }
    }
}); */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('housekeeping'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/category/:name', project.category);
app.get('/about', project.about);
app.get('/help', project.help);
app.get('/places/:category/:id', project.map);
app.get('/places/:category/:id/directions', project.directions);
app.get('/loadcat', api.getPlaces);
app.get('/suggest', project.suggest);
app.get('/suggest/thanks', project.suggestThanks);
app.post('/flag', api.flag);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
