import angular from 'angular';

import alphaSelect from "./alphaSelect";

export default angular.module('alphaSelect', [])
    .component("alphaSelect", alphaSelect)
    .name;