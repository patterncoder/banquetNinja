import angular from 'angular';
import uirouter from 'angular-ui-router';
import dataNinja from '../../dataNinja';
import bnAuth from './account/bnAuth';
import HeaderCtrl from './header/headerCtrl';
import data from './data';
import states from './states';

export default angular.module('shell', [uirouter, dataNinja])
    .factory('bnAuth', bnAuth)
    
    .config(states)
    .config(data)
    .controller('HeaderCtrl', HeaderCtrl)
    .name;