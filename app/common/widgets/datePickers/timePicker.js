

function timePickersCtrl($scope, $element, $attrs, $timeout) {
    var $ctrl = this;
    $ctrl.isOpen = false;
    
    
}

timePickersCtrl.$inject = [];

var timePickerComponent =  {
    template: require("!raw!jade-html!./timePicker.jade"),
    controller: timePickersCtrl,
    controllerAs: '$ctrl',
    bindings: {
        field: '='
    }
};



export default timePickerComponent;
