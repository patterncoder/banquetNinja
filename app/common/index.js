import angular from 'angular';
import tmNotifier from './tmNotifier';
import toastr from 'toastr';
import tmModalSvc from './tmModalSvc';
import tmDialogSvc from './tmDialogSvc';
import mongoose from 'mongoose';
// config items
import data from './data';
// common directives
import isLoading from './widgets/isLoading.js';
import lookups from './widgets/lookups';
import inject from './widgets/inject';
// services
import tmWindowStorage from './tmWindowStorage';
// base class like factories
import tmDocFactory from './tmDocFactory';
import tmDetailFactory from './tmDetailFactory';
import tmListFactory from './tmListFactory';
// controller for dialogService
import tmDialogAddItemCtrl from './tmDialogAddItemCtrl'


export default angular.module('common', [])
    .value('tmToastr', toastr)
    .value('tmMongoose', mongoose)
    .config(data)
    .factory('tmDocFactory', tmDocFactory)
    .factory('tmDetailFactory', tmDetailFactory)
    .factory('tmListFactory', tmListFactory)
    .factory('tmWindowStorage', tmWindowStorage)
    .factory('tmNotifier', tmNotifier)
    .service('tmModalSvc', tmModalSvc)
    .service('tmDialogSvc', tmDialogSvc)
    .directive('isLoading', isLoading)
    .directive('lookups', lookups)
    .directive('inject', inject)
    .controller('tmDialogAddItemCtrl', tmDialogAddItemCtrl)
    .name;

