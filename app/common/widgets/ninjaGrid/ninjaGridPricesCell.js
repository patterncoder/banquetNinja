

function ninjaGridPricesCellCtrl ($timeout, $filter, $scope) {
	var $ctrl = this;
	
	this.openPopup = () => {
		console.log('open popup');
	};

	this.dynamicPopover = {
    templateUrl: 'priceTemplate.html',
    title: 'Multiple Prices'
	};

	this.letsBlur = (item, $event) => {
		this.tmOnBlur(item, $event);
	}
	
	this.addPrice = () => {
		this.itemPrices.push({
			price: 0,
			priceFor: "Change me"
		})
	}
	
	
}

ninjaGridPricesCellCtrl.$inject = ['$timeout', '$filter', '$scope'];

var ninjaGridPricesCell = {
	template: require('!raw!jade-html!./ninjaGridPricesCell.jade'),
	controller: ninjaGridPricesCellCtrl,
	bindings: {
			itemPrices: '<',
			isEditing: '=',
			inFocus: '=',
			tmOnBlur: '='
	}
};

export default ninjaGridPricesCell;