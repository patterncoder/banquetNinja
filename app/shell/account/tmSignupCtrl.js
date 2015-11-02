import config from 'config';

class SignupCtrl {
    constructor($http){
        this.$http = $http;
    }
    
    submitSignup () {
        
        var newAccountData = {
            companyName: this.companyName,
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            zip: this.zip,
            cardNumber: this.cardNumber,
            expirationDate: this.expirationDate,
            cardCode: this.cardCode
            
        };
        
        
        this.$http.post(config.apiBase + '/createAccount', newAccountData).then(function(result){
            console.log(result);
        });
        
        
    }
}

SignupCtrl.$inject = ['$http'];

export default SignupCtrl;