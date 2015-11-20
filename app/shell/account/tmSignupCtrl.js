import config from 'config';
import {signup as signUpSchema} from '../../../schemas/account';
import _ from 'lodash';


class SignupCtrl {
    constructor($http, $scope, tmMongoose){
        this.$http = $http;
        this.$scope = $scope;
        this.tmMongoose = tmMongoose;
        this.validationError = null;
        this.accountData = new this.tmMongoose.Document({},signUpSchema);
    }
    
    validateField() {
        var self = this;
        self.accountData.validate(function(err){
            var errors = _.pick(err.errors, function(value, key){
                return value.kind !== 'required';
            });
            self.validationError = {};
            self.validationError.errors = errors;
            console.log(self.validationError);
            self.$scope.$apply();
        });
    }
    
    validateCompany() {
        var self = this;
        var companyName = self.accountData.companyName;
        
        var queryString = '?select=companyName&where=companyName&value=' + companyName;
        self.$http.get(config.apiBase + '/companies' + queryString).then(function(result){
            if (result.data.length == 0){
                return self.validateField();
                
            } else {
                self.validationError = {errors: {companyName: {kind: "unique", message: "An account with that name exists."}}};
                
            }
        })
    }
    
    resetCardNumber(){
        this.accountData.cardNumber = '';
    }
    
    submitSignup () {
        var self = this;
        this.accountData.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                self.$scope.$apply();
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