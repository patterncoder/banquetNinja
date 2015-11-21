var mongoose = require('mongoose');
var validate = require('../validators');

var signupSchema = new mongoose.Schema({
        companyName: {
            type:String,
            required:'Company Name is required',
            unique: true
            },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: 'Email is required',
            validate: validate.validators.emailValidator
            },
        password: {
            type:String, 
            minlength: [8, 'The password must be at least 8 characters'], 
            required:'Password is required'
            },
        confirmPassword: {
            type:String,
            required:'Password is required'
            },
        firstName: {
            type:String,
            required:'First name is required'
            },
        lastName: {
            type:String,
            required:'Last name is required'
            },
        address1: {
            type:String,
            required:'Address 1 is required'
            },
        address2: {
            type:String
            },
        city: {
            type:String,
            required:'City is required'
            },
        state: { 
            type: String, 
            required:'State is required', 
            enum: {
                values:validate.validators.stateCodes,
                message: "Enter a valid state code in uppercase"
                } 
            },            
        zip: {
            type:String, 
            validate: validate.validators.zipCodeValidator, 
            required:'Zip code is required'
            },
        phoneNumber: {
            type:String,
            validate: validate.validators.phoneNumberValidator,
            required: 'Phone number is required'
        },
        cardType: {
                // set by radio buttons in the ui
            type:String
            },
        cardNumber: {
            type:String,
            required:'Card number is required'
            },
        expirationDate: {
            type:String,required:'Expirtation date is required', 
            validate: validate.validators.expirationDateValidator
            },
        cardCode: {
            type:String,
            required:'CCV code is required',
            validate: validate.validators.cvvValidator
            }
    });
        
signupSchema.path('confirmPassword').validate(function(v){
        if(this.password !== this.confirmPassword) {
                this.invalidate('confirmPassword', 'The passwords do not match');
        }
});



signupSchema.path('cardNumber').validate(function(v){
        if (!this.cardType){
            this.cardNumber = '';
            this.invalidate('cardNumber', 'Must select a card type');
            return;
        }
        switch (this.cardType) {
            case 'vi':
                    if(!validate.validators.validateVisa(v)){
                            this.invalidate('cardNumber', 'Invalid card number');
                    }
                    return;
            case 'mc':
                        if(!validate.validators.validateMC(v)){
                            this.invalidate('cardNumber', 'Invalid card number');
                    }
                    return;
            case 'am':
                        if(!validate.validators.validateAmex(v)){
                            this.invalidate('cardNumber', 'Invalid card number');
                    }
                    return;
        }
})
        
        
module.exports = signupSchema;
        
