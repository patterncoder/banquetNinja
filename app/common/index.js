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
import listHeader from './widgets/listHeader';
import detailHeader from './widgets/detailHeader';
import detailFooter from './widgets/detailFooter';
import focus from './widgets/focus';
import ellipsisTitle from './widgets/ellipsisTitle';
import listItemButtons from './widgets/listItemButtons';
// services
import tmWindowStorage from './tmWindowStorage';
// base class like factories
import tmDocFactory from './tmDocFactory';
import tmDetailFactory from './tmDetailFactory';
import tmListFactory from './tmListFactory';
// controller for dialogService
import tmDialogAddItemCtrl from './tmDialogAddItemCtrl';
import tmDialogAddDocPartCtrl from './tmDialogAddDocPartCtrl';

// filters
import tmPhoneFilter from './tmPhoneFilter';

// sub modules
import ninjaGrid from './widgets/ninjaGrid';
import datePickers from './widgets/datePickers';
import alphaSelect from './widgets/alphaSelect';


export default angular.module('common', [ninjaGrid, datePickers, alphaSelect])
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
    .directive('listHeader', listHeader)
    .directive('detailHeader', detailHeader)
    .directive('detailFooter', detailFooter)
    .directive('focus', focus)
    .directive('ellipsisTitle', ellipsisTitle)
    .directive('listItemButtons', listItemButtons)
    .controller('tmDialogAddItemCtrl', tmDialogAddItemCtrl)
    .controller('tmDialogAddDocPartCtrl', tmDialogAddDocPartCtrl)
    .filter('tmPhoneFilter', tmPhoneFilter)
    .name;

