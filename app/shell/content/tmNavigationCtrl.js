import angular from 'angular';

class tmNavigationCtrl {
    constructor (tmIdentity, $scope) {
        var vm = this;
        vm.showNav = tmIdentity.isAuthenticated();
        
        $scope.$on('loggedIn', function(){
            vm.showNav = tmIdentity.isAuthenticated();
        });
        
        $scope.$on('loggedOut', function(){
            vm.showNav = tmIdentity.isAuthenticated();
        });
    }
}

tmNavigationCtrl.$inject = ['tmIdentity', '$scope'];

export default tmNavigationCtrl;