

function ninjaGridPricesCellCtrl ($timeout, $filter, $scope) {
	var $ctrl = this;
	
	this.openPopup = () => {
		console.log('open popup');
	};

	this.dynamicPopover = {
    templateUrl: 'priceTemplate.html',
    title: 'Multiple Prices'
	};
	
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
			isEditing: '='
	}
};

export default ninjaGridPricesCell;