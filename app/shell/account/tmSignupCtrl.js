import config from 'config';
import signUpSchema from '../../../domainModels/schemas/account/Signup';


class SignupCtrl {
    constructor($http, $scope, tmMongoose){
        this.$http = $http;
        this.$scope = $scope;
        this.tmMongoose = tmMongoose;
        this.validationError = null;
        var self = this;
        
        
        //var newAccountSchema = new this.tmMongoose.Schema;
        this.accountData = new this.tmMongoose.Document({},signUpSchema);
        this.accountData.validate(function(err){
            self.validationError = err;
            self.$scope.$apply();
        });
        
        
    }
    
    updateError(err) {
        this.validationError = err;
        this.$scope.$apply();
    }
    
    validateDoc () {
        var self = this;
        this.accountData.validate(function(err){
            
            if(err){
                self.updateError(err);
                return 
            }
            self.updateError(null);
            
            
        });
    }
    
    submitSignup () {
        
        
        var self = this;
        this.accountData.validate(function(err){
            
            if(err){
                console.log(err);
                self.validationError = err;
                return 
            }
            self.$http.post(config.apiBase + '/account',  self.accountData).then(function(result){
                console.log(result);
                
            });
            
        });
        
        
        
        
    }
}

SignupCtrl.$inject = ['$http', '$scope', 'tmMongoose'];

export default SignupCtrl;