import config from 'config';

export default ['$http', '$q', '$window', 'tmIdentity', function ($http, $q, $window, tmIdentity){
    var userInfo;
    
    function login(username, password) {
        var deferred = $q.defer();
        
        $http.post(config.apiBase + '/login', {
            username: username,
            password: password
        }).then(function(result){
            console.log(result);
            userInfo = {
                accessToken: result.data.token,
                user: result.data.user
            };
            $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
            tmIdentity.currentUser = userInfo;
            deferred.resolve(userInfo);
        }, function(error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function logout(){
        var deferred = $q.defer();
        
        $http.post(config.apiBase + '/logout', {
            headers: {"access_token": userInfo.accessToken}
        }).then(function(result){
            $window.sessionStorage["userInfo"] = null;
            userInfo = null;
            tmIdentity.currentUser = undefined;
            deferred.resolve(result);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }
    
    function getUserInfo() {
        return userInfo;
    }
    
    function init(){
        if($window.sessionStorage['userInfo']){
            userInfo = JSON.parse($window.sessionStorage['userInfo']);
        }
    }
    
    init();
    
    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    }
}];