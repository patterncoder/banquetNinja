import angular from 'angular';
import uirouter from 'angular-ui-router';
// config
import states from './states';
import nav from './nav';
import data from './data';
// controllers
import tmMenuGroupsCtrl from './menugroups/tmMenuGroupsCtrl';


export default angular.module('production', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .controller('tmMenuGroupsCtrl', tmMenuGroupsCtrl)
    .name