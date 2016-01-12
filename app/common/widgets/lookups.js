
var Controller = ['$dataSource', '$attrs', '$injector', function($dataSource, $attrs, $injector){
    var self = this;
    var Data = $dataSource.load('Lookups');
    var docService = $injector.get($attrs.docService);
    console.dir(docService);
    Data.query().then(function(data){
        self.List = data[$attrs.selectList];
    });
    
    this.addItem = function (category){
        console.log(category);
        docService.addCategory(category);
    }
    
}];

function tmLookupsDirective (){
    return {
        scope: {
            selectList: '@',
            selectedList: '@',
            docService: '@'
            
        },
        restrict: 'E',
        controller: Controller,
        controllerAs: 'vm',
        template: require('./lookups.jade')
    }
}

export default tmLookupsDirective;