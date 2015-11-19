var mongoose = require('mongoose');
var sharedSchema = require('../sharedSchemas');

var menuItemSchema = mongoose.Schema({
    meta: sharedSchema.metaSchema,
    name: String,
    description: String,
    category: String,
   
    variations: [{name:String,description:String}],
});

module.exports = menuItemSchema;
