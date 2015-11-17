import config from 'config';
var mongoose = require('../../../vendor/mongoose');

class SignupCtrl {
    constructor($http, $scope, tmMongoose){
        this.$http = $http;
        this.$scope = $scope;
        
        console.log('in the signup controller');
        var newAccountSchema = new mongoose.Schema({
            companyName: {type:String,required:true,match: /Holy Grail/i},
            email: {
                type: String,
                trim: true,
                unique: true,
                required: 'Email address is required',
                //validate: [validateEmail, 'Please fill a valid email address'],
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            },
            password: {type:String,required:true},
            firstName: {type:String,required:true},
            lastName: {type:String,required:true},
            address1: {type:String,required:true},
            address2: {type:String,required:true},
            city: {type:String,required:true},
            state: {type:String,required:true},
            zip: {type:String,required:true},
            cardNumber: {type:String,required:true},
            expirationDate: {type:String,required:true},
            cardCode: {type:String,required:true}
        });
        this.accountData = new mongoose.Document({},newAccountSchema);
        this.validationError = null;
        
    }
    
    
    
    submitSignup () {
        
        
        var self = this;
        this.accountData.validate(function(err){
            
            if(err){
                console.log(err);
                self.validationError = err;
                return self.$scope.$apply();
            }
            self.$scope.$apply();
        });
        
        // this.$http.post(config.apiBase + '/createAccount', newAccountData).then(function(result){
        //     console.log(result);
        // });
        
        
    }
}

SignupCtrl.$inject = ['$http', '$scope'];

export default SignupCtrl;