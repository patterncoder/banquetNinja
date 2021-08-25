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

        //overrides original loadData to properly utilize current company id.
        this.loadData = () => {
            let self = this;
            this.setLoading(true);
            this.getDetailTitle();

            let id = tmIdentity.currentUser.user.company;
            console.log("company id:", id);

            if ($window.sessionStorage['token']) {
                $http.defaults.headers.common['x-access-token'] = $window.sessionStorage['token'];
            }

            //not the correct way to do it, but something is going on in $dataSource, cannot simply call loadData, or loadDocument.
            $http.get(`${config.apiBase}/companies/${id}`).then((data) => {
                // this.validationError = null;
                console.log("data", data);
                self.docSvc.doc = data.data;
                // this.master = angular.copy(data);
                self.setLoading(false);
            });

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

        this.nwEmail = {
            emailAddress: "",
            isPrimary: false,
            emailType: "accountAdmin"
        };

        /*
        emails: [{
            emailType: {type: String, enum: ['accountAdmin']},
            primary: Boolean,
            email: { type: String, validate: validate.validators.emailValidator }
        }],
        */
        this.addEmail = (input) => {
            console.log("settingsDetailCtrl: addEmail:", input);
            console.log("nwEmail:", this.nwEmail);
            let eml = {
                emailType: this.nwEmail.emailType,
                primary: this.nwEmail.isPrimary,
                email: this.nwEmail.emailAddress
            };
            this.docSvc.doc.emails.push(eml);
        };

        this.addAddress = (input) => {
            console.log("settingsDetailCtrl: addAddress:", input);
        };


        this.arrowKeyOut = function (item, index, event, clickedField) {
            // if (event.keyCode == 38) {
            //     this.editMenuItem(this.docSvc.doc.menuItems[--index], index--, clickedField);
            // }
            // if (event.keyCode == 40) {
            //     this.editMenuItem(this.docSvc.doc.menuItems[++index], index++, clickedField);
            // }
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