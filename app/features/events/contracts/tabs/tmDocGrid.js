

function tmDocGridCtrl($scope, $element, $attrs, $timeout) {
    var $ctrl = this;
    
    $ctrl.arrowKeyOut = function(item, keyCode, currentField) {
        var index = $ctrl.list.indexOf(item);
        function updateItem (index) {
            $ctrl.list[index].isEditing = true;
            $ctrl.list[index].clickedField = {};
            $ctrl.list[index].clickedField[currentField] = true;
            return;
        }
        
        if(keyCode === 'up')
        {
            index = index == 0 ? index : --index;
            updateItem(index);
        } else //down
        {
            index = index == $ctrl.list.length - 1 ? index : ++index;
            updateItem(index);
        }
        
    };
    
    $ctrl.create = function(item){
        $ctrl.docSvc[$attrs.createMethod](item);
    };
    
    $ctrl.update = function(item){
        $ctrl.docSvc[$attrs.updateMethod](item);
    };
    
    $ctrl.delete = function(item){
        $ctrl.docSvc[$attrs.deleteMethod](item);
    };
    
}

tmDocGridCtrl.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var tmDocGridComponent =  {
    template: require("!raw!jade-html!./tmDocGrid.jade"),
    controller: tmDocGridCtrl,
    bindings: {
        docSvc: '<',
        list: '<',
        gridTitle: '@',
        noDataText: '@'
    }
};



export default tmDocGridComponent;