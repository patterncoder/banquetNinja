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
    
    validateField(fieldName) {
        var self = this;
        self.accountData.validate(function(err){
            if((_.has(err, 'errors.' + fieldName) && (err.errors[fieldName].kind !== 'required') )){
                //console.log(err.errors[fieldName].kind);
                self.validationError = {};
                self.validationError.errors = {};
                self.validationError.errors[fieldName] = err.errors[fieldName];
                self.$scope.$apply();
            } else {
                self.validationError = null;
                self.$scope.$apply();
            }
        });
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