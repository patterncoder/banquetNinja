var mongoose = require('mongoose');
var validate = require('../validators');

var companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: 'Company Name is required.',
        unique: true
    },
    addresses: [{
        addressType: {type:String, enum: ['subscriptionBilling', 'headquarters', 'additionalLocation']},
        primary: Boolean,
        address1: String,
        address2: String,
        city: String,
        state: { type: String, enum: validate.validators.stateCodes },
        zip: { type: String, validate: validate.validators.zipCodeValidator }
    }],
    emails: [{
        emailType: {type: String, enum: ['accountAdmin']},
        primary: Boolean,
        email: { type: String, validate: validate.validators.emailValidator }
    }],
    contactNumbers: [{
        primary: Boolean,
        contactType: {type:String, enum: ['admin']},
        contactNumber: { type: String }
    }],
    dueCurrent: Boolean,
    accountLockout: Boolean,
    pendingVerificationCode: Number,
    returningCustomer: Boolean,
    accountState: {type: String, enum: ['created', 'pending', 'awaitingFirstPayment', 'trial', 'current', 'delinquent', 'lockout', 'cancelled']}
    
    
});

companySchema.methods = {
    isDuesCurrent: function () {return this.duesCurrent;},
    isAccountLockout: function () {return this.accountLockout;}
};
module.exports = companySchema;



