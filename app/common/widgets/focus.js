
var FocusDirective = function ($timeout) {
    return function(scope, element, attrs) {
    scope.$watch(attrs.focus, 
      function (newValue) { 
          
        $timeout(function() {
            
            newValue && element.focus();
            if (element[0].type == "textarea" || element[0].type == "text") {
                newValue && element[0].setSelectionRange(0, element[0].value.length);
            }
            
        }, 100);
      },true);
  };    
};

FocusDirective.$inject = ['$timeout'];

export default FocusDirective;

