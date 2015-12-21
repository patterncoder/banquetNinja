// vendor libraries
import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
import jquery from 'jquery';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
// tm custom modules
import navNinja from '../../navNinja';
import dataNinja from '../../dataNinja';
// shell factories
import tmAuth from './account/tmAuth';
import tmIdentity from './account/tmIdentity';
// shell controllers
import tmLoginCtrl from './account/tmLoginCtrl';
import tmSignupCtrl from './account/tmSignupCtrl';
// config data, nav and states
import data from './data';
import nav from './nav';
import states from './states';

export default angular.module('shell', [uirouter, uibs, dataNinja, navNinja, ngAnimate, ngMaterial])
    
    .factory('tmAuth', tmAuth)
    .factory('tmIdentity', tmIdentity)
    .config(states)
    .config(data)
    .config(nav)
    .controller('tmLoginCtrl', tmLoginCtrl)
    .controller('tmSignupCtrl', tmSignupCtrl)
    .name;