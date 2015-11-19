

var validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var validateZipCode = function (zipcode) {

    var re = /^\d{5}([\-]\d{4})?$/;
    return re.test(zipcode);
};

var stateCodes = 'AL AK AS AZ AR CA CO CT DE DC FM FL GA GU HI ID IL IN IA KS KY LA ME MH MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND MP OH OK OR PW PA PR RI SC SD TN TX UT VT VI VA WA WV WI WY'.split(" ");

exports.validators = {
    validateEmail: validateEmail,
    validateZipCode: validateZipCode,
    stateCodes: stateCodes,
    emailValidator: [validateEmail, 'Email address is invalid'],
    zipCodeValidator: [validateZipCode, 'Zip code is invalid']
};
