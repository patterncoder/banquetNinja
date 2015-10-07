function tmNotifier(tmToastr){
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
            }
    }
}

tmNotifier.$inject = ['tmToastr'];
export default tmNotifier;