import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

class tmSettingsDetailCtrl {
    constructor($scope, $http, $window, $dataSource, tmDetailFactory, tmSettingsDocSvc, $timeout, tmIdentity) {

        var self = this;
        var constructorArgs = {
            $scope: $scope,
            docSvc: tmSettingsDocSvc,
            schema: ninjaSchemas.account.Company,
            model: "Company",
            listView: "root.company",
            detailView: "root.companyDetail",
            addHeaderText: "Settings"
        }

        this.__proto__ = tmDetailFactory(constructorArgs);


        this.$scope.$watch(function () {
            return self.docSvc.isDirty();
        }, function (newVal, oldVal, scope) {
            if (newVal) {
                self.detailForm.$setDirty();
            } else {
                self.detailForm.$setPristine();
                self.detailForm.$setUntouched();
            }
        });
        /*
        this.loadData = function () {
            var self = this;
            console.log("TESTING:", self);
            self.setLoading(true);
            self.getDetailTitle();
            return this.docSvc.loadDocument(this.$stateParams.id).then(function (doc) {
                self.setLoading(false);
                return doc;
            });
        };
        */

        // console.log("Company:", ninjaSchemas.account.Company);

        // let company = new ninjaSchemas.account.Company;
        // console.log("company:", company);

        //overrides original loadData to properly utilize current company id.
        this.loadData = () => {
            let self = this;
            this.setLoading(true);
            this.getDetailTitle();

            let id = tmIdentity.currentUser.user.company;
            console.log("company id:", id);
            // this.loadDocument = function (id){
            //     var self = this;
            //     return this.docModel.getOne(id, true).then(function(data, status){
            //         data = convertDateStrings(data);
            //         self.validationError = null;
            //         self.doc = data;
            //         self.master = angular.copy(data);
            //         return data;
            //     }, function(error){
            //         console.log(error);
            //         return(error);
            //     });
            // };

            // let Company = $dataSource.load("Company");
            // return Company.getOne(id, true).then((data, status) => {
            //     // this.validationError = null;
            //     console.log("data", data);
            //     this.doc = data;
            //     // this.master = angular.copy(data);
            //     this.setLoading(false);
            //     return data;
            // });

            // return this.docSvc.loadDocument(id).then((doc) => {
            //     console.log("data:", doc);
            //     // this.setLoading(false);
            //     return doc;
            // });

            if ($window.sessionStorage['token']) {
                $http.defaults.headers.common['x-access-token'] = $window.sessionStorage['token'];
            }

            /*

                self.$http.get(config.apiBase + '/companies' + queryString).then(function(result){
                    delete self.httpValidationError.errors.companyName;
                    if (result.data.length == 0){
                        return self.validateField();
                    } else {
                        //self.httpValidationError = {errors: {companyName: {kind: "unique", message: "An account with that name exists."}}};
                        self.httpValidationError.errors.companyName = {kind: "unique", message: "An account with that name exists."};
                        return self.validateField();
                    }
                });
            */

            //not the correct way to do it, but something is going on in $dataSource, cannot simply call loadData, or loadDocument.
            $http.get(`${config.apiBase}/companies/${id}`).then((data) => {
                // this.validationError = null;
                console.log("data", data);
                self.docSvc.doc = data.data;
                // this.master = angular.copy(data);
                self.setLoading(false);
            });
            // $http.get(`${config.apiBase}/companies/${id}`, (err, data) => {
            //     console.log("err:", err, "data:", data);
            //     // this.validationError = null;
            //     console.log("data", data);
            //     self.docSvc.doc = data;
            //     // this.master = angular.copy(data);
            //     self.setLoading(false);
            //     // return data;
            // });

        };

        this.loadData();


        // this.loadData().then(function(){
        //     self.getDetailTitle();
        // });

        console.log("docSvc.doc:", this.docSvc.doc);

        this.getDetailTitle = function () {
            self.detailTitle = {
                leader: 'Company: ',
                // text: self.docSvc.doc.lastName + ', ' + self.docSvc.doc.firstName
                text: `${self.docSvc.doc.companyName}`,
                // text: 'test'
            };
        };

        // this.sideTab = {
        //     roles: false
        // };

        // this.openSideTab = function(tab) {
        //     for (var k in this.sideTab) {
        //         this.sideTab[k] = false;
        //     }
        //     this.sideTab[tab] = true;
        // };

        // this.closeSideTab = function() {
        //     for (var k in this.sideTab) {
        //         this.sideTab[k] = false;
        //     }
        // };        

        // this.removeRoles = function(index){
        //     self.docSvc.removeRole(index);
        // };

        this.arrowKeyOut = function (item, index, event, clickedField) {
            if (event.keyCode == 38) {
                this.editMenuItem(this.docSvc.doc.menuItems[--index], index--, clickedField);
            }
            if (event.keyCode == 40) {
                this.editMenuItem(this.docSvc.doc.menuItems[++index], index++, clickedField);
            }
        };

        this.detailBlur = function (item, index, event) {
            var relatedTarget = event.relatedTarget || event.explicitOriginalTarget;
            if (relatedTarget == null || event.target.parentElement.parentElement != relatedTarget.parentElement.parentElement) {
                $timeout(function () {
                    delete item.isEditing;
                    delete item.clickedField;
                }, 0);

            }
        };

        return this;
    }
}

tmSettingsDetailCtrl.$inject = ['$scope', '$http', '$window', '$dataSource', 'tmDetailFactory', 'tmSettingsDocSvc', '$timeout', 'tmIdentity'];

export default tmSettingsDetailCtrl;