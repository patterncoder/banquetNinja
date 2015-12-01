import angular from 'angular';
import tmNotifier from './tmNotifier';
import toastr from 'toastr';
import tmModalSvc from './tmModalSvc';


export default angular.module('common', [])
    .value('tmToastr', toastr)
    .factory('tmNotifier', tmNotifier)
    .service('tmModalSvc', tmModalSvc)
    .name;

