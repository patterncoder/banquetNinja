import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmStaffMembersDetailCtrl (
    $scope,
    tmDetailFactory,
    tmStaffMembersDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmStaffMembersDocSvc,
        schema: ninjaSchemas.events.StaffMember,
        model: "StaffMember",
        listView: "root.staffMembers",
        detailView: "root.staffMembersDetail",
        addHeaderText: "Add Staff Member"
    }
    
    this.__proto__ = tmDetailFactory(constructorArgs);
    
    this.$scope.$watch(function(){
        return self.docSvc.isDirty();
    }, function(newVal, oldVal,  scope){
        if(newVal){
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });
    
    this.loadData().then(function(){
        self.getDetailTitle();
    });

    this.getDetailTitle = function(){
        self.detailTitle = {
            leader: 'Staff Members: ',
            text: self.docSvc.doc.memberName
        };
    };



    
    return this;
    
}

tmStaffMembersDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmStaffMembersDocSvc'
];

export default tmStaffMembersDetailCtrl;