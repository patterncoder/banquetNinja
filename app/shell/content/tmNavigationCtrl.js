import angular from 'angular';

class tmNavigationCtrl {
    constructor (tmIdentity, $state) {
        this.tmIdentity = tmIdentity;
        this.$state = $state;
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