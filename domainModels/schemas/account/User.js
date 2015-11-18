
var mongoose = require('mongoose');
var encrypt = require('../../../utilities/encryption');



var userSchema = new mongoose.Schema({
    firstName: {type:String, required:"{PATH} is required!"},
    lastName: {type:String, required:"{PATH} is required!"},
    username: {
        type: String,
        required: "{PATH} is required.",
        unique: true
    },
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    //adding security fields here
    salt: {type:String, required:"{PATH} is required!"},
    hashed_pwd: {type:String, required:"{PATH} is required!"},
    roles: [{type:String, enum: ['superUser', 'admin', 'gold', 'silver', 'bronze']}]

});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};


module.exports = userSchema;





