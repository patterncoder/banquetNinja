
var Controller = ['$dataSource', '$attrs', '$injector', '$scope', function($dataSource, $attrs, $injector, $scope){

    var self = this;
    var docSvc = $attrs.docServiceAddMethod.split('.')[0];
    var addMethod = $attrs.docServiceAddMethod.split('.')[1];
    var list = $attrs.list;
    var Data = $dataSource.load($attrs.tmDataSource);
    var docService = $injector.get(docSvc);
    
    Data.query().then(function(data){
        self.data = data[list];
    });
    
    this.addItem = function(item){
        docService[addMethod](item);
        console.log(item);
    };
}];

function tmLookupsDirective (){
    var DDO = {
        controller: Controller,
        controllerAs: 'ctrl',
        bindToController: true,
        compile: function compile(tElement, tAttrs, transclude){
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {  },
                post: function postLink(scope, iElement, iAttrs, controller) {  }
            }
        }
    }
    return DDO
}

export default tmLookupsDirective;
