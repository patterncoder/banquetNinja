var mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
            companyName: {type:String,
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
            firstName: {type:String,required:'Password is required'},
            lastName: {type:String,required:'Password is required'},
            address1: {type:String,required:'Password is required'},
            address2: {type:String,required:'Password is required'},
            city: {type:String,required:'Password is required'},
            state: {type:String,required:'Password is required'},
            zip: {type:String,required:'Password is required'},
            cardNumber: {type:String,required:'Password is required'},
            expirationDate: {type:String,required:'Password is required'},
            cardCode: {type:String,required:'Password is required'}
        });
        
        
module.exports = signupSchema;
        
