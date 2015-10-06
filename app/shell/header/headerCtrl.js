
//comment
//comment

export default ['bnAuth', function(bnAuth) {
    var vm = this;
    vm.name = 'banquetninja';
    vm.loggedIn = false;
    console.log('userInfo' + bnAuth.getUserInfo);
    if(bnAuth.getUserInfo()){
        vm.loggedIn = true;
    }
    vm.login = function (username, password){
        console.log('in login');
        bnAuth.login(username, password).then(
            function(){vm.loggedIn = true;}
        );
    };
    
}];

