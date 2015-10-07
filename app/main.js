/*jshint browser:true */
'use strict';
// load style sheets
import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';
//window.jQuery = window.$ = require('jquery/dist/jquery');
import 'bootstrap/dist/js/bootstrap';
import './site.styl';
// load Angular
import angular from 'angular';
//import uirouter from 'angular-ui-router';


// load the main app file
var appModule = require('./config/app');
// replaces ng-app="appName"
angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});