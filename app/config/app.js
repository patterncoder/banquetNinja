import angular from 'angular';
import Datasource from '../../dataNinja';
import Shell from '../shell';

import routing from './routing';

module.exports = angular.module('app', [Datasource, Shell])
    .config(routing);