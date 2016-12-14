import angular from 'angular';

import timePicker from "./timePicker";
import datePicker from "./datePicker";

export default angular.module('datePickers', [])
    .component("timePicker", timePicker)
    .component("datePicker", datePicker)
    .name