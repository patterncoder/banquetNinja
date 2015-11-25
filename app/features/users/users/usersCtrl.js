class tmUsersCtrl{
	constructor($dataSource){
		var self = this;
		this.$datasource = $dataSource;
		this.users = [];
		var Users = $dataSource.load('User');
		Users.query().then(function(data){
			self.users = data;
		});
		
	}
}

tmUsersCtrl.$inject = ['$dataSource'];

export default tmUsersCtrl