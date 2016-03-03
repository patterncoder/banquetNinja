
var FocusDirective = function ($timeout) {
    return function(scope, element, attrs) {
    scope.$watch(attrs.focus, 
      function (newValue) { 
          
        $timeout(function() {
            newValue && element.focus();
            newValue && element[0].setSelectionRange(0, element[0].value.length);
        }, 100);
      },true);
  };    
};

FocusDirective.$inject = ['$timeout'];

export default FocusDirective;

