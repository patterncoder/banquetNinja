
var Controller =  ['navigation', 'tmIdentity', '$scope', function(navigation, tmIdentity, $scope){
    var vm = this;
    vm.show = tmIdentity.isAuthenticated();
    
    vm.nav = navigation.navigation;
    $scope.$watch(function(){
            return tmIdentity.isAuthenticated()
        }, function(newValue, oldValue){
            vm.show = newValue;
    });
}];

function Directive(){
    return {
        scope: {},
        restrict: 'E',
        controller: Controller,
        controllerAs: 'vm',
        template: require('./navNinja.jade')
    };
}

export default Directive;