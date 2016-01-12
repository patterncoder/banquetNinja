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


export default angular.module('common', [])
    .value('tmToastr', toastr)
    .value('tmMongoose', mongoose)
    .config(data)
    .factory('tmNotifier', tmNotifier)
    .service('tmModalSvc', tmModalSvc)
    .service('tmDialogSvc', tmDialogSvc)
    .directive('isLoading', isLoading)
    .directive('lookups', lookups)
    .name;

