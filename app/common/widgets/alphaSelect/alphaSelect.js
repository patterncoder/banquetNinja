
function alphaSelectCtrl($scope, $element, $attrs, $timeout) {
    var $ctrl = this;
    
    $ctrl.select = function(letter){
        $ctrl.onSelect({letter: letter});
    };
    
}

alphaSelectCtrl.$inject = [];

var alphaSelectComponent =  {
    template: require("!raw!jade-html!./alphaSelect.jade"),
    controller: alphaSelectCtrl,
    controllerAs: '$ctrl',
    bindings: {
        onSelect: "&"
    }
};



export default alphaSelectComponent;
