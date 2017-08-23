import angular from 'angular';

import ngResource from 'script!./angular-resource.js';

import dataSourceProvider from './dataSourceProvider';

import CachedResource from './cachedResource';


export default angular.module('dataNinja', ['ngResource'])
    .factory('$cachedResource', ['$resource', '$q', function($resource, $q){
        return function (definition){
            return new CachedResource($resource, $q, definition);
        };}])
    .provider('$dataSource',  dataSourceProvider)
    
    .name;
