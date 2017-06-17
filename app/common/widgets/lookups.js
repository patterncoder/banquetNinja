
import _ from 'lodash';

var Controller = ['$dataSource', '$attrs', '$injector', '$scope', '$timeout', function($dataSource, $attrs, $injector, $scope, $timeout){

    var self = this;
    // directive attribute variables
    var docSvc = $attrs.docServiceAddMethod.split('.')[0];
    var addMethod = $attrs.docServiceAddMethod.split('.')[1];
    var list = $attrs.list;
    //console.log({docSvc: docSvc, addMethod: addMethod, list: list});
    self.docList = [];
    var Data = $dataSource.load($attrs.tmDataSource);
    self.docService = $injector.get(docSvc);
    self.fullList = [];
    self.data = [];
    self.dataTest = [];
    //console.log($scope);
    
    this.updateList = function(){
        if(!self.docList)return;
        if($attrs.limitToList){
            // self.data = _.difference(self.fullList, self.docList);
            self.data = self.fullList.reduce((p, c, i)=>{
                if(typeof c === "object"){
                    if(!self.docList.map(i=>i.baseId).includes(c._id)) {
                        p.push(c);
                    }
                } else {
                    if(!self.docList.includes(c)) {
                        p.push(c);
                    }
                } 
                return p;
            }, []);
        }
    };
    
    $scope.$watchCollection('dCtrl.docList', function(newValue, oldValue){
       
        self.updateList();
        //console.log('asdfasdf');
    });
    
    Data.query().then(function(data){
        if(list === "root"){
            self.data = data;
            self.fullList = angular.copy(data);
        } else {
            $timeout(function(){  
                self.data = data[list];
                self.fullList = data[list];
                self.updateList();
            }, 0);
        }
    });
    
    
    
    this.addItem = function(item){
        
        self.docService[addMethod](item);
        self.updateList();
    };
    
}];

function tmLookupsDirective (){
    var DDO = {
        scope: {docList: '='},
        restrict: 'E',
        controller: Controller,
        controllerAs: 'dCtrl',
        bindToController: true,
        transclude: true,
        template: '<div ng-repeat="item in dCtrl.data" inject></div>',
        compile: function compile(tElement, tAttrs, transclude){
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {  },
                post: function postLink($scope, $element, $attrs, controller) {  }
            };
        }
    };
    return DDO;
}

export default tmLookupsDirective;
