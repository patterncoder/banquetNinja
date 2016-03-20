

function tmProfileCtrl ($dataSource, tmIdentity) {
    var $ctrl = this;
    var User = $dataSource.load("User");
    console.log(tmIdentity.currentUser.user._id);
    function init () {
        User.getOne(tmIdentity.currentUser.user._id,true).then(function(data){
            console.log(data);
        })
    }
    init();
}

tmProfileCtrl.$inject = ['$dataSource', 'tmIdentity'];

export default tmProfileCtrl;