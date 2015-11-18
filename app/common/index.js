import angular from 'angular';
import tmNotifier from './tmNotifier';
import toastr from 'toastr';
import mongoose from 'mongoose';
//var mongoose = require('../../vendor/mongoose');


export default angular.module('common', [])
    .value('tmToastr', toastr)
    .value('tmMongoose', mongoose)
    .factory('tmNotifier', tmNotifier)
    .name;

