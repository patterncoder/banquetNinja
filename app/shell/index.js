import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
import dataNinja from '../../dataNinja';
import tmAuth from './account/tmAuth';
import tmIdentity from './account/tmIdentity';
import HeaderCtrl from './header/headerCtrl';
import data from './data';
import states from './states';

export default angular.module('shell', [uirouter, uibs, dataNinja])
    .factory('tmAuth', tmAuth)
    .factory('tmIdentity', tmIdentity)
    
    .config(states)
    .config(data)
    .controller('HeaderCtrl', HeaderCtrl)
    .name;