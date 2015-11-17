import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
import navNinja from '../../navNinja';
import dataNinja from '../../dataNinja';
import tmAuth from './account/tmAuth';
import tmIdentity from './account/tmIdentity';
import tmLoginCtrl from './account/tmLoginCtrl';
import tmSignupCtrl from './account/tmSignupCtrl';
import data from './data';
import nav from './nav';
import states from './states';

export default angular.module('shell', [uirouter, uibs, dataNinja, navNinja])
    
    .factory('tmAuth', tmAuth)
    .factory('tmIdentity', tmIdentity)
    .config(states)
    .config(data)
    .config(nav)
    .controller('tmLoginCtrl', tmLoginCtrl)
    .controller('tmSignupCtrl', tmSignupCtrl)
    .name;