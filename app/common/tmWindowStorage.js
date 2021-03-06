

function tmWindowStorage ($window) {
    
    function setSessionKey(key, data) {
        $window.sessionStorage[key] = data;
    }
    
    function getSessionKey(key) {
        
        return $window.sessionStorage[key] ? $window.sessionStorage[key] : false;
    }
    
    function setLocalKey(key, data) {
        $window.localStorage[key] = data;
    }
    
    function getLocalKey (key) {
        return $window.localStorage[key] ? $window.localStorage[key] : false;
    }
    
    
    return {
        
        setSessionKey: setSessionKey,
        getSessionKey: getSessionKey,
        setLocalKey: setLocalKey,
        getLocalKey: getLocalKey
        
        
    };
    
}

tmWindowStorage.$inject = ['$window'];


export default tmWindowStorage;