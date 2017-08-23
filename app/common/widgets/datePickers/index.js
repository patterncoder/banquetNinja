import angular from 'angular';

import timePicker from "./timePicker";
import timeField from "./timeField";
import datePicker from "./datePicker";

export default angular.module('datePickers', [])
    .component("timePicker", timePicker)
    .component("datePicker", datePicker)
    .component("timeField", timeField)
    .name;