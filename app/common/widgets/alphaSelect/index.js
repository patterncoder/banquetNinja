import angular from 'angular';

import alphaSelect from "./alphaSelect";

export default angular.module('datePickers', [])
    .component("alphaSelect", alphaSelect)
    .name;