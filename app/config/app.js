import angular from 'angular';

import Shell from '../shell';
import Features from '../features';
import Common from '../common';
// config is aliased in webpack.config based on environment
import config from 'config';
import _ from 'lodash';



import routing from './routing';

module.exports = angular.module('app', [Shell, Features, Common])
.config(routing)
    // below here adds notification on every http request...
    // .config(['$httpProvider', function($httpProvider){
    //     $httpProvider.interceptors.push(['$q', '$timeout', 'tmNotifier', function($q, $timeout, tmNotifier){
    //         var promiseCompleted;
    //         return {
    //             'request': function(config){
    //                 promiseCompleted = false;
    //                 $timeout(function(){
    //                     if (!promiseCompleted) {
    //                         tmNotifier.waiting('communicating with server...');
    //                     }
                        
    //                 }, 1000)
                    
    //                 return config;
    //             },
    //             'response': function(response){
    //                 promiseCompleted = true;
    //                 tmNotifier.clear();
    //                 return response;
    //             }
    //         }
    //     }])
    // }])
    .run(['$dataSource','$rootScope', function($dataSource, $rootScope){
        $dataSource.init();
        $rootScope.$on('loggedOut', function () {
            $dataSource.clearCache();

        });
        
    }])
    .run(['$http', '$window', function($http, $window){
        if($window.localStorage['token']){
            $http.defaults.headers.common['x-access-token'] = $window.localStorage['token'];
        }
        //wake up api server...not sure if this is doing the trick
        $http.get(config.apiBase + '/wakeup', function(err, result){
            console.log(result);
        });
        //make collapse menu collapse after menu item selection
        //$(document).on('click', '.navbar-collapse.in', function (e) { if ($(e.target).is('a')) { $(this).collapse('hide'); } });
        
        
    }])
    
    .run(['$rootScope', '$state', 'tmIdentity', 'tmNotifier', function($rootScope, $state, tmIdentity, tmNotifier){
        
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            $state.back = {fromState: fromState, fromParams: fromParams};
            var fromStateName = fromState.name || 'root.home';
            if(tmIdentity.isAuthenticated() && toState.prohibitStateWhenLoggedIn){
                $state.transitionTo(fromState.name);
                event.preventDefault();
            }
            
            if(toState.roles) {
                
                if(tmIdentity.isAuthenticated()){
                    if(_.intersection(tmIdentity.currentUser.user.roles, toState.roles).length == 0){
                        tmNotifier.error('You are not authorized for that route');
                        $state.transitionTo(fromStateName);
                        event.preventDefault();
                    }
                    
                } else {
                    tmNotifier.error('You must be authenticated to navigate to that route');
                    $state.transitionTo('root.login');
                    event.preventDefault();
                }
            }
            
        });
    }]);
    
    // .run(['$rootScope', '$modalStack', function($rootScope, $modalStack) {
    //     $rootScope.$on('$stateChangeStart', function() {
    //     var top = $modalStack.getTop();
    //     if (top) {
    //         $modalStack.dismiss(top.key);
    //     }
    //     });
    // }]);