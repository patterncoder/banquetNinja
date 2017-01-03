function EllipsisTitleDirective ($compile){
    
    return {
        scope: {
            title: "=",
            charSize: "<"
        },
        restrict: 'E',
        template: `<div class="md-headline">{{truncTitle}}</div>`,
        controller: ['$scope', function($scope){
        }],
        link: function(scope, element, attrs){
            scope.$watch('title', function(v){
                if(!v.text) return;
                var totalLen = v.text.length + v.leader.length;
                var newText = totalLen > scope.charSize ? v.text.substring(0, scope.charSize - v.leader.length) + '...' : v.text;
                var html =`<div><span class="md-headline">`+ v.leader +`</span><span class="md-subhead">`+ newText +`</span></div>`;
                var e =$compile(html)(scope);
                element.replaceWith(e);
                element = e;
            });
        }
    };
}
EllipsisTitleDirective.$inject = ['$compile'];
export default EllipsisTitleDirective;