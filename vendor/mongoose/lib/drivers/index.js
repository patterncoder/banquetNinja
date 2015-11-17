/*!
 * ignore
 */

var driver;
//driver = require('./browser');
if (typeof window === 'undefined') {
  // global.MONGOOSE_DRIVER_PATH
  //driver = require(global.MONGOOSE_DRIVER_PATH || './node-mongodb-native');
  driver = require('./browser');
} else {
  driver = require('./browser');
}

/*!
 * ignore
 */

module.exports = driver;
