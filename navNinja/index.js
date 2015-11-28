import angular from 'angular';

import Navigation from './navigation';
import Directive from './navNinjaDrctv';



export default angular.module('navNinja', [])
    .directive('navNinja', Directive)
    .provider('navigation', [ function (){
        var nav = [];
        //var count = 0;
        this.addNav = function(navObject){
            nav.push(navObject);
        };
        this.$get = ['tmIdentity', function (tmIdentity){
           return new Navigation(nav, tmIdentity); 
        }];
    }])
    .name

