function ListItemButtonsDirective ($compile){
    
    return {
        scope: {
            editFn: "&",
            printFn: "&",
            deleteFn: "&",
            idVal: "="
        },
        restrict: 'E',
        template: require('./listItemButtons.jade'),
        controller: ['$scope', function($scope){
            $scope.edit = function(){
                $scope.editFn({idVal: $scope.idVal});
            };
            $scope.print = function(){
                $scope.printFn({idVal: $scope.idVal});
            };
            $scope.delete = function(){
                $scope.deleteFn({idVal: $scope.idVal});
            };
        }],
        link: function(scope, element, attrs){
            scope.$attrs = attrs;
        }
    };
}
ListItemButtonsDirective.$inject = ['$compile'];
export default ListItemButtonsDirective;