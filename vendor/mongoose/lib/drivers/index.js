/*!
 * ignore
 */

var driver;
driver = require('./browser');
// if (typeof window === 'undefined') {
  
//   driver = require(global.MONGOOSE_DRIVER_PATH || './node-mongodb-native');
// } else {
//   driver = require('./browser');
// }

/*!
 * ignore
 */

module.exports = driver;
