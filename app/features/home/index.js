import angular from 'angular';
import uirouter from 'angular-ui-router';
import states from './states';
import tmHomeCtrl from './homeCtrl';

export default angular.module('home', [uirouter])
    
    .config(states)
    .controller('tmHomeCtrl', tmHomeCtrl)
    .name