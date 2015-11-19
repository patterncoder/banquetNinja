var mongoose = require('mongoose');
var sharedSchema = require('../sharedSchemas');

var menuItemPriceSchema = new mongoose.Schema({
    price: {type:Number, default: 0},
    priceFor: String
});

var menuItemSchema = new mongoose.Schema({
        menuItemId: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: "{PATH} is required."},
        description: String,
        prices: [menuItemPriceSchema]
});

var menuSectionSchema = new mongoose.Schema({
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        items: [menuItemSchema],
        footer: String
});


var menuSchema = new mongoose.Schema({
        // meta: {
        //     name: {type: String, required: "{PATH} is required."},
        //     description: String,
        //     dateCreated: { type: Date, default: Date.now },
        //     lastModified: {type: Date, default: Date.now}
        // },
        meta: sharedSchema.metaSchema,
        company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        sections: [menuSectionSchema],
        footer: String
});

module.exports = menuSchema;