class tmFooterCtrl {
    constructor ($state) {
        this.$state = $state;
    }
    
    isModal (){
        return this.$state.current.isModal;
    }
}

tmFooterCtrl.$inject = ['$state'];

export default tmFooterCtrl;