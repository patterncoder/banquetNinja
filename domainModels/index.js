var mongoose = require('mongoose');

// import schemas
//var companySchema = require('./schemas/account/Company');
//var userSchema = require('./schemas/account/User');
// register the models with the imported schemas
mongoose.model('User', require('./schemas/account/User'));
mongoose.model('Company', require('./schemas/account/Company'));
// mongoose.model('User', userSchema.schema);
// mongoose.model('Company', companySchema.schema);
mongoose.model('Menu', require('./schemas/production/menuSchema'));
mongoose.model('Venue', require('./schemas/events/venueSchema'));
mongoose.model('RentalItem', require('./schemas/events/rentalItemSchema'));
mongoose.model('MenuItem', require('./schemas/production/menuItem'));

exports.seedDb = require('./seedDb');