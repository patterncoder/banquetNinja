import angular from 'angular';
import uirouter from 'angular-ui-router';

import states from './states';
import nav from './nav';
import data from './data';

import tmCustomerDocSvc from './customers/tmCustomerDocSvc';
import tmCustomerDetailCtrl from './customers/tmCustomerDetailCtrl';

import tmCustomersCtrl from './customers/tmCustomersCtrl';

export default angular.module('customers', [uirouter])

    .config(states)
    .config(nav)
    .config(data)
    .factory('tmCustomerDocSvc', tmCustomerDocSvc)
    .controller('tmCustomersCtrl', tmCustomersCtrl)
    .controller('tmCustomerDetailCtrl', tmCustomerDetailCtrl)
    .name