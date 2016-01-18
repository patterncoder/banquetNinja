
var Controller = ['$dataSource', '$attrs', '$injector', '$scope', function($dataSource, $attrs, $injector, $scope){
    this.name = 'Pascal';
    this.testData = ['item 1', 'item 2', 'item 3'];
    this.data = [];
    //var Data = $dataSource.load($attrs.tmDataSource);
    var self = this;
    var Data = $dataSource.load('Lookups');
    //var docService = $injector.get($attrs.docService);
    Data.query().then(function(data){
        self.data = data;
        console.log(self.data);
    });
}];

function tmLookupsDirective (){
    return {
        
        //transclude: true,
        // controller: function () {
        //     this.name = 'Pascal';
        // },
        controller: Controller,
        controllerAs: 'ctrl',
        bindToController: true,
        //template: '<div>{{ctrl.name}}</div>',
        //template: require('./lookups.jade'),
        restrict: 'E',
        compile: function(element, attrs, transclude){
            var children = element.children();
            var template = angular.element('<div ng-repeat="item in collection"></div>');
            
            template.append(children);
            element.html('');
            element.append(template);
            return {
                pre: function preLink(scope, iElement, iAttrs, ctrl, transclude) {
                    //scope.collection = [1, 2, 3, 4, 5];
                    console.log(ctrl.data);
                    scope.collection = ctrl.testData;
                    //scope.collection = ctrl.data.menuItemTags;
                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                    //scope.collection = controller.data.menuItemTags;
                    console.log(scope.data);
                    console.log(controller.data);
                    scope.$watch(controller.data, function(newVal){
                        console.log(controller.data);
                    });
                    console.log(iElement[0]);
                }
            }
            
        }
        // ,
        // link: function(scope, element, attrs, controller){
        //     console.log(element.children());
        //     console.log(scope);
        //     console.log(controller);
        // }
        }
}

export default tmLookupsDirective;

// scope: {
//             docService: '@',
//             tmDataSource: '@',
//             addMethod: '@',
//             list: '='
//         },
//         restrict: 'E',
//         transclude: true,
//         //not sure what replace does...need to find out
//         //replace: true,
//         controller: Controller,
//         controllerAs: 'vm',
//         template: require('./lookups.jade'),
//         link: function(scope, element, attrs, ctrl, transclude) {
//             // scope.testClick = function(param) {
//             //     console.log('in test click');
//             //     console.log(param);
//             // };
//             scope.list = ctrl.data;
//             console.log(ctrl);
//             console.log(scope);
//             // scope.dirAddItem = function(param){
//             //     console.log('in dirAddItem');
//             //     ctrl.addItem(param);
//             // }
//             // element.on("click", handleClick);
//             // function handleClick(event) {
//             //     console.log(ctrl);
//             //     console.log(attrs);
//             //     console.log(transclude);
//             //     console.log(event);
//             //     scope.$apply(
//             //         function addItem(){
//             //             ctrl.addItem('test');
//             //         }
//             //     )
//             // }
//             //scope.list = ctrl.list;
//             // scope.List = ctrl.List;
//             // transclude(scope, function(clone, scope){
//             //     element.append(clone); 
//             // })
//         }

// var self = this;
//     var Data = $dataSource.load($attrs.tmDataSource);
//     var docService = $injector.get($attrs.docService);
//     Data.query().then(function(data){
//         self.data = data;
//         console.log(self);
//     });
//     this.testData = ['item 1', 'item 2', 'item 3'];
//     this.addItem = function(item){
//         console.log('add item');
//         docService[$attrs.addMethod](item);
//     }
//     this.addCategory = function (category){
//         console.log(category);
//         docService.addCategory(category);
//     }
//     console.log(this);