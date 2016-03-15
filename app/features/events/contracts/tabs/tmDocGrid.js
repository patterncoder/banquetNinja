




function tmDocGridCtrl($scope, $element, $attrs, $timeout) {
    var $ctrl = this;
    
    
    $ctrl.arrowKeyOut = function(item, keyCode, currentField) {
        var index = $ctrl.list.indexOf(item);
        if(keyCode == 'up' && index == 0) return;
        if(keyCode == 'down' && index == $ctrl.list.length - 1) return;
        
        
        if(keyCode === 'up')
        {
            index--;
            $ctrl.list[index].isEditing = true;
            $ctrl.list[index].clickedField = {};
            $ctrl.list[index].clickedField[currentField] = true;
        } else
        {
            index++;
            $ctrl.list[index].isEditing = true;
            $ctrl.list[index].clickedField = {};
            $ctrl.list[index].clickedField[currentField] = true;
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
    
    // $ctrl.editItem = function (item, index, clickedField){
    //     //console.log({item:item, index:index, clickedField: clickedField});
    //     if(index < 0 || index > this.list.length - 1) return;
    //     // $timeout(function(){
    //     //     // console.log({inFunction: 'editMenuItem',
    //     //     //     item: item,
    //     //     //     index: index,
    //     //     //     clickedField: clickedField
    //     //     // });
    //     //     item.isEditing = true;
    //     //     item.clickedField = {};
    //     //     item.clickedField[clickedField] = true;
    //     // },0);

    // }
    
    
}

tmDocGridCtrl.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var tmDocGridComponent =  {
    template: require("!raw!jade-html!./tmDocGrid.jade"),
    controller: tmDocGridCtrl,
    bindings: {
        docSvc: '<',
        list: '<',
        // createMethod: '@',
        // updateMethod: '@',
        // deleteMethod: '@',
        gridTitle: '@',
        noDataText: '@'
    }
};



export default tmDocGridComponent;