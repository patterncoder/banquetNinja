import angular from 'angular';
import uirouter from 'angular-ui-router';
import dataNinja from '../../dataNinja'
import data from './data';
import states from './states';

export default angular.module('shell', [uirouter, dataNinja])
    .config(states)
    .config(data)
    .name;