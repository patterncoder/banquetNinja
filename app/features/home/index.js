import angular from 'angular';
import uirouter from 'angular-ui-router';
import states from './states';
import navCtrl from './navCtrl';

export default angular.module('home', [uirouter])
    
    .config(states)
    .controller('navCtrl', navCtrl)
    .name