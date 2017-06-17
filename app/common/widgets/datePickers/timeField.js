

function timeFieldCtrl($scope, $element, $attrs, $timeout) {
    var $ctrl = this;
    $ctrl.isOpen = false;
    
    
}

timeFieldCtrl.$inject = [];

var timeFieldComponent =  {
    template: require("!raw!jade-html!./timeField.jade"),
    controller: timeFieldCtrl,
    controllerAs: '$ctrl',
    bindings: {
        field: '='
    }
};



export default timeFieldComponent;
