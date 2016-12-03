import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmContractDetailCtrl (
    $scope,
    tmDetailFactory,
    tmContractDocSvc,
    $timeout,
    uibDateParser,
    $state
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmContractDocSvc,
        schema: ninjaSchemas.events.Contract,
        model: "Contract",
        listView: "root.contracts",
        detailView: "root.contractDetail",
        addHeaderText: "Add Contract"
    };
    
    this.__proto__ = tmDetailFactory(constructorArgs);
    
    this.moreFunctions.print = {
            label: "Print",
            method: function(){
                $state.go('root.contracts.print', {id: self.docSvc.doc._id});
            }
        };

    this.moreFunctions.addItem.method = function() {
        
            var dialogConfig = {
                template: require('apply!./addContract.jade'),
                controller: 'tmAddContractCtrl as vm',
                locals: {model: 'Contract',
                        schema: self.constructorArgs.schema,
                        listView: self.constructorArgs.listView,
                        detailView: self.constructorArgs.detailView,
                        headerText: self.constructorArgs.addHeaderText,
                        hideCustomerInput: false}
            };
            self.tmDialogSvc.showDialog(dialogConfig);
    };

    // this.moreFunctions.push({label: "Print", method: function(){
    //     //var url = $state.href('root.contracts.print', {id: self.docSvc.doc._id});
    //     //window.open(url,'_blank');
    //     $state.go('root.contracts.print', {id: self.docSvc.doc._id});
    // }});
    
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
        //self.docSvc.doc.eventDate = new Date(self.docSvc.doc.eventDate);
        //self.docSvc.doc.eventTime = new Date(self.docSvc.doc.eventTime);
    });

    this.getDetailTitle = function(){
        self.detailTitle = {
            leader: 'Event for: ',
            text: self.docSvc.doc.customer.lastName + ', ' + self.docSvc.doc.customer.firstName
        };
    };

    // this.openRightMenu = function() {
    //     console.log('in here');
    //     $mdSidenav('right').toggle();
    // };

    this.sideTab = {
        menuItems: false,
        timeline: false,
        rooms: false
    };

    this.closeVenuePicker = function(){
        this.sideTab.rooms = false;
    };

    this.addRooms = function(){
        for (var key in this.sideTab) {
            this.sideTab[key] = false;
        }
        this.sideTab.rooms = true;
    };

    this.removeVenue = function(index){
        self.docSvc.removeVenue(index);
    };
    
    
    
    this.format = 'shortDate';
    this.timeFormat = 'h:mm a';
    this.datePickerOptions = {
        //dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };
    this.status = {timePickerOpen: false,
        datePickerOpen: false
    };
    this.openDatePicker = function(){
        this.status.datePickerOpen = true;
    };
    this.closeTimePicker = function(){
        this.status.timePickerOpen = false;
    };
    
    this.doneEditing = function(item){
        delete item.isEditing;
        delete item.clickedField;
    };
    
    this.editMenuItem = function (item, index, clickedField){
        if(index < 0 || index > this.docSvc.doc.menuItems.length - 1) return;
        $timeout(function(){
            // console.log({inFunction: 'editMenuItem',
            //     item: item,
            //     index: index,
            //     clickedField: clickedField
            // });
            item.isEditing = true;
            item.clickedField = {};
            item.clickedField[clickedField] = true;
        },0);

    };
    
    this.arrowKeyOut = function(item, index, event, clickedField){
        if (event.keyCode == 38) {
            this.editMenuItem(this.docSvc.doc.menuItems[--index], index--, clickedField);
        }
        if (event.keyCode == 40) {
            this.editMenuItem(this.docSvc.doc.menuItems[++index], index++, clickedField);
        }
    };
    
    this.detailBlur = function (item, index, event) {
        var relatedTarget = event.relatedTarget || event.explicitOriginalTarget;
        if (relatedTarget == null || event.target.parentElement.parentElement != relatedTarget.parentElement.parentElement ) {
            $timeout(function(){
                delete item.isEditing;
                delete item.clickedField;
            }, 0);
            
        } 
    };
    
    this.deleteMenuItem = function (index){
        this.docSvc.removeMenuItem(index);
    };
    
    
    return this;
    
}

tmContractDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmContractDocSvc',
    '$timeout',
    'uibDateParser',
    '$state'
];

export default tmContractDetailCtrl;