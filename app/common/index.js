import angular from 'angular';
import tmNotifier from './tmNotifier';
import toastr from 'toastr';
import tmModalSvc from './tmModalSvc';
import tmDialogSvc from './tmDialogSvc';
import mongoose from 'mongoose';
// common directives
import isLoading from './widgets/isLoading.js';


export default angular.module('common', [])
    .value('tmToastr', toastr)
    .value('tmMongoose', mongoose)
    .factory('tmNotifier', tmNotifier)
    .service('tmModalSvc', tmModalSvc)
    .service('tmDialogSvc', tmDialogSvc)
    .directive('isLoading', isLoading)
    .name;

