

function tmIdentity($window){
    var currentUser;
    
    if($window.sessionStorage['userInfo']){
            currentUser = JSON.parse($window.sessionStorage['userInfo']);
        }
    
    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
}

tmIdentity.$inject = ['$window'];

export default tmIdentity;