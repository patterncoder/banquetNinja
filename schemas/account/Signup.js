var mongoose = require('mongoose');
var validate = require('../validators');

var signupSchema = new mongoose.Schema({
            companyName: {
                type:String,
                required:'Company Name is required.',
                unique: true,
                match: /Holy Grail/i},
            email: {
                type: String,
                trim: true,
                unique: true,
                required: 'Email is required.',
                //validate: [validateEmail, 'Please fill a valid email address'],
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'The email you entered is not valid.']
            },
            password: {type:String,required:'Password is required'},
            confirmPassword: {type:String,required:'Password is required'},
            firstName: {type:String,required:'First name is required'},
            lastName: {type:String,required:'Last name is required'},
            address1: {type:String,required:'Address 1 is required'},
            address2: {type:String},
            city: {type:String,required:'City is required'},
            state: { type: String, required:'State is required', enum: validate.validators.stateCodes },
            
            zip: {type:String,required:'Zip code is required'},
            cardNumber: {type:String,required:'Card number is required'},
            expirationDate: {type:String,required:'Expirtation date is required'},
            cardCode: {type:String,required:'CCV code is required'}
        });
        
        
module.exports = signupSchema;
        
