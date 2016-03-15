




function tmDocGridCtrl($scope, $element, $attrs, $timeout) {
    var ctrl = this;
    
    
    this.create = function(item){
        ctrl.docSvc[$attrs.createMethod](item);
    };
    
    this.update = function(item){
        ctrl.docSvc[$attrs.updateMethod](item);
    };
    
    this.delete = function(item){
        ctrl.docSvc[$attrs.deleteMethod](item);
    };
    
    this.editItem = function (item, index, clickedField){
        console.log({item:item, index:index, clickedField: clickedField});
        if(index < 0 || index > this.list.length - 1) return;
        $timeout(function(){
            // console.log({inFunction: 'editMenuItem',
            //     item: item,
            //     index: index,
            //     clickedField: clickedField
            // });
            item.isEditing = true;
            item.clickedField = {};
            item.clickedField[clickedField] = true;
        },0);

    }
    
    
}

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