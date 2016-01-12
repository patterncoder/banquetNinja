class tmUsersCtrl{
    constructor($dataSource){
        var self = this;
        this.$datasource = $dataSource;
        this.users = [];
        this.title = "whats up dude";
        var Users = $dataSource.load('User');
        Users.query().then(function(data){
            console.log(data);
            self.users = data;
        });
    }
}

tmUsersCtrl.$inject = ['$dataSource'];

export default tmUsersCtrl