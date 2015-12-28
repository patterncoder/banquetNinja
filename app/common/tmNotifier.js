function tmNotifier(tmToastr, $timeout){
    var timer = 0;
    
    return {
        conlog: function (msg) {
                console.log(msg);
            },

            notify: function (msg) {
                tmToastr.options = {
                    "debug": false,
                    "positionClass": "toast-bottom-full-width",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 1000,
                    "timeOut": 2000,
                    "extendedTimeOut": 1000
                };
                tmToastr.success(msg);
                console.log(msg);

            },

            error: function (msg) {
                tmToastr.options = {
                    "debug": false,
                    "positionClass": "toast-bottom-full-width",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000
                };
                tmToastr.error(msg);
                console.log(msg);
            },
            
            waiting: function (msg) {
                
                tmToastr.options = {
                    "debug": false,
                    "positionClass": "toast-bottom-full-width",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 1000,
                    "timeOut": 10000,
                    "extendedTimeOut": 1000
                };
                tmToastr.info(msg);
                console.log(msg);
                
                
            },
            clear: function(){
                tmToastr.clear();
            }
    }
}

tmNotifier.$inject = ['tmToastr', '$timeout'];
export default tmNotifier;