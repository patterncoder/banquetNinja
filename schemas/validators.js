

var validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var validateZipCode = function (zipcode) {

    var re = /^\d{5}([\-]\d{4})?$/;
    return re.test(zipcode);
};

var validatePhoneNumber = function(phoneNumber) {
    var re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    return re.test(phoneNumber);
};

var validateVisa = function(cardNumber) {
    var re = /^4[0-9]{12}(?:[0-9]{3})?$/;
    return re.test(cardNumber);
};
var validateMC = function(cardNumber) {
    var re = /^5[1-5][0-9]{14}$/;
    return re.test(cardNumber);
};
var validateAmex = function(cardNumber) {
    var re = /^3[47][0-9]{13}$/;
    return re.test(cardNumber);
};

var validateExpirationDate = function(expirationDate) {
    var re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return re.test(expirationDate);
}

var validateCVV = function(cvvCode) {
    var re = /^[0-9]{3,4}$/;
    return re.test(cvvCode);
};

var stateCodes = 'AL AK AS AZ AR CA CO CT DE DC FM FL GA GU HI ID IL IN IA KS KY LA ME MH MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND MP OH OK OR PW PA PR RI SC SD TN TX UT VT VI VA WA WV WI WY'.split(" ");

exports.validators = {
    validateEmail: validateEmail,
    validateZipCode: validateZipCode,
    stateCodes: stateCodes,
    emailValidator: [validateEmail, 'Email address is invalid'],
    zipCodeValidator: [validateZipCode, 'Zip code is invalid'],
    phoneNumberValidator: [validatePhoneNumber, 'The phone number entered is invalid'],
    expirationDateValidator: [validateExpirationDate, 'Expiration Date is invalid'],
    cvvValidator: [validateCVV, 'Card code is invalid'],
    validateVisa: validateVisa,
    validateMC: validateMC,
    validateAmex: validateAmex
};
