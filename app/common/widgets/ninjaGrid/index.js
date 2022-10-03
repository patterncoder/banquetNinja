import angular from 'angular';

import ninjaGrid from "./ninjaGrid";
import ninjaGridItem from "./ninjaGridItem";
import ninjaGridPricesCell from "./ninjaGridPricesCell";

export default angular.module('ninjaGrid', [])
    .component("ninjaGrid", ninjaGrid)
    .component("ninjaGridItem", ninjaGridItem)
    .component("ninjaGridPricesCell", ninjaGridPricesCell)
    .name;