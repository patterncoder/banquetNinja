import angular from 'angular';

import ninjaGrid from "./ninjaGrid";
import ninjaGridItem from "./ninjaGridItem";

export default angular.module('ninjaGrid', [])
    .component("ninjaGrid", ninjaGrid)
    .component("ninjaGridItem", ninjaGridItem)
    .name;