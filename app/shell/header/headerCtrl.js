
//comment
//comment

function HeaderCtrl (tmAuth, tmIdentity) {
    var vm = this;
    vm.name = 'banquetninja';
    vm.loggedIn = false;
    vm.identity = tmIdentity;
    console.log('userInfo' + tmAuth.getUserInfo);
    if(tmAuth.getUserInfo()){
        vm.loggedIn = true;
    }
    vm.signin = function (username, password){
        console.log('in login');
        tmAuth.login(username, password).then(
            function(){vm.loggedIn = true;}
        );
    };
    vm.signout = function () {
        tmAuth.logout().then(function(result){
            if (result.success)
            {
                console.log('logged out!!!');
            }
            
        });
    };
}


HeaderCtrl.$inject = ['tmAuth', 'tmIdentity'];
export default HeaderCtrl;


