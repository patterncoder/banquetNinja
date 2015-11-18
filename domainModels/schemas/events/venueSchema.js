var mongoose = require('mongoose');
var sharedSchema = require('../sharedSchemas');


var venueSchema = mongoose.Schema({
	meta: sharedSchema.metaSchema,
	name: String,
	description: String,
	capacity: Number,
	price: Number,
	notes: String
});


module.exports = venueSchema;