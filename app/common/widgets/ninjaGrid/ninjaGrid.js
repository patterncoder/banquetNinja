

function ninjaGridCtrl($scope, $element, $attrs, $timeout) {
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

    $ctrl.toggleSideTab = function() {

    };
    
    $ctrl.create = function(item){
        $ctrl.docSvc[$attrs.createMethod](item);
    };
    
    $ctrl.update = function(item){
        $ctrl.docSvc[$attrs.updateMethod](item);
    };

    $ctrl.toggleAdd = function(){
        $ctrl.addToggle = !$ctrl.addToggle;
    };
    
    $ctrl.delete = function(index){
        $ctrl.docSvc[$attrs.deleteMethod](index);
    };
    
    $ctrl.sort = function(startIndex, insertIndex) {
        
        var moving = $ctrl.list.splice(startIndex, 1);
        
        $ctrl.list.splice(insertIndex, 0, moving[0]);
        $scope.$apply();
    };

    // function convertDateStrings(data){
    //     var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    //     _.forIn(data, function(value, key) {
    //             //console.log(key);
    //             if (typeof value === 'string') {
    //                 var a = reISO.exec(value);
    //                 if (a) {
    //                     data[key] = new Date(value);
    //                 }
    //             }
    //         });
    //     return data;
    // }

    // _.forEach($ctrl.list ,(item)=>{
    //     _.forEach(item, (fieldVal, key) => {
    //         console.log('here');
    //         var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    //         if(typeof fieldVal === "string" && resISO.test(fieldVal)) {
    //             console.log('here');
    //             item[key] = convertDateStrings(fieldVal);
    //         }
    //     });
    // });
    
}

ninjaGridCtrl.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var ninjaGridComponent =  {
    template: require("!raw!jade-html!./ninjaGrid.jade"),
    controller: ninjaGridCtrl,
    bindings: {
        docSvc: '<',
        list: '<',
        fields: '<',
        gridTitle: '@',
        noDataText: '@',
        addToggle: '='
    }
};



export default ninjaGridComponent;


// function tmNinjaGridCtrl ($scope){
//     var self = this;
//     self.data = [{description: 'descr 1'},
//         {description: 'descr 1'}
//     ]
    
// }


// tmNinjaGridCtrl.$inject = ['$scope'];

 
// export default {
//     template: require('!raw!jade-html!./grid.jade'),
//     controller: tmNinjaGridCtrl,
//     controllerAs: '$ctrl',
//     transclude: true,
//     bindings: {
//         gridTitle: '@',
//         docList: '='
//         // ,
//         // list: '',
//         // createMethod: '',
//         // updateMethod: '',
//         // deleteMethod: '',
//         // addToggle: ''
//     }
// };