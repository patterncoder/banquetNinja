

function ninjaGridPricesCellCtrl ($timeout, $filter, $scope) {
	var $ctrl = this;
	
	this.openPopup = () => {
		console.log('open popup');
	};

	this.dynamicPopover = {
    content: 'Hello, World!',
    templateUrl: 'priceTemplate.html',
    title: 'Title'
  };
	
	
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