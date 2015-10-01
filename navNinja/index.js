import angular from 'angular';

import Navigation from './navigation';


export default angular.module('navNinja', [])
    .provider('navigation', [function (){
        var nav = {};
        var count = 0;
        this.addNav = function(navString){
            nav[count++] = navString;
        };
        this.$get = [function (){
           return new Navigation(nav); 
        }];
    }])
    .name

