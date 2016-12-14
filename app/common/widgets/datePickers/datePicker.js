

function datePickersCtrl($scope, $element, $attrs, $timeout) {
    var $ctrl = this;
    
    $ctrl.isOpen = false;
    
}

datePickersCtrl.$inject = [];

var datePickerComponent =  {
    template: require("!raw!jade-html!./datePicker.jade"),
    controller: datePickersCtrl,
    controllerAs: '$ctrl',
    bindings: {
        field: '='
    }
};



export default datePickerComponent;
