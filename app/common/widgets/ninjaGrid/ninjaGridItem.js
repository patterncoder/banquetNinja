

function ninjaGridItemCtrl ($timeout, $filter, $scope) {
    var $ctrl = this;
    $ctrl.formatter = function (value, type) {

        const hasInternalTextOnly = /!!(.*?)!!/g;
        const hasContractTextOnly = /{{(.*?)}}/g;


        // console.log(Array.from(testString.matchAll(x1)));
        // console.log(Array.from(testString.matchAll(x2)));
        if (type == 'time') {
            return $filter('date')(value, "shortTime");
        } else if (type == 'timepicker') {
            return $filter('date')(value, "shortTime");
        } else if (type == 'date') {
            return $filter('date')(value, "fullDate");
        }
        else {
            if (typeof value === 'string') {
                if(hasInternalTextOnly.test(value)) {
                    value = value.replace(hasInternalTextOnly, (match, $1) => {
                        return `<span class="highlight-yellow">${$1}</span>`
                    });
                }
                if(hasContractTextOnly.test(value)) {
                    value = value.replace(hasContractTextOnly, (match, $1) => {
                        return `<span class="highlight-light-blue">${$1}</span>`
                    });
                }
                return value;
            } else {
                return value;
            }
        }
    };
    
    $ctrl.deleteItem = function() {
        $ctrl.onDeleteItem({$itemIndex: this.itemIndex});
    };
    
    $ctrl.doneEditing = function(item){
        delete item.isEditing;
        delete item.clickedField;
    };
    
    $ctrl.editItem = function(item, clickedField) {
        $timeout(function(){
            item.isEditing = true;
            item.clickedField = {};
            item.clickedField[clickedField] = true;
        },0);
    };
    
    $ctrl.arrowKeyOut = function(item, event, currentField){
        if (event.keyCode == 38) {
            $ctrl.doneEditing(item);
            $ctrl.onArrowKeyOut({item: item, keyCode: 'up', currentField: currentField});
        }
        if (event.keyCode == 40) {
            $ctrl.doneEditing(item);
            $ctrl.onArrowKeyOut({item: item, keyCode: 'down',  currentField: currentField});
        }
    };
    
    
    $ctrl.detailBlur = function (item, event) {
        var relatedTarget = event.relatedTarget || event.explicitOriginalTarget;
        if (relatedTarget == null || event.target.parentElement.parentElement != relatedTarget.parentElement.parentElement ) {
            $timeout(function(){
                delete item.isEditing;
                delete item.clickedField;
            }, 0);
            
        } 
    };
    
    $ctrl.sort = function (startIndex, insertIndex) {
        $ctrl.onSort({startIndex: startIndex, insertIndex: insertIndex});
    };
    
}

ninjaGridItemCtrl.$inject = ['$timeout', '$filter', '$scope'];

var ninjaGridItem = {
    template: require('!raw!jade-html!./ninjaGridItem.jade'),
    controller: ninjaGridItemCtrl,
    bindings: {
        item: '<',
        itemIndex: '@',
        fields: '<',
        onDeleteItem: '&',
        onEditItem: '&',
        onUpdateItem: '&',
        onCreateItem: '&',
        onArrowKeyOut: '&',
        onSort: '&'
    }
};

export default ninjaGridItem;