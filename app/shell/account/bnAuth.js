import config from 'config';

export default ['$http', '$q', '$window', function ($http, $q, $window){
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
            deferred.resolve(userInfo);
        }, function(error) {
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
        getUserInfo: getUserInfo
    }
}];