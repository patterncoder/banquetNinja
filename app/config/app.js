import angular from 'angular';
//import DataNinja from '../../dataNinja';
import Shell from '../shell';
import Features from '../features';
import config from 'config';

import routing from './routing';

module.exports = angular.module('app', [Shell, Features])
    .config(routing)
    .run(['$dataSource', function($dataSource){
        console.log('inthe app run function');
        console.log(config.apiBase);
        $dataSource.init();
    }]);