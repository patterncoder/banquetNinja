import angular from 'angular';
import Datasource from '../../dataNinja';
import Shell from '../shell';
import Features from '../features';

import routing from './routing';

module.exports = angular.module('app', [Datasource, Shell, Features])
    .config(routing);