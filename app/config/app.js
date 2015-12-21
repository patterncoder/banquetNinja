import angular from 'angular';

import Shell from '../shell';
import Features from '../features';
import Common from '../common';
import config from 'config';
import _ from 'lodash';

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
        //make collapse menu collapse after menu item selection
        $(document).on('click', '.navbar-collapse.in', function (e) { if ($(e.target).is('a')) { $(this).collapse('hide'); } });
        
        
    }])
    .run(['$rootScope', '$state', 'tmIdentity', 'tmNotifier', function($rootScope, $state, tmIdentity, tmNotifier){
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            // does route require auth
            // if yes
            
            if(toState.roles) {
                
                if(tmIdentity.isAuthenticated()){
                    if(_.intersection(tmIdentity.currentUser.user.roles, toState.roles).length == 0){
                        tmNotifier.notify('You are not authorized for that route');
                        $state.transitionTo(fromState.name);
                        event.preventDefault();
                    }
                    
                } else {
                    tmNotifier.notify('You must be authenticated to navigate to that route');
                    $state.transitionTo('root.login');
                    event.preventDefault();
                }
            }
            
        });
    }])
    .run(['$rootScope', '$modalStack', function($rootScope, $modalStack) {
        $rootScope.$on('$stateChangeStart', function() {
        var top = $modalStack.getTop();
        if (top) {
            $modalStack.dismiss(top.key);
        }
        });
    }]);