// vendor libraries
import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
//import uibstpls from 'angular-ui-bootstrap/ui-bootstrap-tpls';
import jquery from 'jquery';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngQuill from 'ng-quill';
import ngSanitize from 'angular-sanitize';
// tm custom modules
import navNinja from '../../navNinja';
import dataNinja from '../../dataNinja';
// shell factories
import tmAuth from './account/tmAuth';
import tmIdentity from './account/tmIdentity';
// shell controllers
import tmLoginCtrl from './account/tmLoginCtrl';
import tmSignupCtrl from './account/tmSignupCtrl';
import tmNavigationCtrl from './content/tmNavigationCtrl';
import tmFooterCtrl from './footer/tmFooterCtrl';
import tmProfileCtrl from './account/tmProfileCtrl';
// config data, nav and states
import data from './data';
import nav from './nav';
import states from './states';

export default angular.module('shell', [uirouter, uibs, dataNinja, navNinja, ngAnimate, ngMaterial, ngSanitize, ngQuill])
    
    .factory('tmAuth', tmAuth)
    .factory('tmIdentity', tmIdentity)
    .config(states)
    .config(data)
    .config(nav)
    .controller('tmLoginCtrl', tmLoginCtrl)
    .controller('tmSignupCtrl', tmSignupCtrl)
    .controller('tmNavigationCtrl', tmNavigationCtrl)
    .controller('tmFooterCtrl', tmFooterCtrl)
    .controller('tmProfileCtrl', tmProfileCtrl)
    .provider('ngQuillConfig', function () {
        var config = {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', /* 'code-block' */],
    
              //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              //[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
              //[{ 'direction': 'rtl' }],                         // text direction
    
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
    
              ['clean'],                                         // remove formatting button
    
              ['link', /* 'image', 'video' */]                         // link and image, video
            ]
          },
          bounds: document.body,
          debug: 'warn',
          theme: 'snow',
          scrollingContainer: null,
          placeholder: 'Insert text here ...',
          readOnly: false,
          trackChanges: 'user',
          preserveWhitespace: false
        }
    
        this.set = function (customConf) {
          customConf = customConf || {}
    
          if (customConf.modules) {
            config.modules = customConf.modules
          }
          if (customConf.theme) {
            config.theme = customConf.theme
          }
          if (customConf.placeholder !== null && customConf.placeholder !== undefined) {
            config.placeholder = customConf.placeholder.trim()
          }
          if (customConf.readOnly) {
            config.readOnly = customConf.readOnly
          }
          if (customConf.formats) {
            config.formats = customConf.formats
          }
          if (customConf.bounds) {
            config.bounds = customConf.bounds
          }
          if (customConf.scrollingContainer) {
            config.scrollingContainer = customConf.scrollingContainer
          }
          if (customConf.debug || customConf.debug === false) {
            config.debug = customConf.debug
          }
          if (customConf.trackChanges && ['all', 'user'].indexOf(customConf.trackChanges) > -1) {
            config.trackChanges = customConf.trackChanges
          }
          if (customConf.preserveWhitespace) {
            config.preserveWhitespace = true
          }
        }
    
        this.$get = function () {
          return config
        }
      })
    .name;