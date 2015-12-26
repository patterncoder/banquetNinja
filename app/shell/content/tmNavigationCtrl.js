import angular from 'angular';

class tmNavigationCtrl {
    constructor (tmIdentity, $state) {
        //var vm = this;
        this.tmIdentity = tmIdentity;
        //vm.hideNav = !tmIdentity.isAuthenticated();
        this.$state = $state;
        
        // $scope.$on('loggedIn', function(){
        //     vm.hideNav = !tmIdentity.isAuthenticated();
        // });
        
        // $scope.$on('loggedOut', function(){
        //     vm.hideNav = !tmIdentity.isAuthenticated();
        // });
    }
    
    hideNavigation () {
        return !this.tmIdentity.isAuthenticated();
    }
    
    isModal (){
        return this.$state.current.isModal;
    }
}

tmNavigationCtrl.$inject = ['tmIdentity', '$state'];

export default tmNavigationCtrl;