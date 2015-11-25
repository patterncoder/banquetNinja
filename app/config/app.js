import angular from 'angular';

import Shell from '../shell';
import Features from '../features';
import Common from '../common';
import config from 'config';

//think import config should be deleted
//import config from 'config';

import routing from './routing';

module.exports = angular.module('app', [Shell, Features, Common])
    .config(routing)
    .run(['$dataSource', function($dataSource){
        $dataSource.init();
    }])
    .run(['$http', '$window', function($http, $window){
        if($window.sessionStorage['token']){
            $http.defaults.headers.common['x-access-token'] = $window.sessionStorage['token'];
        }
        //wake up api server...not sure if this is doing the trick
        $http.get(config.apiBase + '/wakeup', function(err, result){
            console.log(result);
        });
        
        $(document).on('click', '.navbar-collapse.in', function (e) { if ($(e.target).is('a')) { $(this).collapse('hide'); } });
        
        
    }]);