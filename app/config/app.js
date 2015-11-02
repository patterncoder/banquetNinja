import angular from 'angular';

import Shell from '../shell';
import Features from '../features';
import Common from '../common';

//think import config should be deleted
//import config from 'config';

import routing from './routing';

module.exports = angular.module('app', [Shell, Features, Common])
    .config(routing)
    .run(['$dataSource', function($dataSource){
        $dataSource.init();
    }]);