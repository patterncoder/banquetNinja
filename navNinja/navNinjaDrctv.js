
var Controller =  ['navigation', function(navigation){
    var vm = this;
    vm.nav = navigation.navigation;
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