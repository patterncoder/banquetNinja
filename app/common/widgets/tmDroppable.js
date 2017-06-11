

export default [function(){
    return {
       restrict: 'A',
       link: function(scope, elem, attr, ctrl) {
            var el = elem[0];
            
            el.addEventListener(
                'dragover',
                function(e) {
                e.dataTransfer.dropEffect = 'move';
                // allows us to drop
                if (e.preventDefault) e.preventDefault();
                this.classList.add('over');
                return false;
                },
                false
            );
            
            el.addEventListener(
                'drop',
                function(e) {
                // Stops some browsers from redirecting.
                if (e.stopPropagation) e.stopPropagation();
                if (e.preventDefault) e.preventDefault();
                this.classList.remove('over');
                // console.log(e);
                // console.log(scope);
                
                var data = e.dataTransfer.getData('text/plain');
                scope.$ctrl.sort(data, this.id);
                //console.log(data);
                //this.innerHTML = data;
                
                return false;
                },
                false
            );
        }
   };
}];