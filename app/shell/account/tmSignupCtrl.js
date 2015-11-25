import config from 'config';
import {signup as signUpSchema} from '../../../schemas/account';
import _ from 'lodash';


class SignupCtrl {
    
    constructor($http, $scope, tmMongoose){
        this.$http = $http;
        this.$scope = $scope;
        this.tmMongoose = tmMongoose;
        this.validationError = null;
        this.httpValidationError = {errors: {}};
        this.accountData = new this.tmMongoose.Document({},signUpSchema);
    }
    
    validateField() {
        var self = this;
        self.accountData.validate(function(err){
            if(err){
                // while filling in the form we omit required errors and are just interested
                // in the other type of errors
                var errors = _.pick(err.errors, function(value, key){
                    return value.kind !== 'required';
                });
                self.validationError = {};
                self.validationError.errors = errors;
                return self.$scope.$apply();
            }
            self.validationError = null;
            return self.$scope.$apply();
        });
    }
    
    
    
    validateCompany() {
        var self = this;
        var companyName = self.accountData.companyName;
        
        var queryString = '?select=companyName&where=companyName&value=' + companyName;
        self.$http.get(config.apiBase + '/companies' + queryString).then(function(result){
            delete self.httpValidationError.errors.companyName;
            if (result.data.length == 0){
                return self.validateField();
            } else {
                //self.httpValidationError = {errors: {companyName: {kind: "unique", message: "An account with that name exists."}}};
                self.httpValidationError.errors.companyName = {kind: "unique", message: "An account with that name exists."};
                return self.validateField();
            }
        })
    }
    
    
    
    validateEmail() {
        var self = this;
        var email = self.accountData.email;
        
        
        self.$http.get(config.apiBase + '/users/exists/' + email).then(function(result){
            delete self.httpValidationError.errors.email;
            if (result.status == 200){
                return self.validateField();
            } else {
                self.httpValidationError.errors.email = {kind: "unique", message: "Email is not available"};
                return self.validateField();
            }
        })
    }
    
    
    
    submitSignup () {
        var self = this;
        this.accountData.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                self.$scope.$apply();
                return 
            } else if (self.httpValidationError.errors.email || self.httpValidationError.errors.companyName){
                console.log("i have custom errors");
                return;
            }
            self.$http.post(config.apiBase + '/account',  self.accountData).then(function(result){
                console.log(result);
            });
        });
    }
}

SignupCtrl.$inject = ['$http', '$scope', 'tmMongoose'];

export default SignupCtrl;