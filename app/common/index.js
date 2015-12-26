import angular from 'angular';
import tmNotifier from './tmNotifier';
import toastr from 'toastr';
import tmModalSvc from './tmModalSvc';
import tmDialogSvc from './tmDialogSvc';
import mongoose from 'mongoose';


export default angular.module('common', [])
    .value('tmToastr', toastr)
    .value('tmMongoose', mongoose)
    .factory('tmNotifier', tmNotifier)
    .service('tmModalSvc', tmModalSvc)
    .service('tmDialogSvc', tmDialogSvc)
    .name;

