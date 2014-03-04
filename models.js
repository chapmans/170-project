var Mongoose = require('mongoose');


var SuggestSchema = new Mongoose.Schema({
  "name": String,
  "category": String,
  "address": String,
  "info": String
});

exports.Suggestion = Mongoose.model('Suggestion', SuggestSchema);