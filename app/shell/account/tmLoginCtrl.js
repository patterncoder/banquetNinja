

function tmLoginCtrl (tmAuth, tmIdentity, tmNotifier, $state, $rootScope) {
    var vm = this;
    vm.name = 'banquetninja';
    vm.loggedIn = false;
    vm.identity = tmIdentity;
    vm.currentUser = tmIdentity.currentUser;
    vm.isLoading = false;
    vm.setLoading = function(loading){
        vm.isLoading = loading;
    };
    if(tmAuth.getUserInfo()){
        vm.loggedIn = true;
    }
    
    vm.isModal = function (){
        return $state.current.isModal;
    }

    $rootScope.$on('currentUser:updated', function(event, data){
        vm.currentUser.user = data;
        console.log(data);
    });
    
    vm.signin = function (username, password){
        vm.setLoading(true);
        tmAuth.login(username, password).then(
            function(){
                vm.loggedIn = true;
                $state.go('root.home');
                $rootScope.$broadcast('loggedIn');
                vm.currentUser = tmIdentity.currentUser;
                tmNotifier.notify("You have successfully signed in!");
                vm.setLoading(false);
                }, function() {
                    vm.setLoading(false);
                    tmNotifier.error('login failed');
                }
        );
        
        
    };
    vm.signout = function () {
        vm.setLoading(true);
        tmAuth.logout().then(function(result){
            
            if (result.data.success)
            {
                $rootScope.$broadcast('loggedOut');
                $state.go('root.home');
                tmNotifier.notify("You have successfully signed out!");
                vm.setLoading(false);
            }
            
        });
    };
    
    vm.goLogin = function () {
        $state.go('root.login');
    };
}


tmLoginCtrl.$inject = ['tmAuth', 'tmIdentity', 'tmNotifier', '$state', '$rootScope'];
export default tmLoginCtrl;


