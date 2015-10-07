import angular from 'angular';
import tmNotifier from './tmNotifier';
import toastr from 'toastr';

export default angular.module('common', [])
    .value('tmToastr', toastr)
    .factory('tmNotifier', tmNotifier)
    .name;

